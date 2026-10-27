<!-- frontend/components/home/HeroBanner.vue -->
<template>
  <section id="hero" class="relative w-full h-screen overflow-hidden bg-slate-950">
    <swiper
      v-if="banners && banners.length > 0"
      :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]"
      :effect="'fade'"
      :fadeEffect="{ crossFade: true }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      class="w-full h-full"
    >
      <swiper-slide 
        v-for="banner in banners" 
        :key="banner.id" 
        class="relative w-full h-full bg-slate-950"
      >
        <img 
          :src="getMediaUrl(banner.image)" 
          :alt="banner.title" 
          class="w-full h-full object-cover object-center filter brightness-50" 
        />
        
        <div class="absolute inset-0 bg-slate-950/30 flex items-center pt-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="max-w-2xl bg-slate-900/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl text-white">
              <span class="inline-block px-3.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-5 uppercase tracking-wider">
                BIM & PMIS Solution
              </span>
              <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
                {{ banner.title }}
              </h1>
              <p class="text-slate-200 text-base sm:text-lg leading-relaxed mb-8 font-normal">
                {{ banner.subtitle }}
              </p>
              <div class="flex flex-wrap gap-4">
                <NuxtLink to="/dich-vu" class="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md transition-all">
                  Khám phá Dịch vụ BIM
                </NuxtLink>
                <NuxtLink to="/lien-he" class="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all">
                  Nhận Báo Giá
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div v-else class="w-full h-full flex items-center justify-center text-slate-500 text-sm">
      Đang tải dữ liệu Banner...
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay as SwiperAutoplay, EffectFade as SwiperEffectFade, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const { fetchApi, getMediaUrl } = useApi()
const { data: banners } = await fetchApi('/hero-banners/')
</script>

<style>
.swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.5) !important;
  opacity: 1 !important;
}
.swiper-pagination-bullet-active {
  background: #2563eb !important;
  width: 28px !important;
  border-radius: 6px !important;
}
</style>