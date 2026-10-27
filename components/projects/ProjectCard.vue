<!-- frontend/components/projects/ProjectCard.vue -->
<template>
  <div
    class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
  >
    <!-- Thumbnail với hiệu ứng Zoom 105 -->
    <div class="relative h-64 overflow-hidden bg-slate-100">
      <img
        :src="getMediaUrl(project.thumbnail)"
        :alt="project.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />
      <span
        class="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-blue-600 font-bold text-xs rounded-full shadow-sm"
      >
        {{ project.category_name || "Dự án" }}
      </span>
    </div>

    <!-- Thông tin dự án -->
    <div class="p-6 flex flex-col flex-grow justify-between">
      <div>
        <h3
          class="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2"
        >
          {{ project.title }}
        </h3>
        <div class="space-y-1.5 text-xs text-slate-500 mb-6">
          <p class="flex items-center gap-1.5">
            📍 {{ project.address }}
          </p>
          <p class="flex items-center gap-1.5">
            🏢 CĐT: {{ project.investor }}
          </p>
        </div>
      </div>

      <NuxtLink
        :to="`/du-an/${project.slug}`"
        class="block w-full text-center py-3 bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white font-bold text-sm rounded-xl transition-colors"
      >
        Xem chi tiết dự án
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["project"]);
const { getMediaUrl } = useApi();
</script>
