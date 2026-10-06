<script setup lang="ts">
const { locale, t } = useI18n()
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

useSeoMeta({
    title: () => t('blog.seoTitle'),
    description: () => t('blog.seoDescription'),
})
</script>

<template>
    <div>
        <p class="pt-7 text-sm text-ink-soft">
            <NuxtLinkLocale to="/" class="hover:text-accent-dark">{{ t('common.breadcrumbHome') }}</NuxtLinkLocale> /
            {{ t('blog.title') }}
        </p>

        <h1 class="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{{ t('blog.title') }}</h1>
        <p class="mt-2 max-w-[52ch] text-base text-ink-soft">{{ t('blog.lede') }}</p>

        <ul class="mt-8 grid gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="post in posts" :key="post.path"
                class="group overflow-hidden rounded-md border border-slate-200 bg-white transition-shadow hover:shadow-md">
                <NuxtLink :to="post.path" class="block">
                    <div class="aspect-[1200/630] w-full overflow-hidden bg-slate-100">
                        <img :src="post.coverImage || '/og-default.jpg'" :alt="post.title" loading="lazy"
                            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105">
                    </div>
                    <div class="p-5">
                        <p class="text-xs text-ink-soft">{{ formatDate(post.publishedAt) }}</p>
                        <h2 class="mt-1.5 text-lg font-semibold text-ink group-hover:text-accent-dark">
                            {{ post.title }}
                        </h2>
                        <p class="mt-2 line-clamp-2 text-sm text-ink-soft">{{ post.description }}</p>
                        <span class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-dark">
                            {{ t('blog.readMore') }}
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>