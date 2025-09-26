<script setup>
import PriceBox from "./_components/PriceBox.vue";
import CheckIconBlue from "~/assets/icon/checkIconBlue.svg";
import CheckIconGrey from "~/assets/icon/checkIconGrey.svg";

const props = defineProps({
  isEmbedded: {
    type: Boolean,
    default: false,
  },
});

useHead({
  title: props.isEmbedded ? undefined : "가격",
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-[40px]">
    <div class="flex flex-col items-center">
      <div class="justify-start text-center">
        <span class="font-['Pretendard'] text-[32px] font-[600] text-primary">
          한 달간 무제한으로
        </span>
        <span class="font-['Pretendard'] text-[32px] font-[600] text-gray-1a">
          매물의 안전지수를 확인해보세요.
        </span>
      </div>
      <div
        class="justify-start text-center font-['Pretendard'] text-[20px] font-[400] text-gray-8f"
      >
        PLUS 서비스 구독을 통해 더 다양한 셋방살이의 혜택을 이용하실 수 있습니다.
      </div>
    </div>
    <div class="flex gap-[40px]">
      <PriceBox option="PLUS" text-color="primary" card-class="flex-1 outline-primary bg-secondary">
        <template #price>
          <div class="text-[24px] font-[400]">
            월
            <span class="text-[36px] font-[600] text-gray-1a">8,900</span>
            원
          </div>
        </template>
        <template #button>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] bg-primary px-10 py-[10px] text-[20px] font-[600] text-background"
          >
            현재 PLUS 서비스 이용중
            <!--{{ isPlusUser ? '현재 PLUS 서비스 이용중' : 'PLUS 서비스 이용하기' }}-->
          </button>
        </template>
        <template #features>
          <div class="flex items-center gap-[20px]">
            <CheckIconBlue
              class="h-[21px] w-[16px]"
              filled="false"
              :font-controlled="false"
            ></CheckIconBlue>
            <div>무제한 전월세 안전지수 분석</div>
          </div>
          <div class="flex items-center gap-[20px]">
            <CheckIconBlue
              class="h-[21px] w-[16px]"
              filled="false"
              :font-controlled="false"
            ></CheckIconBlue>
            <div>무제한 보증보험 가입 여부 정보 제공</div>
          </div>
          <div class="flex items-center gap-[20px]">
            <CheckIconBlue
              class="h-[21px] w-[16px]"
              filled="false"
              :font-controlled="false"
            ></CheckIconBlue>
            <div>
              전월세 사기 이력이 있는 임대인 정보를
              <br />
              고려하여
              <span class="font-[400] text-primary">더 정확한 전월세 안전지수 제공</span>
            </div>
          </div>
        </template>
      </PriceBox>

      <PriceBox
        option="Free"
        text-color="gray-1a"
        card-class="flex-1 outline-gray-d9 bg-background"
      >
        <template #price>
          <div class="text-[36px] font-[600] text-gray-1a">
            0
            <span class="text-[20px] font-[400] text-gray-1a">원</span>
          </div>
        </template>
        <template #button>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] bg-gray-b4 px-10 py-[10px] text-[20px] font-[600] text-background"
          >
            서비스 구독 취소하기
            <!--{{ isPlusUser ? '서비스 구독 취소하기' : '현재 사용 서비스' }}-->
          </button>
        </template>
        <template #features>
          <div class="flex items-center gap-[20px]">
            <CheckIconGrey
              class="h-[21px] w-[16px]"
              filled="false"
              :font-controlled="false"
            ></CheckIconGrey>
            <div>전월세 안전지수 분석 (3회)</div>
          </div>
          <div class="flex items-center gap-[20px]">
            <CheckIconGrey
              class="h-[21px] w-[16px]"
              filled="false"
              :font-controlled="false"
            ></CheckIconGrey>
            <div>보증보험 가입 여부 정보 제공 (3회)</div>
          </div>
          <div class="flex items-center gap-[20px]">
            <CheckIconGrey
              class="h-[21px] w-[16px]"
              filled="false"
              :font-controlled="false"
            ></CheckIconGrey>
            <div>기본 전월세 안전지수 제공</div>
          </div>
        </template>
      </PriceBox>
    </div>
  </div>
</template>
