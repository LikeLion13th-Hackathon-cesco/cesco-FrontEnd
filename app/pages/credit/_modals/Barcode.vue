<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col items-center rounded-2xl bg-background px-[139px] py-[59px]">
      <div class="mb-[20px] whitespace-nowrap text-[28px] text-gray-66">
        <span class="font-[500] text-primary">해당 바코드를 저장</span>
        하여 제휴매장에서 사용하세요.
      </div>
      <img src="~/assets/image/barcode.png" alt="바코드" />
      <div class="mt-[40px] flex justify-center gap-[40px]">
        <button
          class="flex items-center justify-center rounded-[10px] bg-gray-b4 px-[80px] py-[30px] text-[30px] text-background"
          @click="$emit('close')"
        >
          취소
        </button>
        <button
          class="flex items-center justify-center rounded-[10px] bg-primary px-[70px] py-[30px] text-[30px] text-background"
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
