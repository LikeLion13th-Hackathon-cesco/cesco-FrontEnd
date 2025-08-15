<template>
  <div class="flex justify-center">
    <div class="relative h-[734px] w-[1200px]">
      <div class="absolute left-[60px] top-[58px] z-10">
        <div class="mb-[20px]">
          <span class="font-['Pretendard'] text-3xl font-bold leading-10 text-blue-500">
            한 달간 무제한으로
            <br />
          </span>
          <span class="font-['Pretendard'] text-3xl font-semibold leading-10 text-zinc-900">
            매물의 안전지수를 확인해보세요.
          </span>
        </div>
        <BlueBtn />
        <div
          class="mb-[35px] mt-[52px] justify-start font-['Pretendard'] text-3xl font-semibold leading-10 text-zinc-900"
        >
          서비스 혜택
        </div>
        <div class="flex flex-col items-start gap-[35px]">
          <div class="flex items-center gap-10">
            <img
              src="~/assets/icon/service-Icon.svg"
              alt="서비스혜택 아이콘"
              class="h-[70px] w-[70px] object-cover"
            />
            <div class="justify-start text-center">
              <span class="font-['Pretendard'] text-2xl font-normal leading-10 text-zinc-900">
                무제한
              </span>
              <span class="font-['Pretendard'] text-2xl font-semibold leading-10 text-blue-500">
                전월세 안전지수
              </span>
              <span class="font-['Pretendard'] text-2xl font-normal leading-10 text-zinc-900">
                분석
              </span>
            </div>
          </div>
          <div class="flex items-center gap-10">
            <img
              src="~/assets/icon/service-handIcon.svg"
              alt="서비스혜택 아이콘"
              class="h-[70px] w-[70px] object-cover"
            />
            <div class="justify-start text-center">
              <span class="font-['Pretendard'] text-2xl font-normal leading-10 text-zinc-900">
                무제한
              </span>
              <span class="font-['Pretendard'] text-2xl font-semibold leading-10 text-blue-500">
                보증보험 가입 여부
              </span>
              <span class="font-['Pretendard'] text-2xl font-normal leading-10 text-zinc-900">
                분석
              </span>
            </div>
          </div>
          <div class="flex items-center gap-10">
            <img
              src="~/assets/icon/service-checkIcon.svg"
              alt="서비스혜택 아이콘"
              class="h-[70px] w-[70px] object-cover"
            />
            <div class="justify-start">
              <span class="font-['Pretendard'] text-2xl font-normal leading-10 text-zinc-900">
                전월세 사기 이력이 있는 임대인 정보를
                <br />
                고려하여
              </span>
              <span class="font-['Pretendard'] text-2xl font-semibold leading-10 text-blue-500">
                더 정확한 전월세 안전지수
              </span>
              <span class="font-['Pretendard'] text-2xl font-normal leading-10 text-zinc-900">
                제공
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute right-0 top-0 h-[734px] w-[487px] overflow-hidden rounded-[30px]">
        <img :src="pricingImage" alt="가격페이지 이미지" class="h-full w-full object-cover" />

        <!-- 그라디언트 오버레이 -->
        <div
          class="absolute left-0 top-0 z-10 h-full w-[384px] bg-gradient-to-r from-white to-transparent"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import pricingImage from "~/assets/image/pricingImage.jpg";
</script>
