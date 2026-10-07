<script setup lang="ts">
const { locale, t } = useI18n()
const defaultCoverImage = '/og-default.png'
const collection = computed(() => `blog_${locale.value}`)

const { data: posts } = await useAsyncData(
    () => `blog-list-${locale.value}`,
    () => queryCollection(collection.value).order('publishedAt', 'DESC').all(),
    { watch: [locale] },
)

function formatDate(dateStr?: string) {
    if (!dateStr) return ''
    return new Intl.DateTimeFormat(locale.value === 'id' ? 'id-ID' : 'en-US', {
        dateStyle: 'long',
    }).format(new Date(dateStr))
}

// --- Search ---
const searchQuery = ref('')
const isSearching = computed(() => searchQuery.value.trim().length > 0)

const filteredPosts = computed(() => {
    const all = posts.value ?? []
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return all
    return all.filter(
        (post) =>
            post.title.toLowerCase().includes(q) ||
            post.description.toLowerCase().includes(q),
    )
})

// Hero "artikel terbaru" cuma tampil saat tidak sedang mencari
const featured = computed(() => (isSearching.value ? null : filteredPosts.value[0] ?? null))
const gridSource = computed(() => (isSearching.value ? filteredPosts.value : filteredPosts.value.slice(1)))

// --- Infinite scroll ---
const pageSize = 3
const visibleCount = ref(pageSize)

watch([searchQuery, locale], () => {
    visibleCount.value = pageSize
})

const displayedPosts = computed(() => gridSource.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < gridSource.value.length)

const sentinel = useTemplateRef<HTMLElement>('sentinel')
let observer: IntersectionObserver | null = null

onMounted(() => {
    if (!import.meta.client || !sentinel.value) return
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0]?.isIntersecting && hasMore.value) {
                visibleCount.value += pageSize
            }
        },
        { rootMargin: '400px' },
    )
    observer.observe(sentinel.value)
})

onUnmounted(() => {
    observer?.disconnect()
})

useSeoMeta({
    title: () => t('blog.seoTitle'),
    description: () => t('blog.seoDescription'),
})
</script>

<template>
    <div class="pb-20 pt-8 sm:pt-12">
        <nav aria-label="Breadcrumb" class="text-sm text-ink-soft">
            <NuxtLinkLocale to="/" class="transition-colors hover:text-accent-dark">
                {{ t('common.breadcrumbHome') }}
            </NuxtLinkLocale>
            <span class="mx-2 text-slate-300" aria-hidden="true">/</span>
            <span>{{ t('blog.title') }}</span>
        </nav>

        <header class="mt-6 max-w-2xl">
            <h1 class="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{{ t('blog.title') }}</h1>
            <p class="mt-3 text-lg leading-relaxed text-ink-soft">{{ t('blog.lede') }}</p>
        </header>

        <!-- Search -->
        <div class="mt-8 max-w-md">
            <label class="relative block">
                <span class="sr-only">{{ t('blog.searchPlaceholder') }}</span>
                <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input v-model="searchQuery" type="search" :placeholder="t('blog.searchPlaceholder')"
                    class="w-full rounded-md border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            </label>
        </div>

        <!-- Artikel terbaru (hanya saat tidak mencari) -->
        <NuxtLink v-if="featured" :to="featured.path"
            class="group mt-10 grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <img :src="featured.coverImage || defaultCoverImage" alt="" width="1200" height="630"
                class="aspect-[1200/630] w-full rounded-xl border border-slate-200 bg-slate-100 object-cover">
            <div>
                <time :datetime="featured.publishedAt" class="text-sm text-ink-soft">
                    {{ formatDate(featured.publishedAt) }}
                </time>
                <h2 class="mt-2 text-balance text-2xl font-semibold leading-snug tracking-tight text-ink
                    transition-colors group-hover:text-accent-dark sm:text-3xl">
                    {{ featured.title }}
                </h2>
                <p class="mt-3 line-clamp-3 leading-relaxed text-ink-soft">{{ featured.description }}</p>
                <span
                    class="mt-4 inline-block text-sm font-medium text-accent-dark underline-offset-4 group-hover:underline">
                    {{ t('blog.readMore') }}
                </span>
            </div>
        </NuxtLink>

        <!-- Hasil tidak ditemukan -->
        <p v-if="isSearching && !displayedPosts.length"
            class="mt-14 border-t border-slate-200 pt-10 text-sm text-ink-soft">
            {{ t('blog.noResultsFor', { query: searchQuery }) }}
        </p>

        <!-- Artikel lainnya / hasil pencarian -->
        <ul v-if="displayedPosts.length"
            class="mt-14 grid gap-x-6 gap-y-10 border-t border-slate-200 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="post in displayedPosts" :key="post.path">
                <NuxtLink :to="post.path" class="group block">
                    <img :src="post.coverImage || defaultCoverImage" alt="" width="1200" height="630" loading="lazy"
                        class="aspect-[1200/630] w-full rounded-lg border border-slate-200 bg-slate-100 object-cover">
                    <time :datetime="post.publishedAt" class="mt-4 block text-sm text-ink-soft">
                        {{ formatDate(post.publishedAt) }}
                    </time>
                    <h2
                        class="mt-1 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent-dark">
                        {{ post.title }}
                    </h2>
                    <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{{ post.description }}</p>
                </NuxtLink>
            </li>
        </ul>

        <!-- Pemicu infinite scroll -->
        <div ref="sentinel" class="h-1" aria-hidden="true" />
    </div>
</template>