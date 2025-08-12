<template>
  <div class="w-[620px] h-[200px] flex flex-col p-[30px] box-bordercursor-pointer">
    <div
      class="justify-start text-zinc-900 text-lg font-semibold font-['Pretendard'] leading-tight mb-[5px]"
    >
      {{ writer }}
    </div>
    <div
      class="justify-start text-neutral-400 text-base font-normal font-['Pretendard'] leading-tight mb-[15px]"
    >
      {{ date }}
    </div>
    <div
      class="justify-start text-zinc-900 text-base font-normal font-['Pretendard'] leading-normal mb-[10px]"
    >
      {{ comment }}
    </div>
    <div class="flex justify-start gap-[10px]">
      <img :src="CommentIcon" class="w-4 h-4" />
      <div
        class="justify-start text-zinc-400 text-base font-normal font-['Pretendard'] leading-none"
      >
        {{ commentCount }}
      </div>
    </div>
    <div class="w-96 h-48 bg-blue-50 rounded-[10px] hidden" />
    <div class="flex gap-[22px] items-center">
      <input
        v-model="inputValue"
        type="text"
        class="w-[549px] h-16 bg-neutral-100 rounded-2xl px-4"
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
  writer: String,
  date: String,
  comment: String,
  commentCount: Number,
});
</script>
