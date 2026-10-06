<script setup lang="ts">
const { locale, locales, t } = useI18n()
const route = useRoute()
const collection = computed(() => `blog_${locale.value}`)
const localePath = useLocalePath()
const siteUrl = useSiteConfig().url
const blogTranslation = useBlogTranslation()

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

const ogImage = computed(() => `${siteUrl}${post.value?.coverImage ?? '/og-default.jpg'}`)

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
    <article v-if="post">
        <p class="pt-7 text-sm text-ink-soft">
            <NuxtLinkLocale to="/" class="hover:text-accent-dark">{{ t('common.breadcrumbHome') }}</NuxtLinkLocale> /
            <NuxtLink :to="localePath('/blog')" class="hover:text-accent-dark">{{ t('blog.title') }}</NuxtLink> /
            {{ post.title }}
        </p>


        <h1 class="mt-3 max-w-[32ch] text-3xl font-semibold leading-tight text-accent-dark sm:text-4xl">
            {{ post.title }}
        </h1>
        <p class="mt-2 text-sm text-ink-soft mb-2">
            {{ formatDate(post.publishedAt) }} | Author by Admin
        </p>

        <div class="mt-6 overflow-hidden rounded-t-lg border border-slate-200">
            <img :src="post.coverImage || '/blog/placeholder.jpg'" :alt="post.title"
                class="aspect-[1200/630] w-full object-cover">
        </div>
        <div class="bg-white p-8 rounded-b-lg">
            <div class="prose prose-slate mt-8 max-w-none pb-10 
            prose-h2:text-accent-dark prose-h2:font-semibold 
            prose-h3:text-accent-dark
            prose-strong:text-accent-dark
            prose-a:text-accent-dark prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-accent
            ">
                <ContentRenderer :value="post" />
            </div>

            <div v-if="post.relatedToolPath" class="mb-16 rounded-md border border-accent bg-accent-tint px-5 py-4">
                <p class="text-sm text-ink">
                    {{ t('blog.tryToolCta') }}
                    <NuxtLinkLocale :to="post.relatedToolPath"
                        class="font-semibold text-accent-dark underline hover:text-accent">
                        {{ t('blog.tryToolLink') }}
                    </NuxtLinkLocale>
                </p>
            </div>
        </div>

    </article>
</template>