<script setup lang="ts">
import CheckIcon from "~/assets/icon/check.svg";
import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore();

const PROGRESS = ref(50);
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
        <p class="mt-[20px] text-center text-[24px] font-[400] text-gray-8f">
          분석이 완료되면 결과 페이지로
          <br />
          이동하니 잠시만 기다려주세요.
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
