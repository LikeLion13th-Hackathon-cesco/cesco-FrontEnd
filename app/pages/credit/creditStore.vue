<template>
  <div class="m-0 mt-[30px] flex flex-col items-start">
    <div class="flex justify-center gap-5">
      <div class="h-[60px] justify-start">
        <div class="justify-start">
          <div class="font-['Pretendard'] text-xl font-semibold text-zinc-900">
            사용 가능한 제휴 매장이 가까이 있습니다.
          </div>
          <div class="font-['Pretendard'] text-xl font-semibold text-blue-500">
            지금 제휴처를 확인하고, 크레딧을 사용해보세요.
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-[20px] flex h-[230px] w-[446px] flex-col items-center justify-center rounded-2xl bg-blue-50 px-[50px] py-[30px]"
    >
      <img src="~/assets/icon/creditIcon.png" class="h-[75px] w-[66px]" />
      <div class="justify-start text-center">
        <span class="font-['Pretendard'] text-xl font-semibold leading-10 text-zinc-900">
          현재 보유 크레딧 :
        </span>
        <span class="font-['Pretendard'] text-xl font-semibold leading-10 text-blue-500">
          1,500P
        </span>
      </div>
      <div
        class="relative my-[5px] h-11 w-80 rounded-[10px] border-[1.50px] border-zinc-300 bg-white"
      >
        <button
          class="absolute right-0 top-0 flex h-11 w-20 items-center justify-center rounded-br-[10px] rounded-tr-[10px] bg-blue-500 text-[#FEFEFE]"
          @click="openBarcodeModal"
        >
          생성
        </button>
        <div
          class="absolute left-[21px] top-0 justify-start font-['Pretendard'] text-base font-semibold leading-10 text-zinc-900"
        >
          1,000
        </div>
      </div>
    </div>
    <div class="h-[480px] overflow-y-auto overflow-x-hidden">
      <div v-for="(store, index) in dummy" :key="store.id">
        <StoreItem
          :store-name="store?.storeName"
          :store-img="store.image"
          :address="store.address"
        />
        <div v-if="index !== dummy.length - 1" class="my-[43px]">
          <div
            class="h-0 w-[446px] outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-400"
          />
        </div>
      </div>
    </div>
    <div
      v-if="showBarcodeModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40"
    >
      <BarcodeModal @close="closeBarcodeModal" />
    </div>
  </div>
</template>

<script setup>
import StoreItem from "./_components/StoreItem.vue";
import storeImage from "~/assets/image/storeImage.jpg";
import BarcodeModal from "./_modals/Barcode.vue";

const showBarcodeModal = ref(false);

const openBarcodeModal = () => {
  showBarcodeModal.value = true;
};

const closeBarcodeModal = () => {
  showBarcodeModal.value = false;
};

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
