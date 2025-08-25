<template>
  <div class="mb-[100px] flex flex-col items-center justify-center">
    <div class="text-[40px] font-[700] text-gray-1a">
      다음 중 전입신고에 대한 설명으로 옳지 않은 것은?
    </div>
    <div class="mt-[50px] flex flex-col gap-[40px]">
      <div
        :class="[
          'flex cursor-pointer items-center justify-center rounded-2xl border-[1.50px] px-[175px] py-[27px] text-[28px] font-[500]',
          selectedOption === 1
            ? 'border-[3px] border-primary bg-secondary'
            : 'border-zinc-400 hover:border-[3px] hover:border-primary hover:bg-secondary',
        ]"
        @click="selectOption(1)"
      >
        보증금 보호를 위해 전입신고는 필수다.
      </div>
      <div
        :class="[
          'flex cursor-pointer items-center justify-center rounded-2xl border-[1.50px] px-[175px] py-[27px] text-[28px] font-[500]',
          selectedOption === 2
            ? 'border-[3px] border-primary bg-secondary'
            : 'border-zinc-400 hover:border-[3px] hover:border-primary hover:bg-secondary',
        ]"
        @click="selectOption(2)"
      >
        전입신고는 동사무소나 온라인에서 할 수 있다.
      </div>
      <div
        :class="[
          'flex cursor-pointer items-center justify-center rounded-2xl border-[1.50px] px-[175px] py-[27px] text-[28px] font-[500]',
          selectedOption === 3
            ? 'border-[3px] border-primary bg-secondary'
            : 'border-zinc-400 hover:border-[3px] hover:border-primary hover:bg-secondary',
        ]"
        @click="selectOption(3)"
      >
        전입신고를 하면 확정일자가 자동으로 부여된다.
      </div>
      <div
        :class="[
          'flex cursor-pointer items-center justify-center rounded-2xl border-[1.50px] px-[175px] py-[27px] text-[28px] font-[500]',
          selectedOption === 4
            ? 'border-[3px] border-primary bg-secondary'
            : 'border-zinc-400 hover:border-[3px] hover:border-primary hover:bg-secondary',
        ]"
        @click="selectOption(4)"
      >
        전입신고를 하면 주민등록 주소가 해당 집으로 변경된다.
      </div>
    </div>
    <button
      class="mt-[50px] flex items-center justify-center rounded-[10px] bg-[#B4B4B4] px-[182px] py-[15px] text-[32px] font-[600] text-gray-fe hover:bg-primary"
      @click="goToResult"
    >
      확인하기
    </button>
  </div>
</template>

<script setup lang="ts">
import { apiInstance } from "~/utils/api";
import { useMutation } from "@tanstack/vue-query";
import type { QuizResponse } from "./_api/types/quiz";
import type { BaseResponse } from "~/utils/api";

const selectedOption = ref<number | null>(null); //선택한 정답 저장

const submitQuizMutation = useMutation({
  mutationFn: async (answerData: { selectedOption: number; quizId: number; userId: number }) => {
    const response = await apiInstance.put("v1/quiz/result", answerData);
    return response.data as BaseResponse<QuizResponse>;
  },
  onSuccess: (response) => {
    console.log("사용자가 선택한 옵션 (화면):", selectedOption.value);
    console.log("API로 전송된 값:", selectedOption);
    console.log("정답:", response.data.correctAnswer);
    console.log("판정 결과:", response.data.isCorrect);
    console.log("전체 응답:", response);
    console.log("퀴즈 제출 성공:", response);
    if (response.data.isCorrect === true) {
      console.log("정답! Correct 페이지로 이동");
      navigateTo("/quiz/Correct");
    } else {
      navigateTo("/quiz/False");
    }
  },
  onError: (error) => {
    console.error("퀴즈 제출 실패:", error);
    alert("퀴즈 제출에 실패했습니다. 다시 시도해주세요.");
  },
});

const selectOption = (optionNumber: number) => {
  selectedOption.value = optionNumber;
};

const goToResult = () => {
  if (selectedOption.value === null) {
    alert("답을 선택해주세요.");
    return;
  }

  submitQuizMutation.mutate({
    selectedOption: selectedOption.value,
    quizId: 1,
    userId: 1,
  });
};
</script>
