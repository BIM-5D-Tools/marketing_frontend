<!-- frontend/components/common/ContactModal.vue -->
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
  >
    <div
      class="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative p-8"
    >
      <!-- Nút đóng Modal -->
      <button
        @click="$emit('close')"
        class="absolute top-6 right-6 text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer"
      >
        ✕
      </button>

      <h3 class="text-2xl font-bold text-slate-900 mb-2">
        Đăng Ký Tư Vấn Dịch Vụ
      </h3>
      <p class="text-slate-500 text-sm mb-6">
        Để lại thông tin để đội ngũ chuyên gia DDIC liên hệ lại trong
        thời gian sớm nhất.
      </p>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1"
            >Họ và tên *</label
          >
          <input
            v-model="form.full_name"
            required
            type="text"
            class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1"
              >Email *</label
            >
            <input
              v-model="form.email"
              required
              type="email"
              class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1"
              >Số điện thoại *</label
            >
            <input
              v-model="form.phone"
              required
              type="text"
              class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1"
            >Lời nhắn</label
          >
          <textarea
            v-model="form.message"
            rows="3"
            class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-sm shadow-md shadow-blue-600/20 cursor-pointer"
        >
          Gửi Yêu Cầu Tư Vấn
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["isOpen"]);
const emit = defineEmits(["close"]);

const config = useRuntimeConfig();
const form = ref({ full_name: "", email: "", phone: "", message: "" });

const submitForm = async () => {
  try {
    await $fetch(`${config.public.apiBase}/contact-submit/`, {
      method: "POST",
      body: form.value,
    });
    alert("Gửi thông tin tư vấn thành công!");
    form.value = { full_name: "", email: "", phone: "", message: "" };
    emit("close");
  } catch (e) {
    alert("Có lỗi xảy ra, vui lòng thử lại!");
  }
};
</script>
