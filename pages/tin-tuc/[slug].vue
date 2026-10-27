<!-- frontend/pages/tin-tuc/[slug].vue -->
<template>
  <div class="pt-28 pb-20 bg-white min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <NuxtLink to="/tin-tuc" class="inline-flex items-center gap-2 text-blue-600 font-bold text-sm mb-8 hover:underline">
        ← Quay lại danh sách tin tức
      </NuxtLink>

      <article v-if="article">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
          {{ article.title }}
        </h1>
        <div class="text-sm text-slate-400 mb-8 pb-6 border-b border-slate-200">
          Ngày đăng: {{ formatDate(article.created_at || article.published_at) }} | Chuyên mục: Tin tức thị trường
        </div>

        <img 
          :src="getMediaUrl(article.cover_image)" 
          :alt="article.title" 
          class="w-full h-96 object-cover rounded-3xl mb-8 border border-slate-200 shadow-sm" 
        />

        <div class="text-slate-700 leading-relaxed space-y-4 text-base">
          <p class="font-bold text-lg text-slate-900">{{ article.summary }}</p>
          <div class="whitespace-pre-line">{{ article.content }}</div>
        </div>
      </article>

      <div v-else class="text-center py-20 text-slate-400">
        Đang tải bài viết...
      </div>

    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { fetchApi, getMediaUrl } = useApi()
const { data: article } = await fetchApi(`/news/${route.params.slug}/`)

const formatDate = (dateStr) => {
  if (!dateStr) return 'Mới cập nhật'
  return new Date(dateStr).toLocaleDateString('vi-VN')
}

useSeoMeta({
  title: () => `${article.value?.title || 'Tin tức'} | DDIC`,
  description: () => article.value?.summary
})
</script>