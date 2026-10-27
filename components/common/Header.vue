<!-- frontend/components/common/Header.vue -->
<template>
  <header
    class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
    >
      <!-- Logo DDIC -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div
          class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-md shadow-blue-500/30 group-hover:bg-blue-700 transition-colors"
        >
          TB
        </div>
        <div class="flex flex-col">
          <span
            class="font-bold text-lg tracking-wider text-slate-900 uppercase"
            >DDIC</span
          >
          <span
            class="text-[10px] text-blue-600 font-semibold tracking-widest uppercase"
            >Consulting & Construction</span
          >
        </div>
      </NuxtLink>

      <!-- Menu Điều Hướng -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-semibold">
        <NuxtLink
          to="/"
          class="text-slate-700 hover:text-blue-600 transition-colors"
          >Trang chủ</NuxtLink
        >

        <!-- Sửa link Về chúng tôi: Nếu đang ở Trang chủ thì scroll mượt, nếu ở Trang con thì về trang chủ rồi scroll -->
        <a
          href="/#about"
          class="text-slate-700 hover:text-blue-600 transition-colors"
          >Về chúng tôi</a
        >

        <NuxtLink
          to="/dich-vu"
          class="text-slate-700 hover:text-blue-600 transition-colors"
          >Dịch vụ BIM</NuxtLink
        >
        <NuxtLink
          to="/du-an"
          class="text-slate-700 hover:text-blue-600 transition-colors"
          >Dự án</NuxtLink
        >
        <NuxtLink
          to="/pmis"
          class="text-slate-700 hover:text-blue-600 transition-colors"
          >PMIS</NuxtLink
        >
        <NuxtLink
          to="/tin-tuc"
          class="text-slate-700 hover:text-blue-600 transition-colors"
          >Tin tức</NuxtLink
        >
        <NuxtLink
          to="/lien-he"
          class="text-slate-700 hover:text-blue-600 transition-colors"
          >Liên hệ</NuxtLink
        >
      </nav>

      <!-- Nút Đăng ký tư vấn Nhanh (Kích hoạt Modal) -->
      <button
        @click="$emit('open-modal')"
        class="hidden lg:block px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
      >
        Tư vấn ngay
      </button>
    </div>
  </header>
</template>

<script setup>
defineEmits(["open-modal"]);
</script>
