<!-- components/services/Bim6dLayout.vue -->
<template>
  <div class="space-y-12">
    <!-- Mô tả Vận Hành & IFC Viewer -->
    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <span class="text-blue-600 font-bold text-xs uppercase tracking-wider"
        >Quản Lý Tài Sản & Vận Hành</span
      >
      <h3 class="text-2xl font-bold text-slate-900 mt-2 mb-4">
        BIM 6D - Quản Lý Vận Hành Vòng Đời Công Trình
      </h3>
      <p class="text-slate-600 text-sm leading-relaxed mb-8">
        {{
          detail?.description ||
          "Tích hợp toàn bộ thông tin thiết bị, lịch bảo trì bảo dưỡng vào mô hình IFC 3D giúp ban quản lý tòa nhà vận hành hiệu quả."
        }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h4 class="font-bold text-slate-900 mb-2">
            📄 Quản Lý File IFC Mô Hình
          </h4>
          <p class="text-xs text-slate-500 mb-4">
            Mô hình IFC được chuẩn hóa thông tin liên kết thiết bị.
          </p>
          <a
            v-if="detail?.ifc_file"
            :href="getMediaUrl(detail.ifc_file)"
            target="_blank"
            class="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold inline-block"
          >
            Tải file IFC Demo
          </a>
        </div>

        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h4 class="font-bold text-slate-900 mb-2">
            🌐 Liên Kết Dữ Liệu Thiết Bị
          </h4>
          <p class="text-xs text-slate-500">
            Truy xuất nhật ký bảo trì, thông số kỹ thuật của từng thiết bị ngay
            trên mô hình 3D.
          </p>
        </div>
      </div>
    </div>

    <!-- Khối Xem Ảnh 360 Độ (Slide 9) -->
    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-blue-600"></span>
        Trải Nghiệm Thực Tế Nhìn 360° (Panorama)
      </h3>
      <div
        v-if="detail?.panorama_images && detail.panorama_images.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div
          v-for="pano in detail.panorama_images"
          :key="pano.id"
          class="rounded-2xl overflow-hidden border border-slate-200 shadow-xs"
        >
          <img
            :src="pano.image_url"
            :alt="pano.caption"
            class="w-full h-64 object-cover"
          />
          <p
            class="p-3 bg-slate-50 text-xs font-bold text-center text-slate-700"
          >
            {{ pano.caption }}
          </p>
        </div>
      </div>
      <div
        v-else
        class="text-center py-12 bg-slate-50 rounded-2xl text-slate-400 text-sm"
      >
        [ Trình xem ảnh Panorama 360 độ tương tác ]
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["detail"]);
const { getMediaUrl } = useApi();
</script>
