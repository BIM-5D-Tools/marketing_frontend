<!-- components/services/Bim5dLayout.vue -->
<template>
  <div class="space-y-12">
    <!-- Khối Clip Giới Thiệu & Mô Tả -->
    <div
      class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
    >
      <div class="lg:col-span-6">
        <span class="text-blue-600 font-bold text-xs uppercase tracking-wider"
          >Quản Lý Chi Phí & Khối Lượng</span
        >
        <h3 class="text-2xl font-bold text-slate-900 mt-2 mb-4">
          Giải Pháp BIM 5D Tự Động Hóa
        </h3>
        <p class="text-slate-600 leading-relaxed text-sm mb-6">
          {{
            detail?.description ||
            "Hệ thống tự động liên kết dữ liệu mô hình Revit với cơ sở dữ liệu định mức vật tư, giúp xuất tiên lượng bóc tách khối lượng nhanh chóng và chính xác."
          }}
        </p>
      </div>
      <div class="lg:col-span-6">
        <div
          class="aspect-video bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center text-white shadow-md"
        >
          <p class="text-sm text-slate-400">[ Demo Clip Giới Thiệu BIM 5D ]</p>
        </div>
      </div>
    </div>

    <!-- 2 Khối CSDL Vật Tư & Tool Revit Connect -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div
          class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl mb-6"
        >
          📦
        </div>
        <h4 class="text-lg font-bold text-slate-900 mb-3">
          CSDL Vật Tư & Mã Công Việc
        </h4>
        <p class="text-slate-600 text-sm leading-relaxed">
          {{
            detail?.materials_db_info ||
            "Hệ thống CSDL được chuẩn hóa theo tiêu chuẩn định mức xây dựng, giúp tra cứu mã hiệu và vật tư tự động."
          }}
        </p>
      </div>

      <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div
          class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl mb-6"
        >
          🔌
        </div>
        <h4 class="text-lg font-bold text-slate-900 mb-3">
          Tool BIM 5D Connect Revit
        </h4>
        <p class="text-slate-600 text-sm leading-relaxed">
          {{
            detail?.revit_tool_info ||
            "Add-in độc quyền kết nối trực tiếp mô hình Revit với hệ thống Web, đồng bộ dữ liệu khối lượng hai chiều tức thì."
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["detail"]);
</script>
