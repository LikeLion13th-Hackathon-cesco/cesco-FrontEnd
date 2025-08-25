<template>
  <div
    class="box-border flex w-[894px] items-center justify-start gap-[23px] rounded-[15px] bg-gray-f5 px-[50px] py-[30px]"
  >
    <div
      class="flex h-16 w-16 items-center justify-center rounded-[15px] bg-primary text-[40px] text-background"
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
