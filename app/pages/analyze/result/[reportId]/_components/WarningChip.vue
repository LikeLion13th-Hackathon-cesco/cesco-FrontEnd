<script setup lang="ts">
import WarningHouse from "~/assets/icon/warning-house.svg";
</script>

<template>
  <div
    class="inline-flex items-center gap-[12px] rounded-full border-[1.5px] border-destructive bg-[#FFE5E5] px-[25px] py-[13px]"
  >
    <WarningHouse :font-controlled="false" filled="false" class="h-[24px] w-[31px]" />
    <span class="text-[20px] font-[700] text-destructive">
      셋방살이에서 사기 신고 접수된 이력이 있는 매물입니다.
    </span>
  </div>
</template>
