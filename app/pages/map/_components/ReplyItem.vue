<template>
  <div class="box-bordercursor-pointer flex h-[200px] w-[620px] flex-col p-[30px]">
    <div
      class="mb-[5px] justify-start font-['Pretendard'] text-lg font-semibold leading-tight text-zinc-900"
    >
      {{ writer }}
    </div>
    <div
      class="mb-[15px] justify-start font-['Pretendard'] text-base font-normal leading-tight text-neutral-400"
    >
      {{ date }}
    </div>
    <div
      class="mb-[10px] justify-start font-['Pretendard'] text-base font-normal leading-normal text-zinc-900"
    >
      {{ comment }}
    </div>
    <div class="flex justify-start gap-[10px]">
      <img :src="CommentIcon" class="h-4 w-4" />
      <div
        class="justify-start font-['Pretendard'] text-base font-normal leading-none text-zinc-400"
      >
        {{ commentCount }}
      </div>
    </div>
    <div class="hidden h-48 w-96 rounded-[10px] bg-blue-50" />
    <div class="flex items-center gap-[22px]">
      <input
        v-model="inputValue"
        type="text"
        class="h-16 w-[549px] rounded-2xl bg-neutral-100 px-4"
        placeholder="댓글을 입력하세요."
      />
      <img :src="SendingBtn" alt="보내기" />
    </div>
  </div>
</template>

<script setup>
import CommentIcon from "~/assets/icon/commentIcon.svg";
import SendingBtn from "~/assets/icon/community-uploadBtn.svg";
defineProps({
  writer: {
    type: String,
    default: "작성자",
  },
  date: {
    type: String,
    default: "2025-08-06",
  },
  comment: {
    type: String,
    default: "이 집 왜이래요",
  },
  commentCount: {
    type: Number,
    default: 4,
  },
});
</script>
