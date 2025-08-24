<script setup lang="ts">
import CheckIcon from "~/assets/icon/check.svg";
import { useModalStore } from "~/stores/modal";
import { useMutationState } from "@tanstack/vue-query";
import type { AnalyzeSubmitResponse } from "../_api/types/AnalyzeSubmitResponse";
import type { BaseResponse } from "~/utils/api";

const modalStore = useModalStore();

// Track mutation state to show real progress
const mutationState = useMutationState({
  filters: { mutationKey: ["analyze-submit"] },
  select: (mutation) => ({
    status: mutation.state.status,
    data: mutation.state.data as BaseResponse<AnalyzeSubmitResponse> | undefined,
    error: mutation.state.error,
  }),
});

// Calculate progress based on mutation status
const PROGRESS = computed(() => {
  const latestState = mutationState.value?.[0];
  if (!latestState) return 0;

  switch (latestState.status) {
    case "idle":
      return 0;
    case "pending":
      return 50;
    case "success":
      return 100;
    case "error":
      return 0;
    default:
      return 0;
  }
});

// Show different messages based on status
const statusMessage = computed(() => {
  const latestState = mutationState.value?.[0];
  if (!latestState) return "제출 준비 중...";

  switch (latestState.status) {
    case "pending":
      return "분석이 완료되면 결과 페이지로\n이동하니 잠시만 기다려주세요.";
    case "success":
      return "분석이 완료되었습니다!\n결과 페이지로 이동합니다.";
    case "error":
      return "분석 중 오류가 발생했습니다.\n다시 시도해주세요.";
    default:
      return "분석이 완료되면 결과 페이지로\n이동하니 잠시만 기다려주세요.";
  }
});

// Watch for mutation completion and navigate to result page
watch(
  () => mutationState.value,
  (states) => {
    const latestState = states?.[0];
    if (latestState?.status === "success" && latestState.data?.data?.reportId) {
      // Close modal and navigate after a short delay to show completion message
      setTimeout(() => {
        modalStore.close("pdf-submitted");
        navigateTo(`/analyze/result/${latestState.data?.data.reportId}`);
      }, 1500);
    }
  },
  { deep: true }
);
</script>

<template>
  <Modal
    id="pdf-submitted"
    size="small"
    :buttons="undefined"
    @close="modalStore.close('pdf-submitted')"
  >
    <CheckIcon :font-controlled="false" filled="false" class="mx-auto h-[80px] w-[80px]" />
    <div class="flex flex-col gap-[30px]">
      <div class="mt-[25px]">
        <h1 class="text-center text-[32px] font-[600] text-foreground">제출이 완료되었습니다.</h1>
        <p class="mt-[20px] whitespace-pre-line text-center text-[24px] font-[400] text-gray-8f">
          {{ statusMessage }}
        </p>
      </div>
      <!-- 진행바 -->
      <div class="h-[10px] w-full overflow-hidden rounded-full bg-gray-d9">
        <div
          class="h-full w-full rounded-full bg-primary transition-transform duration-300 will-change-transform"
          :style="{ transform: `translateX(-${100 - PROGRESS}%)` }"
        ></div>
      </div>
      <span class="text-center text-[28px] font-[600] text-gray-b4">{{ PROGRESS }}%</span>
    </div>
  </Modal>
</template>
