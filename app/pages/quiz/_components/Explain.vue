<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col items-start justify-start">
      <slot name="result"></slot>
      <slot name="resultExplain"></slot>
      <div
        class="my-[40px] h-0 w-[1003px] outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-300"
      ></div>
      <div class="flex flex-col items-start">
        <div class="justify-start text-[28px] font-[600] leading-[50px] text-zinc-900">해설:</div>
        <div class="mb-[50px] justify-start text-[28px] font-[600] leading-[50px] text-zinc-900">
          전입신고가 되었더라도
          <span class="text-primary">확정일자는 별도로</span>
          받아야 합니다.
        </div>
        <div class="justify-start text-[28px] font-[400] leading-[50px] text-zinc-900">
          1. 보증금 보호를 위해 전입신고는 필수다.
        </div>
        <div class="justify-start text-[28px] font-[400] leading-[50px] text-zinc-900">
          2. 전입신고는 동사무소나 온라인에서 할 수 있다.
        </div>
        <div class="justify-start text-[28px] font-[400] leading-[50px] text-zinc-900">
          4. 전입신고를 하면 주민등록 주소가 해당 집으로 변경된다.
        </div>
        <div class="mt-[40px] flex gap-[500px]">
          <div class="justify-start text-[28px] font-[400] leading-[50px] text-zinc-900">
            -> 나머지 보기는 모두 맞는 사실입니다.
          </div>
          <button
            class="item-center flex justify-center rounded-[10px] bg-primary px-[27px] py-[15px] text-[45px] text-white"
            @click="handleModal"
          >
            ->
          </button>
        </div>
      </div>
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40"
      >
        <CompleteQuiz @close="closeModal" @check-credit="handleCreditCheck" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CompleteQuiz from "../_modals/CompleteQuiz.vue";

const isModalOpen = ref(false);
const handleModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
const handleCreditCheck = () => {
  navigateTo("/my");
  console.log("크레딧 페이지로 이동");
};
</script>
