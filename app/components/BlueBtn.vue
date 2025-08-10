<template>
  <div
    class="px-20 py-5 bg-blue-500 rounded-2xl inline-flex justify-center items-center gap-2.5 box-border"
  >
    <div class="justify-start text-white text-3xl font-semibold font-['Pretendard'] leading-10">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "월 8,900원으로 PLUS 서비스 이용",
  },
});
</script>
