<template>
  <div
    class="flex h-[487px] w-[676px] flex-col items-center rounded-[15px] bg-white px-[100px] py-[60px]"
  >
    <CheckIcon filled="false" :font-controlled="false" class="h-[95px] w-[95px]"></CheckIcon>
    <div
      class="mb-[20px] mt-[34px] justify-start font-['Pretendard'] text-3xl font-semibold text-zinc-900"
    >
      신고 접수가 완료되었습니다.
    </div>
    <div class="mb-[30px] justify-start text-center">
      <span class="font-['Pretendard'] text-2xl font-normal leading-6 text-neutral-400">
        소중한 신고 감사합니다.
        <br />
        감사 크레딧
      </span>
      <span class="font-['Pretendard'] text-2xl font-semibold leading-6 text-blue-500">500P</span>
      <span class="font-['Pretendard'] text-2xl font-normal leading-6 text-neutral-400">
        가 적립되었습니다.
      </span>
    </div>
    <div class="flex gap-10">
      <button
        class="flex h-16 w-56 items-center justify-center rounded-[10px] bg-[#B4B4B4] text-[26px] font-semibold text-white"
        @click="handleClose"
      >
        닫기
      </button>
      <button
        class="flex h-16 w-56 items-center justify-center rounded-[10px] bg-blue-500 text-[26px] font-semibold text-white"
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
