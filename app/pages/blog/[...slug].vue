<script setup lang="ts">
const { locale, locales, t } = useI18n()
const route = useRoute()
const collection = computed(() => `blog_${locale.value}`)
const localePath = useLocalePath()
const siteUrl = useSiteConfig().url
const blogTranslation = useBlogTranslation()
const defaultCoverImage = '/og-default.png'

const { data: post } = await useAsyncData(
    () => `blog-post-${route.path}`,
    () => queryCollection(collection.value).path(route.path).first(),
    { watch: [locale] },
)

if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
}

function formatDate(dateStr?: string) {
    if (!dateStr) return ''
    return new Intl.DateTimeFormat(locale.value === 'id' ? 'id-ID' : 'en-US', {
        dateStyle: 'long',
    }).format(new Date(dateStr))
}

async function findAlternatePath(translationKey: string, targetLocale: string) {
    if (targetLocale === locale.value) return route.path
    const alt = await queryCollection(`blog_${targetLocale}`).where('translationKey', '=', translationKey).first()
    return alt?.path ?? null
}

watchEffect(async () => {
    if (!post.value?.translationKey) return
    blogTranslation.value.translationKey = post.value.translationKey
    for (const l of locales.value) {
        blogTranslation.value.alternates[l.code] = await findAlternatePath(post.value.translationKey, l.code)
    }
})

onUnmounted(() => {
    blogTranslation.value = { translationKey: null, alternates: {} }
})

// --- Related posts ---
const { data: relatedPosts } = await useAsyncData(
    () => `blog-related-${route.path}`,
    async () => {
        const current = post.value
        if (!current) return []
        const all = await queryCollection(collection.value).order('publishedAt', 'DESC').all()
        const others = all.filter((p) => p.path !== current.path)
        const sameTool = current.relatedToolPath
            ? others.filter((p) => p.relatedToolPath === current.relatedToolPath)
            : []
        const rest = others.filter((p) => !sameTool.some((s) => s.path === p.path))
        return [...sameTool, ...rest].slice(0, 3)
    },
    { watch: [locale] },
)

// --- Share ---
const shareUrl = computed(() => `${siteUrl}${route.path}`)
const shareText = computed(() => post.value?.title ?? '')

const shareLinks = computed(() => [
    {
        name: 'WhatsApp',
        href: `https://wa.me/?text=${encodeURIComponent(`${shareText.value} ${shareUrl.value}`)}`,
    },
    {
        name: 'X',
        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.value)}&url=${encodeURIComponent(shareUrl.value)}`,
    },
    {
        name: 'Facebook',
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`,
    },
    {
        name: 'LinkedIn',
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl.value)}`,
    },
])

const justCopied = ref(false)

async function copyLink() {
    if (!import.meta.client) return
    try {
        await navigator.clipboard.writeText(shareUrl.value)
        justCopied.value = true
        setTimeout(() => (justCopied.value = false), 2000)
    } catch {
        // clipboard tidak tersedia (browser lama atau bukan HTTPS), abaikan saja
    }
}

const ogImage = computed(() => `${siteUrl}${post.value?.coverImage || defaultCoverImage}`)

useSeoMeta({
    title: () => post.value?.title,
    description: () => post.value?.description,
    ogTitle: () => post.value?.title,
    ogDescription: () => post.value?.description,
    ogImage: () => ogImage.value,
    ogType: 'article',
    ogUrl: () => `${siteUrl}${route.path}`,
    twitterCard: 'summary_large_image',
    twitterTitle: () => post.value?.title,
    twitterDescription: () => post.value?.description,
    twitterImage: () => ogImage.value,
})
</script>

<template>
    <article v-if="post" class="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:pt-12">
        <nav aria-label="Breadcrumb" class="text-sm text-ink-soft">
            <NuxtLinkLocale to="/" class="transition-colors hover:text-accent-dark">
                {{ t('common.breadcrumbHome') }}
            </NuxtLinkLocale>
            <span class="mx-2 text-slate-300" aria-hidden="true">/</span>
            <NuxtLink :to="localePath('/blog')" class="transition-colors hover:text-accent-dark">
                {{ t('blog.title') }}
            </NuxtLink>
        </nav>

        <header class="mt-6">
            <h1 class="text-balance text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                {{ post.title }}
            </h1>
            <p v-if="post.description" class="mt-4 text-lg leading-relaxed text-ink-soft">
                {{ post.description }}
            </p>
            <div class="mt-5 flex flex-wrap items-center gap-x-3 text-sm text-ink-soft">
                <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
                <span class="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
                <span>Admin</span>
            </div>

            <!-- Share -->
            <div class="mt-5 flex flex-wrap items-center gap-2">
                <span class="text-sm text-ink-soft">{{ t('blog.share') }}</span>
                <a v-for="link in shareLinks" :key="link.name" :href="link.href" target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-full border border-slate-200 px-3 py-1 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent-dark">
                    {{ link.name }}
                </a>
                <button type="button" :class="[
                    'rounded-full border px-3 py-1 text-sm transition-colors',
                    justCopied
                        ? 'border-accent text-accent-dark'
                        : 'border-slate-200 text-ink-soft hover:border-accent hover:text-accent-dark',
                ]" @click="copyLink">
                    {{ justCopied ? t('blog.linkCopied') : t('blog.copyLink') }}
                </button>
            </div>
        </header>

        <img :src="post.coverImage || defaultCoverImage" :alt="post.title" width="1200" height="630"
            class="mt-8 aspect-[1200/630] w-full rounded-xl border border-slate-200 object-cover">

        <div class="prose prose-slate mt-10 max-w-none sm:prose-lg
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink
            prose-h2:mt-12 prose-h2:text-2xl
            prose-h3:text-xl
            prose-p:leading-8 prose-p:text-slate-700

            prose-a:font-medium prose-a:text-accent-dark prose-a:underline prose-a:decoration-accent/40 prose-a:underline-offset-4

            [&_a:not(:is(h2,h3,h4)_a)]:px-1
            [&_a:not(:is(h2,h3,h4)_a)]:-mx-1
            [&_a:not(:is(h2,h3,h4)_a)]:rounded-sm
            [&_a:not(:is(h2,h3,h4)_a)]:bg-gradient-to-t
            [&_a:not(:is(h2,h3,h4)_a)]:from-accent
            [&_a:not(:is(h2,h3,h4)_a)]:to-accent
            [&_a:not(:is(h2,h3,h4)_a)]:bg-no-repeat
            [&_a:not(:is(h2,h3,h4)_a)]:bg-bottom
            [&_a:not(:is(h2,h3,h4)_a)]:bg-[length:100%_0%]
            [&_a:not(:is(h2,h3,h4)_a)]:transition-[background-size,color]
            [&_a:not(:is(h2,h3,h4)_a)]:duration-500
            [&_a:not(:is(h2,h3,h4)_a)]:ease-in-out
            [&_a:not(:is(h2,h3,h4)_a):hover]:text-white
            [&_a:not(:is(h2,h3,h4)_a):hover]:no-underline
            [&_a:not(:is(h2,h3,h4)_a):hover]:bg-[length:100%_100%]
            [&_a:not(:is(h2,h3,h4)_a):hover]:[box-decoration-break:clone]

            prose-strong:font-semibold prose-strong:text-ink
            prose-blockquote:border-l-accent prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-slate-600
            prose-img:rounded-lg
            prose-pre:rounded-lg prose-pre:text-sm
            [&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-slate-100 [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5
            [&_:not(pre)>code]:text-[0.9em] [&_:not(pre)>code]:font-normal
            [&_:not(pre)>code]:before:content-none [&_:not(pre)>code]:after:content-none
            [&_:is(h2,h3,h4)_a]:text-inherit [&_:is(h2,h3,h4)_a]:no-underline [&_:is(h2,h3,h4)_a]:[font-weight:inherit]
            prose-hr:border-slate-200">
            <ContentRenderer :value="post" />
        </div>

        <aside v-if="post.relatedToolPath" class="mt-14 rounded-xl bg-accent-tint px-6 py-5">
            <p class="text-ink">
                {{ t('blog.tryToolCta') }}
                <NuxtLinkLocale :to="post.relatedToolPath"
                    class="font-semibold text-accent-dark underline underline-offset-4 hover:text-accent">
                    {{ t('blog.tryToolLink') }}
                </NuxtLinkLocale>
            </p>
        </aside>

        <!-- Related posts -->
        <section v-if="relatedPosts?.length" class="mt-16 border-t border-slate-200 pt-10">
            <h2 class="text-lg font-semibold tracking-tight text-ink">{{ t('blog.relatedPostsTitle') }}</h2>
            <ul class="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-3">
                <li v-for="related in relatedPosts" :key="related.path">
                    <NuxtLink :to="related.path" class="group block">
                        <img :src="related.coverImage || defaultCoverImage" alt="" width="1200" height="630"
                            loading="lazy"
                            class="aspect-[1200/630] w-full rounded-lg border border-slate-200 bg-slate-100 object-cover">
                        <h3
                            class="mt-3 text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-accent-dark">
                            {{ related.title }}
                        </h3>
                    </NuxtLink>
                </li>
            </ul>
        </section>

        <footer class="mt-14 border-t border-slate-200 pt-6">
            <NuxtLink :to="localePath('/blog')"
                class="text-sm font-medium text-ink-soft transition-colors hover:text-accent-dark">
                ← {{ t('blog.title') }}
            </NuxtLink>
        </footer>
    </article>
</template>