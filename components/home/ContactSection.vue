<!-- frontend/components/home/ContactSection.vue -->
<template>
  <section id="contact" class="py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center mb-12">
        <span class="text-blue-600 font-bold text-sm tracking-wider uppercase">Kết Nối Với Chúng Tôi</span>
        <h2 class="text-3xl font-extrabold text-slate-900 mt-2 mb-4">Liên Hệ Tư Vấn Dịch Vụ</h2>
        <p class="text-slate-600">Gửi thông tin để nhận giải pháp ứng dụng BIM và PMIS cho dự án của bạn.</p>
      </div>

      <form @submit.prevent="submitContact" class="max-w-xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-5">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Họ và tên *</label>
          <input v-model="form.full_name" required type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Email *</label>
            <input v-model="form.email" required type="email" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Số điện thoại *</label>
            <input v-model="form.phone" required type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Nội dung lời nhắn</label>
          <textarea v-model="form.message" rows="4" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"></textarea>
        </div>
        <button type="submit" class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 cursor-pointer">
          Gửi yêu cầu tư vấn
        </button>
        <p v-if="successMsg" class="text-emerald-600 text-sm text-center mt-2 font-medium">{{ successMsg }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
const { apiBase } = useApi()
const form = ref({ full_name: '', email: '', phone: '', message: '' })
const successMsg = ref('')

const submitContact = async () => {
  try {
    await $fetch(`${apiBase}/contact-submit/`, {
      method: 'POST',
      body: form.value
    })
    successMsg.value = 'Gửi thông tin thành công! Đội ngũ sẽ liên hệ lại sớm nhất.'
    form.value = { full_name: '', email: '', phone: '', message: '' }
  } catch (e) {
    alert('Có lỗi xảy ra khi gửi form, vui lòng thử lại!')
  }
}
</script>