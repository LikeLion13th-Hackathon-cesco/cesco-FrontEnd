<template>
  <div class="flex flex-col items-center rounded-[15px] bg-white px-[100px] py-[60px]">
    <CheckIcon filled="false" :font-controlled="false" class="h-[95px] w-[95px]"></CheckIcon>
    <div
      class="mb-[20px] mt-[34px] justify-start font-['Pretendard'] text-[32px] font-[600] text-gray-1a"
    >
      문제 풀이가 완료되었습니다
    </div>
    <div class="mb-[30px] justify-start text-center">
      <span class="font-['Pretendard'] text-[24px] font-[400] text-gray-8f">
        참여 감사합니다.
        <br />
        감사 크레딧
      </span>
      <span class="font-['Pretendard'] text-[24px] font-[600] text-primary">500P</span>
      <span class="font-['Pretendard'] text-[24px] font-[400] text-gray-8f">
        가 적립되었습니다.
      </span>
    </div>
    <div class="flex gap-10">
      <button
        class="flex items-center justify-center rounded-[10px] bg-gray-b4 px-[86px] py-[22px] text-[26px] font-[600] text-background"
        @click="handleClose"
      >
        닫기
      </button>
      <button
        class="flex items-center justify-center rounded-[10px] bg-primary px-[50px] py-[22px] text-[26px] font-[600] text-background"
        @click="handleCreditCheck"
      >
        크레딧 확인
      </button>
    </div>
  </div>
</template>

<script setup>
import CheckIcon from "~/assets/icon/achievement-circle-filled.svg";

const emit = defineEmits(["close", "checkCredit"]);

const handleClose = () => {
  emit("close");
  navigateTo("/");
};

const handleCreditCheck = () => {
  emit("checkCredit");
  emit("close");
  navigateTo("/my");
};
</script>
