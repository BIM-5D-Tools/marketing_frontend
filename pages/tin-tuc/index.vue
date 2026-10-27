<!-- frontend/pages/tin-tuc/index.vue -->
<template>
  <div class="pt-28 pb-20 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-blue-600 font-bold text-sm tracking-wider uppercase">Cập Nhật Tin Tức</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Tin Tức & Thị Trường Xây Dựng</h1>
        <p class="text-slate-600">Tổng hợp thông tư, nghị định, xu hướng công nghệ BIM và tin tức hoạt động công ty.</p>
      </div>

      <div v-if="articles && articles.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article 
          v-for="article in articles" 
          :key="article.id"
          class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div class="relative h-48 overflow-hidden bg-slate-100">
              <img 
                :src="getMediaUrl(article.cover_image)" 
                :alt="article.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="p-6">
              <h2 class="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {{ article.title }}
              </h2>
              <p class="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-4">
                {{ article.summary }}
              </p>
            </div>
          </div>

          <div class="px-6 pb-6">
            <NuxtLink 
              :to="`/tin-tuc/${article.slug}`" 
              class="text-blue-600 font-bold text-sm hover:underline inline-flex items-center gap-1"
            >
              Đọc tiếp <span>→</span>
            </NuxtLink>
          </div>
        </article>
      </div>

      <div v-else class="text-center py-16 text-slate-400">
        Đang tải danh sách bài viết...
      </div>

    </div>
  </div>
</template>

<script setup>
const { fetchApi, getMediaUrl } = useApi()
const { data: articles } = await fetchApi('/news/')

useSeoMeta({
  title: 'Tin Tức & Thị Trường BIM | TechBuilding',
  description: 'Cập nhật tin tức quy định văn bản nhà nước và xu hướng BIM.'
})
</script>