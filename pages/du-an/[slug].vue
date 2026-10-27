<!-- frontend/pages/du-an/[slug].vue -->
<template>
  <div class="pt-28 pb-20 bg-white min-h-screen">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <NuxtLink to="/du-an" class="inline-flex items-center gap-2 text-blue-600 font-bold text-sm mb-8 hover:underline">
        ← Quay lại danh sách dự án
      </NuxtLink>

      <div v-if="project" class="space-y-12">
        <div class="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200">
          <span class="px-3.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase">
            {{ project.category?.name || 'Dự án' }}
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-6">
            {{ project.title }}
          </h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 border-t border-slate-200 pt-6">
            <p><strong>📍 Địa điểm:</strong> {{ project.address }}</p>
            <p><strong>🏢 Chủ đầu tư:</strong> {{ project.investor }}</p>
            <p v-if="project.scale"><strong>📐 Quy mô:</strong> {{ project.scale }}</p>
            <p v-if="project.bim_level"><strong>⚡ Cấp độ BIM:</strong> {{ project.bim_level }}</p>
          </div>
        </div>

        <div class="rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <img :src="getMediaUrl(project.thumbnail)" :alt="project.title" class="w-full h-[450px] object-cover" />
        </div>

        <div class="prose max-w-none text-slate-700 leading-relaxed">
          <h3 class="text-2xl font-bold text-slate-900 mb-4">Tổng quan dự án</h3>
          <p class="text-base">{{ project.overview || project.description }}</p>
        </div>

        <!-- Gallery Ảnh Kèm Theo -->
        <div v-if="project.images && project.images.length > 0" class="space-y-6">
          <h3 class="text-2xl font-bold text-slate-900">Hình ảnh triển khai & Mô hình</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="img in project.images" 
              :key="img.id"
              class="rounded-2xl overflow-hidden border border-slate-200 shadow-xs group"
            >
              <img :src="getMediaUrl(img.image)" :alt="img.caption" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              <p v-if="img.caption" class="p-3 bg-slate-50 text-slate-600 text-xs text-center font-medium border-t border-slate-200">
                {{ img.caption }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 text-slate-400">
        Đang tải thông tin dự án...
      </div>

    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { fetchApi, getMediaUrl } = useApi()
const { data: project } = await fetchApi(`/projects/${route.params.slug}/`)

useSeoMeta({
  title: () => `${project.value?.title || 'Dự án'} | DDIC`,
  description: () => project.value?.overview
})
</script>