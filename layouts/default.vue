<!-- frontend/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative">
    <!-- Component Header -->
    <CommonHeader @open-modal="isModalOpen = true" />

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Component Footer -->
    <CommonFooter />

    <!-- Component Contact Modal Popup -->
    <CommonContactModal :isOpen="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<script setup>
const isModalOpen = ref(false);
</script>
