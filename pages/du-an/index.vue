<!-- frontend/pages/du-an/index.vue -->
<template>
  <div class="pt-28 pb-20 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-blue-600 font-bold text-sm tracking-wider uppercase">Hồ Sơ Năng Lực</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Danh Sách Dự Án</h1>
        <p class="text-slate-600">Tổng hợp các công trình tiêu biểu đã triển khai thành công ứng dụng giải pháp BIM.</p>
      </div>

      <!-- Tab Lọc Danh mục Dự án thực tế từ Backend -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button 
          @click="activeCategorySlug = 'all'"
          class="px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
          :class="activeCategorySlug === 'all' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'"
        >
          Tất cả
        </button>
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="activeCategorySlug = cat.slug"
          class="px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
          :class="activeCategorySlug === cat.slug ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'"
        >
          {{ cat.name }}
        </button>
      </div>

      <div v-if="filteredProjects && filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.id" 
          :project="project" 
        />
      </div>

      <div v-else class="text-center py-16 text-slate-400">
        Không có dự án nào trong mục này.
      </div>

    </div>
  </div>
</template>

<script setup>
import ProjectCard from '~/components/projects/ProjectCard.vue'

const { fetchApi } = useApi()
const { data: categories } = await fetchApi('/project-categories/')
const { data: projects } = await fetchApi('/projects/')

const activeCategorySlug = ref('all')

const filteredProjects = computed(() => {
  if (!projects.value) return []
  if (activeCategorySlug.value === 'all') return projects.value
  return projects.value.filter(p => p.category?.slug === activeCategorySlug.value || p.category_name === activeCategorySlug.value)
})

useSeoMeta({
  title: 'Hồ Sơ Năng Lực & Dự Án | TechBuilding',
  description: 'Tổng hợp các dự án tiêu biểu ứng dụng công nghệ BIM.'
})
</script>