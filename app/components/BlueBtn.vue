<template>
  <div
    class="box-border inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-blue-500 px-20 py-5"
  >
    <div class="justify-start font-['Pretendard'] text-3xl font-semibold leading-10 text-white">
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
