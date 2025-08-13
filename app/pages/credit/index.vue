<template>
  <div class="flex justify-center">
    <div class="relative h-[734px] w-[1200px]">
      <div class="absolute left-[66px] top-[248px] z-20 max-w-[600px]">
        <div class="mb-[30px]">
          <div class="justify-start">
            <span class="font-['Pretendard'] text-3xl font-semibold leading-10 text-zinc-900">
              사용 가능한 제휴 매장이 가까이 있습니다.
            </span>
            <div class="font-['Pretendard'] text-3xl font-bold leading-10 text-blue-500">
              지금 제휴처를 확인하고, 크레딧을 사용해보세요.
            </div>
          </div>
        </div>
        <BlueBtn text="우리 동네 제휴매장 확인하기" @click="gotoStore" />
      </div>
      <div class="absolute right-0 top-0 h-[734px] w-[487px] overflow-hidden rounded-[30px]">
        <img
          :src="creditImage"
          alt="크레딧 사용 페이지 이미지"
          class="h-full w-full object-cover"
        />
        <!-- 그라디언트 오버레이 -->
        <div
          class="absolute left-0 top-0 z-10 h-full w-[384px] bg-gradient-to-r from-white to-transparent"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BlueBtn from "~/components/BlueBtn.vue";
import creditImage from "~/assets/image/pricingImage.jpg";

const gotoStore = () => {
  navigateTo("/credit/creditStore");
};
</script>
