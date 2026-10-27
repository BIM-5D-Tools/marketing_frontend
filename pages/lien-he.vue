<!-- pages/lien-he.vue -->
<template>
  <div class="pt-28 pb-20 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center mb-12">
        <span class="text-blue-600 font-bold text-sm tracking-wider uppercase"
          >Liên Hệ TechBuilding</span
        >
        <h1 class="text-3xl font-extrabold text-slate-900 mt-2 mb-4">
          Gửi Yêu Cầu Tư Vấn
        </h1>
        <p class="text-slate-600">
          Chúng tôi luôn sẵn sàng hỗ trợ giải đáp các thắc mắc về giải pháp BIM
          và hệ thống PMIS.
        </p>
      </div>

      <!-- Import lại Component Form Liên hệ từ Home -->
      <ContactSection />
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Liên Hệ Đội Ngũ Chuyên Gia | TechBuilding",
  description:
    "Thông tin liên hệ tư vấn giải pháp BIM và PMIS cho dự án xây dựng.",
});
</script>
