<template>
  <div class="flex flex-col items-center justify-center rounded-[16px] bg-secondary p-[40px]">
    <UploadIcon class="h-[60px] w-[60px]" filled="false" :font-controlled="false" />
    <button
      class="mt-[20px] rounded-[10px] bg-primary px-[30px] py-[8px] text-center text-[18px] font-[600] text-gray-fe"
    >
      등기부등본 PDF 파일 업로드
    </button>
    <p class="mt-[40px] text-center text-[20px] font-[400] leading-[30px] text-gray-8f">
      - 업로드 유의사항 -
      <br />
      <br />
      파일 형식 : PDF 지원 (1개)
      <br />
      파일 크기 : 50MB 이내
    </p>
  </div>
</template>

<script setup>
import UploadIcon from "~/assets/icon/upload.svg";
</script>
