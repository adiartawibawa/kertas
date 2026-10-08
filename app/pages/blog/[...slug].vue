<script setup lang="ts">
type BlogCollection = 'blog_id' | 'blog_en'
const { locale, locales, t } = useI18n()
const route = useRoute()
const collection = computed<BlogCollection>(() => `blog_${locale.value}` as BlogCollection)
const localePath = useLocalePath()
const siteUrl = useSiteConfig().url
const blogTranslation = useBlogTranslation()
const defaultCoverImage = '/og-default.png'

const { data: post } = await useAsyncData(
    () => `blog-post-${route.path}`,
    () => queryCollection(collection.value).path(route.path).first(),
    { watch: [locale] },
)

const readingMinutes = computed(() => getReadingMinutes(post.value?.body))

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
    const alt = await queryCollection(`blog_${targetLocale}` as BlogCollection)
        .where('translationKey', '=', translationKey)
        .first()
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

// --- JSON-LD: Article + Breadcrumb ---
useHead(() => {
    if (!post.value) return {}
    const breadcrumbName = locale.value === 'id' ? 'Beranda' : 'Home'
    return {
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: post.value.title,
                    description: post.value.description,
                    image: [ogImage.value],
                    datePublished: post.value.publishedAt,
                    dateModified: post.value.publishedAt,
                    author: { '@type': 'Organization', name: 'Kertaas', url: siteUrl },
                    publisher: {
                        '@type': 'Organization',
                        name: 'Kertaas',
                        logo: { '@type': 'ImageObject', url: `${siteUrl}/kertas.png` },
                    },
                    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}${route.path}` },
                }),
            },
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: breadcrumbName, item: siteUrl },
                        { '@type': 'ListItem', position: 2, name: t('blog.title'), item: `${siteUrl}${localePath('/blog')}` },
                        { '@type': 'ListItem', position: 3, name: post.value.title, item: `${siteUrl}${route.path}` },
                    ],
                }),
            },
        ],
    }
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
                <template v-if="readingMinutes">
                    <span class="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
                    <span>{{ t('blog.readingTime', { minutes: readingMinutes }) }}</span>
                </template>
                <span class="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
                <span>Admin</span>
            </div>

            <!-- Share -->
            <div class="mt-5 flex flex-wrap items-center gap-2">
                <span class="text-sm text-ink-soft">{{ t('blog.share') }}</span>

                <a v-for="link in shareLinks" :key="link.name" :href="link.href" target="_blank"
                    rel="noopener noreferrer" :aria-label="`${t('blog.share')} ${link.name}`"
                    class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-ink-soft transition-colors hover:border-accent hover:text-accent-dark">
                    <!-- WhatsApp -->
                    <svg v-if="link.name === 'WhatsApp'" viewBox="0 0 24 24" class="h-[18px] w-[18px]"
                        fill="currentColor" aria-hidden="true">
                        <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path
                            d="M12.004 2C6.486 2 2.01 6.476 2.01 11.994c0 1.993.586 3.847 1.595 5.407L2 22l4.727-1.588a9.953 9.953 0 0 0 5.277 1.49h.004c5.518 0 9.994-4.477 9.994-9.995C21.998 6.476 17.521 2 12.004 2Zm0 18.195h-.003a8.19 8.19 0 0 1-4.17-1.141l-.3-.178-3.1 1.042.996-3.03-.196-.312a8.172 8.172 0 0 1-1.254-4.382c0-4.527 3.684-8.21 8.212-8.21 2.193 0 4.254.854 5.804 2.406a8.153 8.153 0 0 1 2.404 5.806c0 4.528-3.684 8.212-8.212 8.212Z" />
                    </svg>

                    <!-- X -->
                    <svg v-else-if="link.name === 'X'" viewBox="0 0 24 24" class="h-[15px] w-[15px]" fill="currentColor"
                        aria-hidden="true">
                        <path
                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>

                    <!-- Facebook -->
                    <svg v-else-if="link.name === 'Facebook'" viewBox="0 0 24 24" class="h-[18px] w-[18px]"
                        fill="currentColor" aria-hidden="true">
                        <path
                            d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.564v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
                    </svg>

                    <!-- LinkedIn -->
                    <svg v-else viewBox="0 0 24 24" class="h-[17px] w-[17px]" fill="currentColor" aria-hidden="true">
                        <path
                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.558V9h3.556v11.452Z" />
                    </svg>
                </a>

                <!-- Salin tautan -->
                <button type="button" :aria-label="justCopied ? t('blog.linkCopied') : t('blog.copyLink')" :class="[
                    'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                    justCopied
                        ? 'border-accent text-accent-dark'
                        : 'border-slate-200 text-ink-soft hover:border-accent hover:text-accent-dark',
                ]" @click="copyLink">
                    <svg v-if="!justCopied" viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        aria-hidden="true">
                        <path d="M10 13a5 5 0 0 0 7.07 0l2.5-2.5a5 5 0 0 0-7.07-7.07L11 4.91" />
                        <path d="M14 11a5 5 0 0 0-7.07 0l-2.5 2.5a5 5 0 0 0 7.07 7.07L13 19.09" />
                    </svg>
                    <svg v-else viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
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