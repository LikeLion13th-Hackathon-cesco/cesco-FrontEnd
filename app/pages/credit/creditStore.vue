<template>
  <div class="m-0 mt-[30px] flex flex-col items-start">
    <div class="flex justify-center gap-5">
      <div class="h-[60px] justify-start">
        <div class="justify-start">
          <div class="font-['Pretendard'] text-[20px] font-[600] text-gray-1a">
            사용 가능한 제휴 매장이 가까이 있습니다.
          </div>
          <div class="font-['Pretendard'] text-[20px] font-[700] text-primary">
            지금 제휴처를 확인하고, 크레딧을 사용해보세요.
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-[20px] flex flex-col items-center justify-center rounded-2xl bg-secondary px-[50px] py-[30px]"
    >
      <img src="~/assets/icon/creditIcon.png" class="h-[75px] w-[66px]" />
      <div class="justify-start text-center">
        <span class="font-['Pretendard'] text-[20px] font-[600] text-gray-1a">
          현재 보유 크레딧 :
        </span>
        <span class="font-['Pretendard'] text-[20px] font-[600] text-primary">
          {{ currentCredit.toLocaleString() }}
        </span>
      </div>
      <div
        class="relative my-[5px] h-11 w-80 rounded-[10px] border-[1.50px] border-gray-b4 bg-background"
      >
        <button
          class="absolute right-0 top-0 flex h-11 w-20 items-center justify-center rounded-br-[10px] rounded-tr-[10px] bg-primary text-background"
          @click="openBarcodeModal"
        >
          생성
        </button>
        <input
          v-model="usingCredit"
          class="absolute left-[21px] top-0 items-center justify-start font-['Pretendard'] text-base font-[600] text-gray-1a outline-none"
          placeholder="사용할 크레딧 입력"
        />
      </div>
    </div>
    <div class="h-[450px] overflow-y-auto overflow-x-hidden">
      <div v-for="(store, index) in dummy" :key="store.id">
        <StoreItem
          :store-name="store?.storeName"
          :store-img="store.image"
          :address="store.address"
        />
        <div v-if="index !== dummy.length - 1" class="my-[43px]">
          <div
            class="h-0 w-[446px] outline outline-[1.50px] outline-offset-[-0.75px] outline-gray-d9"
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

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import StoreItem from "./_components/StoreItem.vue";
import storeImage from "~/assets/image/storeImage.jpg";
import BarcodeModal from "./_modals/Barcode.vue";
import VictoryImg from "~/assets/image/victorySuper.jpg";
import FlowerImg from "~/assets/image/flowerGimbap.jpg";
import Amisan from "~/assets/image/amisan.jpg";
import { apiInstance } from "~/utils/api";
import type { CreditResponse } from "./_api/types/CreditResponse";

const showBarcodeModal = ref(false);
const usingCredit = ref<number | null>(null);
const currentCredit = ref(0); // This will hold the current credit amount for frontend calculations

const CREDIT_STORAGE_KEY = "user_credit_1"; // Key for localStorage

// Function to get credit from localStorage
const getCreditFromStorage = (): number | null => {
  if (import.meta.client) {
    const stored = localStorage.getItem(CREDIT_STORAGE_KEY);
    return stored ? parseInt(stored, 10) : null;
  }
  return null;
};

// Function to save credit to localStorage
const saveCreditToStorage = (credit: number) => {
  if (import.meta.client) {
    localStorage.setItem(CREDIT_STORAGE_KEY, credit.toString());
  }
};

// Initialize credit from localStorage if available
onMounted(() => {
  const storedCredit = getCreditFromStorage();
  if (storedCredit !== null) {
    currentCredit.value = storedCredit;
  }
});

// Fetch credit data from API only once
const { data: creditData } = useQuery<BaseResponse<CreditResponse>>({
  queryKey: ["hasCredit", 1],
  queryFn: () => apiInstance.get("v1/hascredit/1").then((res) => res.data),
});

// Watch for API data and initialize currentCredit if not already set from localStorage
watch(
  creditData,
  (newData) => {
    if (newData?.data.credit && currentCredit.value === 0) {
      const storedCredit = getCreditFromStorage();
      // Only use API data if localStorage is empty
      if (storedCredit === null) {
        currentCredit.value = newData.data.credit;
        saveCreditToStorage(newData.data.credit);
      }
    }
  },
  { immediate: true }
);

const handleCredit = () => {
  if (usingCredit.value) {
    if (usingCredit.value <= currentCredit.value) {
      // Subtract credit on frontend
      currentCredit.value = currentCredit.value - usingCredit.value;
      // Persist to localStorage
      saveCreditToStorage(currentCredit.value);
    } else {
      alert("사용 금액이 현재 크레딧을 초과할 수 없습니다.");
      showBarcodeModal.value = false;
    }
  }
};

const openBarcodeModal = () => {
  showBarcodeModal.value = true;
  handleCredit();
};

const closeBarcodeModal = () => {
  showBarcodeModal.value = false;
};

const dummy = ref([
  {
    id: 0,
    storeName: "영광수퍼",
    address: "서울 서대문구 연희로 204",
    image: VictoryImg,
  },
  {
    id: 1,
    storeName: "봄꽃김밥",
    address: "서울 서대문구 연희로36길 10",
    image: FlowerImg,
  },
  {
    id: 2,
    storeName: "아미산",
    address: "서울 서대문구 연희로32길 151",
    image: Amisan,
  },
  {
    id: 3,
    storeName: "중앙톤 스토어4",
    address: "서울 서초구 양재로 232",
    image: storeImage,
  },
]);
</script>
