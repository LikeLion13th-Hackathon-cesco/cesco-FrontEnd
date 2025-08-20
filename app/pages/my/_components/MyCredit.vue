<template>
  <div class="my-[10px] flex items-center rounded-[15px] bg-gray-f5 py-[32px] pl-[67px] pr-[84px]">
    <img src="~/assets/icon/creditIcon-large.png" alt="my-credit-icon" class="w-[133px]" />
    <div class="ml-[32px] flex flex-col items-start gap-[5px]">
      <span class="text-[32px] font-[600] text-foreground">현재 보유 크레딧</span>
      <span class="text-[32px] font-[600] text-primary">{{ props.credit.toLocaleString() }} P</span>
    </div>
    <button
      class="ml-auto rounded-[10px] bg-primary px-[40px] py-[10px] text-[28px] font-[600] text-gray-fe"
    >
      크레딧 사용 제휴처 확인
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  credit: number;
}>();
</script>
