<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col items-center justify-center leading-10">
      <div class="font-['Pretendard'] text-[28px] font-bold leading-10 text-[#2D8AE7]">
        신고해주신 정보는 다른 임차인들의 피해 예방을 위해 소중히 활용 됩니다.
      </div>
      <div class="font-['Pretendard'] text-[28px] font-bold leading-10 text-[#2D8AE7]">
        신고시 소중한 제보에 감사한 마음을 담아 크레딧을 드립니다.
      </div>
      <div class="mt-[50px] flex h-[643px] justify-center gap-[80px]">
        <Upload
          file-name="민형사 고소증 접수 1부"
          btn-name="민형사 고소증 PDF 파일 업로드"
          type="report"
        ></Upload>
        <Upload
          file-name="등기부등본 1부"
          btn-name="등기부등본 PDF 파일 업로드"
          type="pdf"
        ></Upload>
      </div>
      <div
        class="mt-[40px] justify-start font-['Pretendard'] text-2xl font-normal text-neutral-400"
      >
        ※ 상기 서류가 모두 구비되어야 신고 접수가 가능합니다.
      </div>
      <button
        :class="[
          'mb-[160px] mt-[35px] flex h-20 w-[762px] items-center justify-center rounded-[10px] text-3xl font-semibold leading-7',
          fileStore.canSubmit ? 'bg-blue-500 text-white' : 'bg-zinc-400 text-white',
        ]"
        :disabled="!fileStore.canSubmit"
        @click="handleReport"
      >
        신고하기
      </button>
    </div>
  </div>
</template>

<script setup>
import Upload from "./_components/Upload.vue";
import { useFileStore } from "~/stores/file.ts";
const fileStore = useFileStore();

const handleReport = () => {
  if (fileStore.canSubmit) {
    alert("신고 접수 완료!");
    fileStore.clearAll();
  } else {
    alert("등기부등본과 고소증 파일 모두 업로드해주세요.");
  }
};
</script>
