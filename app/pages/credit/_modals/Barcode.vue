<template>
  <div class="flex items-center justify-center">
    <div
      class="flex h-[556px] w-[820px] flex-col items-center rounded-2xl bg-white px-[139px] py-[59px]"
    >
      <div class="mb-[20px] whitespace-nowrap text-[28px] text-stone-500">
        <span class="text-blue-500">해당 바코드를 저장</span>
        하여 제휴매장에서 사용하세요.
      </div>
      <img src="~/assets/image/barcode.png" alt="바코드" />
      <div class="mt-[40px] flex justify-center gap-[40px]">
        <button
          class="flex items-center justify-center rounded-[10px] bg-[#B4B4B4] px-[70px] py-[30px] text-3xl text-white"
          @click="$emit('close')"
        >
          취소
        </button>
        <button
          class="flex items-center justify-center rounded-[10px] bg-blue-500 px-[70px] py-[30px] text-3xl text-white"
          @click="saveBarcodeImage"
        >
          이미지로 저장
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import barcodeImage from "~/assets/image/barcode.png";
const emit = defineEmits(["close"]);
const saveBarcodeImage = () => {
  // 다운로드 링크 생성
  const link = document.createElement("a");
  link.href = barcodeImage;
  link.download = "[셋방살이] 크레딧 사용 바코드.png"; // 저장될 파일명

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  emit("close");
};
</script>
