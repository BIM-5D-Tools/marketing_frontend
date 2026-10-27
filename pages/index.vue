<!-- pages/index.vue -->
<template>
  <div>
    <!-- Slide 1: Banner Fullpage -->
    <HeroBanner />

    <!-- Slide 2: Về chúng tôi & Con số -->
    <AboutSection />

    <!-- Slide 3: Dịch vụ BIM -->
    <ServicesOverview />

    <!-- Slide 10: Dự án -->
    <FeaturedProjects />

    <!-- Slide 12: Hệ thống PMIS -->
    <PmisSection />

    <!-- Slide 13: Tin tức -->
    <LatestNews />

    <!-- Slide 14: Form Liên hệ -->
    <ContactSection />
  </div>
</template>

<script setup>
import HeroBanner from "~/components/home/HeroBanner.vue";
import AboutSection from "~/components/home/AboutSection.vue";
import ServicesOverview from "~/components/home/ServicesOverview.vue";
import FeaturedProjects from "~/components/home/FeaturedProjects.vue";
import PmisSection from "~/components/home/PmisSection.vue";
import LatestNews from "~/components/home/LatestNews.vue";
import ContactSection from "~/components/home/ContactSection.vue";

// Tối ưu SEO Metadata cho Trang chủ Marketing
useSeoMeta({
  title: "DDIC - Giải Pháp Dịch Vụ BIM & Tư Vấn Xây Dựng Công Nghệ Cao",
  ogTitle: "DDIC JSC - Dịch Vụ BIM 3D, 4D, 5D, 6D & PMIS",
  description:
    "Công ty Cổ phần Tư vấn & Xây dựng DDIC chuyên tư vấn thiết kế, ứng dụng mô hình BIM và giải pháp quản lý PMIS cho công trình.",
  ogDescription:
    "Tiên phong ứng dụng mô hình thông tin công trình BIM, so sánh bản vẽ và tối ưu chi phí xây dựng.",
  ogImage:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
  twitterCard: "summary_large_image",
});
</script>
