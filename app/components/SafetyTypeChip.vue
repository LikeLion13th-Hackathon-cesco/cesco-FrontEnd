<template>
  <div
    class="inline-block whitespace-nowrap rounded-full px-[40px] py-[15px]"
    :style="{
      backgroundColor:
        safetyType === SafetyType.Safe
          ? 'rgb(var(--primary))'
          : safetyType === SafetyType.Caution
            ? 'rgb(var(--accent-2))'
            : safetyType === SafetyType.Dangerous
              ? 'rgb(var(--destructive))'
              : 'rgb(var(--gray-8f))',
    }"
  >
    <span
      v-if="safetyType === SafetyType.Safe"
      class="block text-center text-[24px] font-[600] text-gray-fe"
    >
      이 부동산은 비교적 안전합니다.
    </span>
    <span
      v-else-if="safetyType === SafetyType.Caution"
      class="text-center text-[24px] font-[600] text-foreground"
    >
      이 부동산은 거래에 주의가 필요합니다.
    </span>
    <span
      v-else-if="safetyType === SafetyType.Dangerous"
      class="text-center text-[24px] font-[600] text-gray-fe"
    >
      이 부동산은 거래에 위험합니다.
    </span>
    <span v-else class="text-center text-[24px] font-[600] text-gray-fe">
      분석 결과를 불러오는 중...
    </span>
  </div>
</template>

<script setup lang="ts">
import getSafetyTypeByScore from "~/utils/getSafetyTypeByScore";
import { SafetyType } from "~/types/SafetyType";

const props = defineProps<{
  score: number | null;
}>();

const safetyType = computed(() => getSafetyTypeByScore(props.score));
</script>
