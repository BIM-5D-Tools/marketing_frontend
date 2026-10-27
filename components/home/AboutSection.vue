<!-- frontend/components/home/AboutSection.vue -->
<template>
  <section id="about" class="py-24 bg-white border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Số liệu đếm số động từ Backend -->
      <div
        v-if="displayMetrics.length > 0"
        class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
      >
        <div
          v-for="metric in displayMetrics"
          :key="metric.id"
          class="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-500/40 transition-all text-center group"
        >
          <div
            class="text-4xl sm:text-5xl font-black text-blue-600 mb-2 group-hover:scale-105 transition-transform"
          >
            <span>{{ metric.displayNumber }}</span>
            <span class="text-2xl text-blue-500 font-semibold">{{ metric.unit }}</span>
          </div>
          <p class="text-slate-600 font-medium text-sm sm:text-base">
            {{ metric.label }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-6">
          <span class="text-blue-600 font-bold text-sm tracking-wider uppercase">Về Doanh Nghiệp</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-2 mb-6">
            Giải Pháp Xây Dựng Số Hóa Tiên Phong
          </h2>
          <p class="text-slate-600 leading-relaxed mb-6">
            Doanh nghiệp hoạt động trong lĩnh vực tư vấn thiết kế và xây dựng
            với sứ mệnh cung cấp dịch vụ tư vấn công nghệ cao trong ngành xây dựng.
          </p>
          <div class="p-6 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 text-sm leading-relaxed shadow-xs">
            🎯 <strong>Sứ mệnh:</strong> Mang đến các sản phẩm tư vấn xây dựng
            trung thực, minh bạch, sáng tạo và tối ưu nhằm đáp ứng tốt nhất mọi
            nhu cầu của khách hàng.
          </div>
        </div>

        <div class="lg:col-span-6 bg-slate-50 border border-slate-200/80 p-10 rounded-3xl shadow-xs">
          <h3 class="text-2xl font-bold mb-4 text-slate-900 flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-blue-600"></span>
            Tầm Nhìn & Giá Trị Cốt Lõi
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed mb-6">
            Xây dựng giá trị cốt lõi là doanh nghiệp tư vấn xây dựng, làm chủ
            các quy trình và công nghệ thiết kế để thực hiện BIM ngay từ giai
            đoạn thiết kế cơ sở.
          </p>
          <div class="grid grid-cols-2 gap-4 text-xs font-semibold text-blue-700">
            <div class="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">✓ Thiết kế Tường Minh</div>
            <div class="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">✓ Nhân sự Chuyên nghiệp</div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const { fetchApi } = useApi();
const { data: metricsData } = await fetchApi("/company-metrics/");

const displayMetrics = ref([]);

// Đồng bộ danh sách metrics
watch(
  metricsData,
  (newData) => {
    if (newData && newData.length > 0) {
      displayMetrics.value = newData.map((m) => ({
        id: m.id,
        label: m.label,
        targetValue: Number(m.value || m.target_value || 0),
        displayNumber: "0",
        unit: m.unit,
      }));
    }
  },
  { immediate: true }
);

let hasAnimated = false;
const startCounter = () => {
  if (hasAnimated || displayMetrics.value.length === 0) return;
  hasAnimated = true;

  displayMetrics.value.forEach((m) => {
    let start = 0;
    const duration = 900;  // ⚡ TĂNG TỐC: Giảm từ 2000ms xuống 900ms (nhanh gấp đôi)
    const stepTime = 16;   // ⚡ Tối ưu 60 khung hình/giây (60fps)
    const steps = duration / stepTime;
    const increment = m.targetValue / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= m.targetValue) {
        m.displayNumber = m.targetValue.toLocaleString("vi-VN");
        clearInterval(timer);
      } else {
        m.displayNumber = Math.floor(start).toLocaleString("vi-VN");
      }
    }, stepTime);
  });
};

onMounted(() => {
  // Kiểm tra vị trí hiển thị khi vừa mount (Client-side)
  const checkAndRun = () => {
    const el = document.getElementById("about");
    if (el && el.getBoundingClientRect().top < window.innerHeight - 50) {
      startCounter();
    }
  };

  checkAndRun();
  window.addEventListener("scroll", checkAndRun);
});
</script>