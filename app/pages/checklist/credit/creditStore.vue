<template>
  <div class="m-0 flex flex-col items-start pl-[190px]">
    <div class="flex justify-center gap-5">
      <img src="~/assets/icon/creditPin.svg" alt="pin" />
      <div class="h-12 w-96 justify-start">
        <span class="font-['Pretendard'] text-4xl font-semibold leading-[50.31px] text-zinc-900">
          우리동네
        </span>
        <span class="font-['Pretendard'] text-4xl font-semibold leading-[50.31px] text-blue-500">
          성북구
        </span>
        <span class="font-['Pretendard'] text-4xl font-semibold leading-[50.31px] text-zinc-900">
          제휴매장
        </span>
      </div>
    </div>
    <div
      class="h-12 w-[489px] justify-start font-['Pretendard'] text-2xl font-normal leading-[50.31px] text-neutral-400"
    >
      성북구 내의 크레딧 사용 가능처를 알려드립니다.
    </div>
    <div class="mb-[200px] mt-[54px]">
      <div v-for="(store, index) in dummy" :key="store.id">
        <StoreItem
          :store-name="store?.storeName"
          :store-img="store.image"
          :address="store.address"
        />
        <div v-if="index !== dummy.length - 1" class="my-[43px]">
          <div
            class="h-0 w-[980px] outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-400"
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
