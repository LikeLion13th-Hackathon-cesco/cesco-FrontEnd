<template>
  <div
    class="inline-block rounded-full px-[40px] py-[15px]"
    :style="{
      backgroundColor:
        safetyType === SafetyType.Safe
          ? 'rgb(var(--primary))'
          : safetyType === SafetyType.Caution
            ? 'rgb(var(--accent-2))'
            : 'rgb(var(--destructive))',
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
    <span v-else class="text-center text-[24px] font-[600] text-gray-fe">
      이 부동산은 거래 시 위험 부담이 있습니다.
    </span>
  </div>
</template>

<script setup lang="ts">
import getSafetyTypeByScore from "~/utils/getSafetyTypeByScore";
import { SafetyType } from "~/types/SafetyType";

const props = defineProps<{
  score: number;
}>();

const safetyType = computed(() => getSafetyTypeByScore(props.score));
</script>
