<!-- frontend/pages/dich-vu/[slug].vue -->
<template>
  <div class="pt-28 pb-20 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtLink
        to="/dich-vu"
        class="inline-flex items-center gap-2 text-blue-600 font-bold text-sm mb-8 hover:underline"
      >
        ← Quay lại Danh mục Dịch vụ BIM
      </NuxtLink>

      <div v-if="service" class="space-y-12">
        <div
          class="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm"
        >
          <span
            class="px-3.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 uppercase"
          >
            {{ service.name }}
          </span>
          <h1
            class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4"
          >
            {{ service.name }}
          </h1>
          <p class="text-slate-600 max-w-3xl leading-relaxed">
            {{ service.summary }}
          </p>
        </div>

        <!-- Trạng thái Coming Soon -->
        <div
          v-if="service.is_coming_soon"
          class="bg-white p-16 rounded-3xl border border-slate-200 text-center shadow-sm"
        >
          <div
            class="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl border border-amber-200 flex items-center justify-center font-black text-3xl mx-auto mb-6"
          >
            🚀
          </div>
          <h2 class="text-2xl font-bold text-slate-900 mb-3">
            Dịch Vụ Đang Trong Giai Đoạn Phát Triển
          </h2>
          <p class="text-slate-500 max-w-md mx-auto text-sm">
            Dữ liệu dịch vụ này đang được nghiên cứu và sẽ cập nhật trong thời
            gian tới.
          </p>
        </div>

        <!-- Dynamic Components -->
        <ClientOnly v-else>
          <component
            :is="renderLayoutComponent(service.layout_type)"
            :detail="
              service.detail ||
              service.detail_3d ||
              service.detail_drawing ||
              service.detail_5d ||
              service.detail_6d
            "
          />
        </ClientOnly>
      </div>

      <div v-else class="text-center py-20 text-slate-400">
        Đang tải thông tin dịch vụ...
      </div>
    </div>
  </div>
</template>

<script setup>
import Bim3dLayout from "~/components/services/Bim3dLayout.vue";
import DrawingFlipLayout from "~/components/services/DrawingFlipLayout.vue";
import Bim5dLayout from "~/components/services/Bim5dLayout.vue";
import Bim6dLayout from "~/components/services/Bim6dLayout.vue";

const route = useRoute();
const { fetchApi } = useApi();
const { data: service } = await fetchApi(`/bim-services/${route.params.slug}/`);

const renderLayoutComponent = (layoutType) => {
  switch (layoutType) {
    case "standard_3d":
      return Bim3dLayout;
    case "drawing_flip":
      return DrawingFlipLayout;
    case "quantity_5d":
      return Bim5dLayout;
    case "operation_6d":
      return Bim6dLayout;
    default:
      return Bim3dLayout;
  }
};

useSeoMeta({
  title: () => `${service.value?.name || "Dịch vụ BIM"} | TechBuilding`,
  description: () => service.value?.summary,
});
</script>
