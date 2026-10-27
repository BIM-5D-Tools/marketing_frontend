<!-- frontend/components/home/ServicesOverview.vue -->
<template>
  <section id="services" class="py-24 bg-slate-50 border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-blue-600 font-bold text-sm tracking-wider uppercase">Hệ Sinh Thái Dịch Vụ</span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Dịch Vụ BIM Nổi Bật</h2>
        <p class="text-slate-600">Ứng dụng công nghệ BIM xuyên suốt từ thiết kế, dự toán đến vận hành công trình.</p>
      </div>

      <div v-if="services && services.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-black text-lg mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {{ service.name.slice(0, 6) }}
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              {{ service.name }}
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              {{ service.summary }}
            </p>
          </div>

          <div>
            <span v-if="service.is_coming_soon" class="inline-block px-3.5 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
              Sắp ra mắt (Đang phát triển)
            </span>
            <NuxtLink 
              v-else 
              :to="`/dich-vu/${service.slug}`" 
              class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-sm group-hover:translate-x-1 transition-transform"
            >
              Xem chi tiết <span>→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-slate-400 text-sm">
        Đang tải danh mục dịch vụ BIM...
      </div>

    </div>
  </section>
</template>

<script setup>
const { fetchApi } = useApi()
const { data: services } = await fetchApi('/bim-services/')
</script>