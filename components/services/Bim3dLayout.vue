<!-- components/services/Bim3dLayout.vue -->
<template>
  <div class="space-y-12">
    <!-- Gallery/Slider Ảnh Mô Hình BIM 3D (KT, KC, MEP) -->
    <div
      v-if="detail?.images && detail.images.length > 0"
      class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
    >
      <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-blue-600"></span>
        Mô Hình 3D Phối Hợp Các Bộ Môn (KT, KC, MEP)
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="img in detail.images"
          :key="img.id"
          class="rounded-2xl overflow-hidden border border-slate-200 shadow-xs group"
        >
          <img
            :src="getMediaUrl(img.image)"
            :alt="img.caption"
            class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <p
            v-if="img.caption"
            class="p-3 bg-slate-50 text-slate-600 text-xs text-center font-medium border-t border-slate-200"
          >
            {{ img.caption }}
          </p>
        </div>
      </div>
    </div>

    <!-- Các Khối Công Đoạn Thiết Kế (TKCS, TKBVTC, BVHC) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <span
          class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100"
          >Giai đoạn 1</span
        >
        <h4 class="text-lg font-bold text-slate-900 mt-4 mb-3">
          Nội dung BIM TKCS
        </h4>
        <p class="text-slate-600 text-sm leading-relaxed">
          {{
            detail?.content_tkcs ||
            "Xây dựng mô hình 3D sơ bộ, đánh giá phương án kiến trúc và quy mô công trình."
          }}
        </p>
      </div>

      <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <span
          class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100"
          >Giai đoạn 2</span
        >
        <h4 class="text-lg font-bold text-slate-900 mt-4 mb-3">
          Nội dung BIM TKBVTC
        </h4>
        <p class="text-slate-600 text-sm leading-relaxed">
          {{
            detail?.content_tkbvtc ||
            "Mô hình hóa chi tiết bản vẽ thi công, xử lý va chạm và bóc tách khối lượng chính xác."
          }}
        </p>
      </div>

      <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <span
          class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100"
          >Giai đoạn 3</span
        >
        <h4 class="text-lg font-bold text-slate-900 mt-4 mb-3">
          Nội dung BIM BVHC
        </h4>
        <p class="text-slate-600 text-sm leading-relaxed">
          {{
            detail?.content_bvhc ||
            "Cập nhật mô hình hoàn công thực tế sau thi công phục vụ bàn giao và quản lý tài sản."
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["detail"]);
const { getMediaUrl } = useApi();
</script>
