<template>
  <div
    class="box-border flex items-center justify-start gap-[23px] rounded-[15px] bg-gray-f5 px-[50px] py-[30px]"
  >
    <div
      class="flex items-center justify-center rounded-[15px] bg-primary px-[26px] py-[10px] text-[40px] text-background"
    >
      {{ checkNum }}
    </div>
    <div class="w-[634px] justify-start">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  checkNum: {
    type: String,
    default: "1",
  },
});
</script>
