<script setup lang="ts">
import AnalysisPreviewCard from "./_components/AnalysisPreviewCard.vue";
import MyCredit from "./_components/MyCredit.vue";
import PostAchievementCard from "./_components/PostAchievementCard.vue";
</script>

<template>
  <main>
    <div class="flex flex-col gap-[40px] px-[200px]">
      <h1 class="mt-[100px] text-[36px] font-[600] text-foreground">저장된 등기부등본 분석 결과</h1>
      <div class="flex flex-col gap-[40px]">
        <AnalysisPreviewCard
          address="양재동 뭐시기 뭐시기"
          :safety-score="7"
          safety-description="큰 법적 위험 없이 비교적 안전한 집이지만, 근저당이 있는 만큼 주의는 필요한 수준이에요.
        보증보험 가입 가능성도 높은 편이라 전월세 계약을 고려해볼 만한 조건이라고 볼 수..."
        />
        <AnalysisPreviewCard
          address="양재동 뭐시기 뭐시기"
          :safety-score="5"
          safety-description="큰 법적 위험 없이 비교적 안전한 집이지만, 근저당이 있는 만큼 주의는 필요한 수준이에요.
        보증보험 가입 가능성도 높은 편이라 전월세 계약을 고려해볼 만한 조건이라고 볼 수..."
        />
        <AnalysisPreviewCard
          address="양재동 뭐시기 뭐시기"
          :safety-score="2"
          safety-description="큰 법적 위험 없이 비교적 안전한 집이지만, 근저당이 있는 만큼 주의는 필요한 수준이에요.
        보증보험 가입 가능성도 높은 편이라 전월세 계약을 고려해볼 만한 조건이라고 볼 수..."
        />
      </div>
      <MyCredit :credit="1500" />
      <h1 class="text-[36px] font-[600] text-foreground">
        현재 내가 작성한 게시글 수
        <span class="font-[700] text-primary">5개</span>
      </h1>
      <div class="mb-[100px] flex flex-col gap-[30px]">
        <PostAchievementCard :completed="true" achievement="게시글 3개" :credit="500" />
        <PostAchievementCard :completed="false" achievement="게시글 10개" :credit="700" />
        <PostAchievementCard :completed="false" achievement="게시글 30개" :credit="1000" />
      </div>
    </div>
  </main>
</template>
