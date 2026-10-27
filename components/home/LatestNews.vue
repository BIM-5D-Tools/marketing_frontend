<!-- frontend/components/home/LatestNews.vue -->
<template>
  <section id="news" class="py-24 bg-white border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span class="text-blue-600 font-bold text-sm tracking-wider uppercase">Cập Nhật Thông Tin</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Tin Tức & Thị Trường</h2>
        </div>
        <NuxtLink to="/tin-tuc" class="mt-4 md:mt-0 text-blue-600 font-bold text-sm hover:underline inline-flex items-center gap-1">
          Xem tất cả bài viết <span>→</span>
        </NuxtLink>
      </div>

      <div v-if="articles && articles.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article 
          v-for="article in articles" 
          :key="article.id"
          class="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div class="relative h-48 overflow-hidden bg-slate-200">
              <img 
                :src="getMediaUrl(article.cover_image)" 
                :alt="article.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="p-6">
              <span class="text-xs font-semibold text-slate-400 block mb-2">
                📅 {{ formatDate(article.created_at || article.published_at) }}
              </span>
              <h3 class="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {{ article.title }}
              </h3>
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

      <div v-else class="text-center py-12 text-slate-400 text-sm">
        Đang tải bài viết tin tức...
      </div>

    </div>
  </section>
</template>

<script setup>
const { fetchApi, getMediaUrl } = useApi()
const { data: articles } = await fetchApi('/news/')

const formatDate = (dateStr) => {
  if (!dateStr) return 'Mới cập nhật'
  return new Date(dateStr).toLocaleDateString('vi-VN')
}
</script>