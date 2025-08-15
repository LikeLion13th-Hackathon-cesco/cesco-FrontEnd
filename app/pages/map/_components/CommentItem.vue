<template>
  <div
    class="box-border flex h-[200px] w-[400px] cursor-pointer flex-col rounded-[10px] p-[30px] hover:bg-blue-50"
  >
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
  </div>
</template>

<script setup>
import CommentIcon from "~/assets/icon/commentIcon.svg";

// defineProps({
//   writer: String,
//   date: String,
//   comment: String,
//   commentCount: Number,
// });
</script>
