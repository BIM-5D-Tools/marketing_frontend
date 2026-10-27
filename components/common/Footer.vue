<!-- frontend/components/common/Footer.vue -->
<template>
  <footer
    class="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm py-12"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            >
              TB
            </div>
            <span class="font-bold text-white text-lg tracking-wider"
              >DDIC JSC</span
            >
          </div>
          <p class="text-slate-400 text-xs leading-relaxed max-w-md">
            Công ty Cổ phần tư vấn và Xây dựng DDIC - Tiên phong trong
            lĩnh vực tư vấn thiết kế xây dựng ứng dụng công nghệ cao và hệ sinh
            thái BIM.
          </p>
        </div>

        <div>
          <h4 class="text-white font-bold text-sm mb-4">Liên kết nhanh</h4>
          <ul class="space-y-2 text-xs">
            <li>
              <NuxtLink
                to="/dich-vu"
                class="hover:text-blue-400 transition-colors"
                >Dịch vụ BIM</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/du-an"
                class="hover:text-blue-400 transition-colors"
                >Hồ sơ Dự án</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/pmis" class="hover:text-blue-400 transition-colors"
                >Hệ thống PMIS</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/tin-tuc"
                class="hover:text-blue-400 transition-colors"
                >Tin tức & Thị trường</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold text-sm mb-4">Liên hệ</h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li>📍 Hà Nội, Việt Nam</li>
            <li>✉️ contact@DDIC.vn</li>
            <li>📞 Hotline: (+84) 098x xxx xxx</li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-slate-800 pt-8 text-center text-xs text-slate-500"
      >
        <p>
          © 2026 Công ty Cổ phần tư vấn và Xây dựng DDIC. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
