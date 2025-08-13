<template>
  <div class="flex justify-center">
    <div class="w-[1200px] h-[734px] relative">
      <div class="absolute top-[248px] left-[66px] z-20 max-w-[600px]">
        <div class="mb-[30px]">
          <div class="justify-start">
            <span class="text-zinc-900 text-3xl font-semibold font-['Pretendard'] leading-10">
              사용 가능한 제휴 매장이 가까이 있습니다.
            </span>
            <div class="text-blue-500 text-3xl font-bold font-['Pretendard'] leading-10">
              지금 제휴처를 확인하고, 크레딧을 사용해보세요.
            </div>
          </div>
        </div>
        <BlueBtn text="우리 동네 제휴매장 확인하기" @click="gotoStore" />
      </div>
      <div class="absolute top-0 right-0 w-[487px] h-[734px] rounded-[30px] overflow-hidden">
        <img
          :src="creditImage"
          alt="크레딧 사용 페이지 이미지"
          class="w-full h-full object-cover"
        />
        <!-- 그라디언트 오버레이 -->
        <div
          class="absolute top-0 left-0 w-[384px] h-full bg-gradient-to-r from-white to-transparent z-10"
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
