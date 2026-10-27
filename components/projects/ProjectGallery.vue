<!-- frontend/components/projects/ProjectGallery.vue -->
<template>
  <div class="space-y-6">
    <h3 class="text-xl font-bold text-slate-900">
      Hình ảnh mô hình & Triển khai dự án[cite: 1]
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(img, idx) in gallery"
        :key="idx"
        @click="$emit('select-image', idx)"
        class="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-100"
      >
        <img
          :src="getMediaUrl(img.image || img.src)"
          :alt="img.caption"
          class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          v-if="img.caption"
          class="p-3 bg-slate-900/80 text-white text-xs text-center absolute bottom-0 inset-x-0 backdrop-blur-xs"
        >
          {{ img.caption }}[cite: 1]
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["gallery"]);
defineEmits(["select-image"]);

const { getMediaUrl } = useApi();
</script>
