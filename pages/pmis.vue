<!-- pages/pmis.vue -->
<template>
  <div class="pt-28 pb-20 bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-12">
        <span
          class="px-3.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 uppercase"
        >
          Giải Pháp Quản Lý Dự Án
        </span>
        <h1
          class="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight"
        >
          Hệ Thống PMIS TechBuilding
        </h1>
        <p class="text-slate-600 text-lg leading-relaxed">
          Nền tảng quản lý dự án trực quan nhấn mạnh vào công tác quản lý thiết
          kế và kiểm soát tiến độ công trình bằng hình ảnh số hóa.
        </p>
      </div>

      <!-- Feature Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-2">
              1. Quản lý thiết kế & So sánh bản vẽ
            </h3>
            <p class="text-slate-600 text-sm">
              Cho phép số hóa quy trình phê duyệt hồ sơ, phát hiện sự sai lệch
              giữa các phiên bản thiết kế tức thì.
            </p>
          </div>
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-2">
              2. Quản lý dự án bằng hình ảnh
            </h3>
            <p class="text-slate-600 text-sm">
              Theo dõi hiện trạng công trình trực quan thông qua mô hình 3D và
              hệ thống ảnh Panorama 360.
            </p>
          </div>
        </div>

        <div
          class="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-2xl"
        >
          <div
            class="aspect-video bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center text-slate-400"
          >
            <p class="text-sm font-medium">
              [ Demo Giao diện Hệ thống PMIS TechBuilding ]
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Hệ Thống PMIS - Quản Lý Dự Án & Thiết Kế Trực Quan | TechBuilding",
  description:
    "Giới thiệu hệ thống phần mềm PMIS quản lý dự án bằng hình ảnh và mô hình số hóa.",
});
</script>
