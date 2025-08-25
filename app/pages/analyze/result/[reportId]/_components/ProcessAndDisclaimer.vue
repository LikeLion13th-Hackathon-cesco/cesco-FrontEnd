<script setup lang="ts">
import ProcessStep from "./ProcessStep.vue";
import AnalysisStep1 from "~/assets/icon/analysis-step-1.svg";
import AnalysisStep2 from "~/assets/icon/analysis-step-2.svg";
import AnalysisStep3 from "~/assets/icon/analysis-step-3.svg";
import AnalysisStep4 from "~/assets/icon/analysis-step-4.svg";
import ChevronRightBlue from "~/assets/icon/chevron-right-blue.svg";
</script>

<template>
  <div class="px-[150px] py-[80px]">
    <h3 class="text-center text-[28px] font-[700] text-foreground">
      등기부등본 분석, 이렇게 이루어집니다!
    </h3>

    <!-- 절차 -->
    <div class="flex justify-center gap-[60px] py-[60px]">
      <!-- Step 1 -->
      <ProcessStep :step="1" title="등본 업로드">
        <template #icon>
          <AnalysisStep1 class="h-[180px] w-[180px]" :font-controlled="false" filled="false" />
        </template>
        <template #description>
          업로드 한 등본을
          <br />
          AI가 분석합니다.
        </template>
      </ProcessStep>
      <ChevronRightBlue
        class="mt-[126px] h-[41px] w-[25px]"
        :font-controlled="false"
        filled="false"
      />
      <!-- Step 2 -->
      <ProcessStep :step="2" title="분석 진행">
        <template #icon>
          <AnalysisStep2 class="h-[180px] w-[180px]" :font-controlled="false" filled="false" />
        </template>
        <template #description>
          등본에서 뭐뭐를 추출, 무엇의 기준을 바탕으로 등본을 계산하여 분석을 진행합니다.
        </template>
      </ProcessStep>
      <ChevronRightBlue
        class="mt-[126px] h-[41px] w-[25px]"
        :font-controlled="false"
        filled="false"
      />
      <!-- Step 3 -->
      <ProcessStep :step="3" title="안전지수 도출">
        <template #icon>
          <AnalysisStep3 class="h-[180px] w-[180px]" :font-controlled="false" filled="false" />
        </template>
        <template #description>
          안전도를 분석하여 위험도 점수를 도출합니다.
          <br />
          <br />
          0-2점: 위험
          <br />
          3-6점: 주의
          <br />
          7-10점: 안전
        </template>
      </ProcessStep>
      <ChevronRightBlue
        class="mt-[126px] h-[41px] w-[25px]"
        :font-controlled="false"
        filled="false"
      />
      <!-- Step 4 -->
      <ProcessStep :step="4" title="최종 결과">
        <template #icon>
          <AnalysisStep4 class="h-[180px] w-[180px]" :font-controlled="false" filled="false" />
        </template>
        <template #description>AI가 종합하여 최종 결과를 자세히 내보냅니다.</template>
      </ProcessStep>
    </div>

    <!-- 유의사항 -->
    <div class="text-center">
      <div
        class="mx-auto inline-flex flex-col items-center rounded-[15px] bg-secondary px-[60px] py-[40px] text-center"
      >
        <img src="~/assets/image/alien.png" alt="셋방살이" class="h-auto w-[130px]" />
        <span class="mt-[30px] text-[24px] font-[600] text-primary">
          셋방살이는 (공공기관 이름)의 가이드를 바탕으로 근거를 수립했습니다.
        </span>
        <span class="mt-[15px] text-[20px] font-[500] text-gray-66">
          더 자세한 내용은 (공공기관 이름 또는 우리 노션)을 참고해주세요.
        </span>
        <p class="mt-[25px] text-[20px] font-[500] text-gray-66">
          AI가 분석한 내용은 실제와 다를 수 있으니 확인용도로만 이용 부탁드립니다.
          <br />
          AI 분석 결과로 인한 문제 발생 시 법적 책임은 본인에게 있음을 알려드립니다.
        </p>
      </div>
    </div>
  </div>
</template>
