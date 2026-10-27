<!-- frontend/components/home/FeaturedProjects.vue -->
<template>
  <section id="projects" class="py-24 bg-white border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span class="text-blue-600 font-bold text-sm tracking-wider uppercase">Hồ Sơ Năng Lực</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">Dự Án Tiêu Biểu</h2>
        </div>
        <NuxtLink to="/du-an" class="mt-4 md:mt-0 text-blue-600 font-bold text-sm hover:underline inline-flex items-center gap-1">
          Xem tất cả dự án <span>→</span>
        </NuxtLink>
      </div>

      <div v-if="projects && projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard 
          v-for="project in projects" 
          :key="project.id" 
          :project="project" 
        />
      </div>

      <div v-else class="text-center py-12 text-slate-400 text-sm">
        Đang tải danh sách dự án...
      </div>

    </div>
  </section>
</template>

<script setup>
import ProjectCard from '~/components/projects/ProjectCard.vue'

const { fetchApi } = useApi()
const { data: projects } = await fetchApi('/projects/')
</script>