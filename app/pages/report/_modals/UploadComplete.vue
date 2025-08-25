<template>
  <div
    class="flex h-[487px] w-[676px] flex-col items-center rounded-[15px] bg-background px-[100px] py-[60px]"
  >
    <CheckIcon filled="false" :font-controlled="false" class="h-[95px] w-[95px]"></CheckIcon>
    <div
      class="mb-[20px] mt-[34px] justify-start font-['Pretendard'] text-[32px] font-[600] text-gray-1a"
    >
      신고 접수가 완료되었습니다.
    </div>
    <div class="mb-[30px] justify-start text-center">
      <span class="text-[24px] font-[400] leading-6 text-gray-8f">
        소중한 신고 감사합니다.
        <br />
        감사 크레딧
      </span>
      <span class="text-[24px] font-[600] leading-6 text-primary">500P</span>
      <span class="text-[24px] font-[400] leading-6 text-gray-8f">가 적립되었습니다.</span>
    </div>
    <div class="flex gap-10">
      <button
        class="flex h-16 w-56 items-center justify-center rounded-[10px] bg-gray-b4 text-[26px] font-[600] text-background"
        @click="handleClose"
      >
        닫기
      </button>
      <button
        class="flex h-16 w-56 items-center justify-center rounded-[10px] bg-primary text-[26px] font-[600] text-background"
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
};

const handleCreditCheck = () => {
  emit("checkCredit");
  emit("close");
};
</script>
