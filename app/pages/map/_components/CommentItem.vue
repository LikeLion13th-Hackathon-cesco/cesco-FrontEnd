<template>
  <div
    class="w-[400px] h-[200px] flex flex-col p-[30px] box-border hover:bg-blue-50 rounded-[10px] cursor-pointer"
  >
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
