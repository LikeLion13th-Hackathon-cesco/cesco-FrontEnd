<template>
  <div class="flex justify-center">
    <div class="w-[1200px] h-[734px] relative">
      <div class="absolute top-[58px] left-[60px] z-10">
        <div class="mb-[20px]">
          <span class="text-blue-500 text-3xl font-bold font-['Pretendard'] leading-10">
            한 달간 무제한으로<br />
          </span>
          <span class="text-zinc-900 text-3xl font-semibold font-['Pretendard'] leading-10">
            매물의 안전지수를 확인해보세요.
          </span>
        </div>
        <BlueBtn />
        <div
          class="justify-start text-zinc-900 text-3xl font-semibold font-['Pretendard'] leading-10 mt-[52px] mb-[35px]"
        >
          서비스 혜택
        </div>
        <div class="flex flex-col gap-[35px] items-start">
          <div class="flex gap-10 items-center">
            <img
              src="~/assets/icon/service-Icon.svg"
              alt="서비스혜택 아이콘"
              class="w-[70px] h-[70px] object-cover"
            />
            <div class="text-center justify-start">
              <span class="text-zinc-900 text-2xl font-normal font-['Pretendard'] leading-10"
                >무제한 </span
              ><span class="text-blue-500 text-2xl font-semibold font-['Pretendard'] leading-10"
                >전월세 안전지수</span
              ><span class="text-zinc-900 text-2xl font-normal font-['Pretendard'] leading-10">
                분석</span
              >
            </div>
          </div>
          <div class="flex gap-10 items-center">
            <img
              src="~/assets/icon/service-handIcon.svg"
              alt="서비스혜택 아이콘"
              class="w-[70px] h-[70px] object-cover"
            />
            <div class="text-center justify-start">
              <span class="text-zinc-900 text-2xl font-normal font-['Pretendard'] leading-10"
                >무제한 </span
              ><span class="text-blue-500 text-2xl font-semibold font-['Pretendard'] leading-10"
                >보증보험 가입 여부</span
              ><span class="text-zinc-900 text-2xl font-normal font-['Pretendard'] leading-10">
                분석</span
              >
            </div>
          </div>
          <div class="flex gap-10 items-center">
            <img
              src="~/assets/icon/service-checkIcon.svg"
              alt="서비스혜택 아이콘"
              class="w-[70px] h-[70px] object-cover"
            />
            <div class="justify-start">
              <span class="text-zinc-900 text-2xl font-normal font-['Pretendard'] leading-10"
                >전월세 사기 이력이 있는 임대인 정보를 <br />고려하여 </span
              ><span class="text-blue-500 text-2xl font-semibold font-['Pretendard'] leading-10"
                >더 정확한 전월세 안전지수</span
              ><span class="text-zinc-900 text-2xl font-normal font-['Pretendard'] leading-10">
                제공</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="absolute top-0 right-0 w-[487px] h-[734px] rounded-[30px] overflow-hidden">
        <img :src="pricingImage" alt="가격페이지 이미지" class="w-full h-full object-cover" />

        <!-- 그라디언트 오버레이 -->
        <div
          class="absolute top-0 left-0 w-[384px] h-full bg-gradient-to-r from-white to-transparent z-10"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import pricingImage from "~/assets/image/pricingImage.jpg";
</script>
