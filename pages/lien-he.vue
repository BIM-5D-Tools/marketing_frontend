<!-- pages/lien-he.vue -->
<template>
  <div class="pt-28 pb-20 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Import lại Component Form Liên hệ từ Home -->
      <ContactSection />
    </div>
  </div>
</template>

<script setup>
import ContactSection from "~/components/home/ContactSection.vue";

useSeoMeta({
  title: "Liên Hệ Đội Ngũ Chuyên Gia | TechBuilding",
  description:
    "Thông tin liên hệ tư vấn giải pháp BIM và PMIS cho dự án xây dựng.",
});
</script>
