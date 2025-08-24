<script setup lang="ts">
import ProcessAndDisclaimer from "./_components/ProcessAndDisclaimer.vue";

const RATING = ref(4.5);
</script>

<template>
  <main>
    <div class="flex flex-col gap-[25px]">
      <h1 class="mt-[40px] text-center text-[28px] font-[700] text-primary">
        등기부등본 분석 결과
      </h1>
      <div class="mx-auto rounded-full bg-primary px-[40px] py-[15px]">
        <h2 class="text-center text-[28px] font-[600] text-gray-fe">
          크게 걱정하지 않아도 되는 집
        </h2>
      </div>
    </div>
    <!-- 분석 결과 -->
    <div class="flex gap-[80px] px-[150px] pt-[50px]">
      <img
        src="~/assets/image/analysis-result-example.png"
        alt="분석 결과 예시"
        class="w-[475px]"
      />
      <div class="flex flex-col gap-[30px] overflow-y-auto">
        <!-- 한 줄 평가 -->
        <section class="block space-y-[8px]">
          <header class="flex items-center gap-[8px]">
            <h2 class="text-[24px] font-[500] text-foreground">
              안전지수
              <span class="font-[600] text-primary">7점</span>
              <span class="text-[16px] font-[500]">{{ " " }}/ 10점</span>
            </h2>
            <div>
              <StarRatings :rating="RATING" :size="26" />
            </div>
          </header>
          <p class="text-[20px] font-[500] text-foreground">
            큰 법적 위험 없이 비교적 안전한 집이지만, 근저당이 있는 만큼 주의는 필요한 수준이에요.
            보증보험 가입 가능성도 높은 편이라 전월세 계약을 고려해볼 만한 조건이라고 볼 수
            있습니다.
          </p>
        </section>

        <!-- 지수 선정 이유 -->
        <section class="block space-y-[8px]">
          <header class="space-y-[4px]">
            <h2 class="text-[20px] font-[600] text-primary">지수 선정 이유</h2>
            <div class="h-[1px] w-full rounded-full bg-primary"></div>
          </header>
          <p class="text-[18px] font-[400] text-foreground">
            등기부등본을 확인해본 결과, 가처분, 가압류, 가등기 등 권리관계에 중대한 영향을 줄 수
            있는 위험요소는 전혀 없었습니다. 다만 근저당권이 설정되어 있긴 하지만, 설정 금액과
            비교해보았을 때 이 집의 공시지가나 최근 실거래가 기준으로 볼 때 보증금을 회수하는데 있어
            큰 위험은 아니라고 판단되었어요. 이런 점들을 종합해봤을 때, 전체적으로 전세보증금에 대한
            회수 가능성은 양호한 편이며, 지나치게 우려할 수준은 아닙니다.
          </p>
        </section>

        <!-- 보증보험 가입 여부 -->
        <section class="block space-y-[8px]">
          <header class="space-y-[4px]">
            <h2 class="text-[20px] font-[600] text-primary">보증보험 가입 여부</h2>
            <div class="h-[1px] w-full rounded-full bg-primary"></div>
          </header>
          <p class="text-[18px] font-[400] text-foreground">
            등기부상 확인 결과 위험도가 낮고, 근저당권의 비중도 과하지 않기 때문에 보증보험 심사에서
            긍정적으로 평가될 수 있어요. 다만, 집주인의 세금 체납 여부, 주택 수, 임대사업자 등록
            여부 등에 따라 실제 가입 가능 여부는 달라질 수 있으니, 계약 전에는 꼭 보증보험 가입 가능
            여부를 한 번 더 확인해보는 것을 추천드려요.
          </p>
        </section>
      </div>
    </div>

    <!-- 분석 절차 -->
    <ProcessAndDisclaimer />
  </main>
</template>
