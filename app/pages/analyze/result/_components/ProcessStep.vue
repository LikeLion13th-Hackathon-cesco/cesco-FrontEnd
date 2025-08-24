<script setup lang="ts">
defineProps<{
  step: number;
  title: string;
}>();
</script>

<template>
  <div class="flex max-w-[180px] flex-col items-center gap-[20px]">
    <span class="text-[28px] font-[700] text-primary">STEP {{ step }}</span>
    <div class="h-[180px] w-[180px]">
      <slot name="icon" />
    </div>
    <div class="pt-[20px] text-center text-[20px] font-[500] text-gray-8f">
      <span class="block text-[24px] font-[700] text-foreground">{{ title }}</span>
      <p class="mt-[10px] break-keep">
        <slot name="description"></slot>
      </p>
    </div>
  </div>
</template>
