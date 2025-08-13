<template>
  <div class="flex flex-col items-start pl-[190px] m-0">
    <div class="flex justify-center gap-5">
      <img src="~/assets/icon/creditPin.svg" alt="pin" />
      <div class="w-96 h-12 justify-start">
        <span class="text-zinc-900 text-4xl font-semibold font-['Pretendard'] leading-[50.31px]">
          우리동네
        </span>
        <span class="text-blue-500 text-4xl font-semibold font-['Pretendard'] leading-[50.31px]">
          성북구
        </span>
        <span class="text-zinc-900 text-4xl font-semibold font-['Pretendard'] leading-[50.31px]">
          제휴매장
        </span>
      </div>
    </div>
    <div
      class="w-[489px] h-12 justify-start text-neutral-400 text-2xl font-normal font-['Pretendard'] leading-[50.31px]"
    >
      성북구 내의 크레딧 사용 가능처를 알려드립니다.
    </div>
    <div class="mt-[54px] mb-[200px]">
      <div v-for="(store, index) in dummy" :key="store.id">
        <StoreItem
          :store-name="store?.storeName"
          :store-img="store.image"
          :address="store.address"
        />
        <div v-if="index !== dummy.length - 1" class="my-[43px]">
          <div
            class="w-[980px] h-0 outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-400"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StoreItem from "./_components/StoreItem.vue";
import { ref } from "vue";
import storeImage from "~/assets/image/storeImage.jpg";
const dummy = ref([
  {
    id: 0,
    storeName: "중앙톤 스토어1",
    address: "서울 서초구 양재로 232",
    image: storeImage,
  },
  {
    id: 1,
    storeName: "중앙톤 스토어2",
    address: "서울 서초구 양재로 232",
    image: storeImage,
  },
  {
    id: 2,
    storeName: "중앙톤 스토어3",
    address: "서울 서초구 양재로 232",
    image: storeImage,
  },
  {
    id: 3,
    storeName: "중앙톤 스토어4",
    address: "서울 서초구 양재로 232",
    image: storeImage,
  },
]);
</script>
