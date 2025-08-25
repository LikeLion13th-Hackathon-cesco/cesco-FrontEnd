<script setup lang="ts">
import AnalysisPreviewCard from "./_components/AnalysisPreviewCard.vue";
import MyCredit from "./_components/MyCredit.vue";
import PostAchievementCard from "./_components/PostAchievementCard.vue";
import type { MyPageResponse } from "./_api/types/MyPageResponse";
import { useQuery } from "@tanstack/vue-query";
import { apiInstance } from "~/utils/api";
import { useHead } from "#app";

useHead({
  title: "마이 페이지",
});

const { data } = useQuery<BaseResponse<MyPageResponse>>({
  queryKey: ["mypage"],
  queryFn: () => apiInstance.get("/user/1/mypage").then((res) => res.data),
});

console.log(data);
</script>

<template>
  <main>
    <div class="flex flex-col gap-[40px] px-[200px]">
      <h1 class="mt-[100px] text-[36px] font-[600] text-foreground">저장된 등기부등본 분석 결과</h1>
      <div class="flex flex-col gap-[40px]">
        <AnalysisPreviewCard
          v-for="report in data?.data.reports"
          :key="report.reportId"
          :report-id="report.reportId"
          :address="report.address"
          :safety-score="report.safetyScore"
          :safety-description="report.summary"
        />
      </div>
      <MyCredit :credit="data?.data.credit ?? 0" />
      <h1 class="text-[36px] font-[600] text-foreground">
        현재 내가 작성한 게시글 수
        <span class="font-[700] text-primary">{{ data?.data.postCount ?? "-" }}개</span>
      </h1>
      <div class="mb-[100px] flex flex-col gap-[30px]">
        <PostAchievementCard
          :completed="(data?.data.postCount ?? 0) >= 1"
          achievement="게시글 1개"
          :credit="500"
        />
        <PostAchievementCard
          :completed="(data?.data.postCount ?? 0) >= 5"
          achievement="게시글 5개"
          :credit="700"
        />
        <PostAchievementCard
          :completed="(data?.data.postCount ?? 0) >= 15"
          achievement="게시글 15개"
          :credit="1000"
        />
      </div>
    </div>
  </main>
</template>
