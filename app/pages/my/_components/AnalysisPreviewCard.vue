<script setup lang="ts">
import RightArrowGrayIcon from "@/assets/icon/right-arrow-gray.svg";

const props = defineProps<{
  address: string;
  safetyScore: number;
  safetyDescription: string;
  reportId: number;
}>();
</script>

<template>
  <div class="flex gap-[50px] rounded-[15px] border border-gray-d9 px-[60px] py-[40px]">
    <div class="flex min-w-[350px] max-w-[350px] flex-col gap-[20px] self-center">
      <span class="text-[28px] font-[600] text-foreground">{{ props.address }}</span>
      <div class="flex">
        <StarRatings :rating="props.safetyScore / 2" :size="60" />
      </div>
      <span class="text-[24px] font-[500] text-foreground">
        안전지수
        <span class="font-[600] text-primary">{{ props.safetyScore }}점</span>
        / 10점
      </span>
    </div>
    <div class="h-[240px] w-[1px] bg-gray-d9"></div>
    <div class="flex flex-col items-start justify-between overflow-hidden">
      <div>
        <SafetyTypeChip :score="props.safetyScore" />
        <p class="mt-[30px] line-clamp-3 break-all text-[20px] font-[400] text-foreground">
          {{ props.safetyDescription }}
        </p>
      </div>
      <span
        class="flex cursor-pointer items-center gap-2 text-[20px] font-[400] text-gray-b4"
        @click="navigateTo(`/analyze/result/${props.reportId}`)"
      >
        자세히 보기
        <RightArrowGrayIcon class="h-[10px]" :font-controlled="false" filled="false" />
      </span>
    </div>
  </div>
</template>
