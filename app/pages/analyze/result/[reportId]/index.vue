<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import ProcessAndDisclaimer from "./_components/ProcessAndDisclaimer.vue";
import { apiInstance } from "~/utils/api";
import type { AnalyzeResultResponse } from "./_api/types/AnalyzeResultResponse";
import { useHead } from "#app";

useHead({
  title: "분석 결과",
});

const reportId = useRoute().params.reportId;

const { data } = useQuery<BaseResponse<AnalyzeResultResponse>>({
  queryKey: ["analyze-result", reportId],
  queryFn: () => apiInstance.get(`/user/${reportId}/analysis-reports`).then((res) => res.data),
});
</script>

<template>
  <main>
    <div class="flex flex-col gap-[25px]">
      <h1 class="mt-[40px] text-center text-[28px] font-[700] text-primary">
        등기부등본 분석 결과
      </h1>
      <div class="mx-auto">
        <SafetyTypeChip :score="data?.data.safetyScore || null" />
      </div>
    </div>
    <!-- 분석 결과 -->
    <div class="flex gap-[80px] px-[150px] pt-[50px]">
      <!-- PDF -->
      <embed
        :src="data?.data.analysisReportUrl"
        type="application/pdf"
        class="min-w-[475px] max-w-[475px] overflow-hidden rounded-[15px]"
      />
      <div class="flex flex-col gap-[30px] overflow-y-auto">
        <!-- 한 줄 평가 -->
        <section class="block space-y-[8px]">
          <header class="flex items-center gap-[8px]">
            <h2 class="text-[24px] font-[500] text-foreground">
              안전지수
              <span class="font-[600] text-primary">{{ data?.data.safetyScore }} 점</span>
              <span class="text-[16px] font-[500]">{{ " " }}/ 10점</span>
            </h2>
            <div>
              <StarRatings :rating="data?.data.safetyScore! / 2" :size="26" />
            </div>
          </header>
          <p class="text-[20px] font-[500] text-foreground">
            {{ data?.data.summary }}
          </p>
        </section>

        <!-- 지수 선정 이유 -->
        <section class="block space-y-[8px]">
          <header class="space-y-[4px]">
            <h2 class="text-[20px] font-[600] text-primary">지수 선정 이유</h2>
            <div class="h-[1px] w-full rounded-full bg-primary"></div>
          </header>
          <p class="text-[18px] font-[400] text-foreground">
            {{ data?.data.safetyDescription }}
          </p>
        </section>

        <!-- 보증보험 가입 여부 -->
        <section class="block space-y-[8px]">
          <header class="space-y-[4px]">
            <h2 class="text-[20px] font-[600] text-primary">보증보험 가입 여부</h2>
            <div class="h-[1px] w-full rounded-full bg-primary"></div>
          </header>
          <p class="text-[18px] font-[400] text-foreground">
            {{ data?.data.insuranceDescription }}
          </p>
        </section>
      </div>
    </div>

    <!-- 분석 절차 -->
    <ProcessAndDisclaimer />
  </main>
</template>
