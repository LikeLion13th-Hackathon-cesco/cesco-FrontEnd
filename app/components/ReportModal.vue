<template>
  <div class="flex flex-col items-center justify-center rounded-2xl bg-white px-[120px] py-[60px]">
    <InformIcon class="h-[82px] w-[82px]" filled="false mb-[30px]"></InformIcon>
    <div class="mb-[15px] justify-start font-['Pretendard'] text-3xl font-semibold text-zinc-900">
      등기부등본 예시 세 가지 중 하나를 선택하여 분석하세요.
    </div>
    <div
      class="justify-start text-center font-['Pretendard'] text-2xl font-normal leading-7 text-neutral-400"
    >
      심사 편의를 위해 등기부등본 예시를 세 가지 준비했습니다.
      <br />
      이 중 하나를 선택해 주시면 감사하겠습니다.
    </div>

    <div class="mb-[40px] mt-[40px] flex items-start justify-center gap-[30px]">
      <img
        class="h-56 w-56 rounded-[10px] hover:border-[5px] hover:border-blue-500"
        src="https://placehold.co/220x228"
      />
      <img class="h-56 w-56 rounded-[10px]" src="https://placehold.co/220x228" />
      <img class="h-56 w-56 rounded-[10px]" src="https://placehold.co/220x228" />
    </div>

    <div>
      <input id="fileUpload" type="file" class="hidden" @change="handleFileChange" />
      <label
        for="fileUpload"
        class="box-border flex h-20 w-[732px] cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-zinc-400 bg-white font-['Pretendard'] text-3xl font-semibold leading-7 text-zinc-400"
      >
        내 파일 불러오기
      </label>
    </div>

    <div class="flex items-center justify-center gap-[30px]">
      <div
        class="box-border inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-zinc-400 px-36 py-7"
      >
        <div
          class="box-border justify-start text-center font-['Pretendard'] text-3xl font-semibold leading-7 text-white"
        >
          취소
        </div>
      </div>
      <div
        class="box-border inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-blue-500 px-36 py-7"
      >
        <div
          class="justify-start text-center font-['Pretendard'] text-3xl font-semibold leading-7 text-white"
        >
          제출
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InformIcon from "~/assets/icon/informIcon.svg";

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    console.log("업로드된 파일:", file.name);
  }
};
</script>
