<template>
  <div class="max-w-[400px] flex-col">
    <div class="justify-start">
      <span class="font-['Pretendard'] text-2xl font-semibold text-blue-500">송파대로 48길 29</span>
      <span class="font-['Pretendard'] text-2xl font-semibold text-zinc-900">의</span>
      <span class="font-['Pretendard'] text-2xl font-semibold text-blue-500" />
      <span class="font-['Pretendard'] text-2xl font-semibold text-zinc-900">리뷰 게시글</span>
    </div>
    <div class="mt-[28px] flex gap-[254px]">
      <div class="justify-start">
        <span class="font-['Pretendard'] text-2xl font-semibold text-zinc-900">총</span>
        <span class="font-['Pretendard'] text-2xl font-semibold text-blue-500">5</span>
        <span class="font-['Pretendard'] text-2xl font-semibold text-zinc-900">개</span>
      </div>
      <div
        class="flex h-8 w-20 items-center justify-center gap-1 rounded-[5px] border border-zinc-400 bg-white"
      >
        <p
          class="justify-start font-['Pretendard'] text-sm font-semibold leading-normal text-zinc-400"
        >
          최신순
        </p>
        <img :src="DropDownIcon" class="h-[19px] w-[19px]" />
      </div>
    </div>
    <div class="mt-[21px] flex h-[650px] w-[400px] flex-col overflow-y-auto overflow-x-hidden">
      <div v-for="comment in dummy" :key="comment.id">
        <CommentItem
          :writer="comment?.writer"
          :date="comment?.date"
          :comment="comment.comment"
          :comment-count="comment.commentCount"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import DropDownIcon from "~/assets/icon/dropDownIcon.svg";
import CommentItem from "./CommentItem.vue";
const dummy = [
  {
    id: 0,
    writer: "작성자",
    date: "2025-06-13",
    comment: "102동 302호 층간소음 너무 심해서 계약기간 만기날만 기다리고 있음...",
    commentCount: 4,
    replies: [
      {
        id: 0,
        writer: "답글작성자1",
        date: "2025-06-13",
        content: "도대체 얼마나 심하길래 그러시나요?",
        parentId: null, // 원댓글
      },
      {
        id: 1,
        writer: "작성자",
        date: "2025-06-13",
        content: "밤잠을 도저히 못자겠어요 다들 왜이리 눈이 퀭해졌냐고 물어보네요",
        parentId: 0,
      },
      {
        id: 2,
        writer: "답글작성자3",
        date: "2025-06-12",
        content: "헉... 그정도면 집주인이나 경찰에 얘기 해봐야 하는거 아닌가요 ??",
        parentId: 0,
      },
    ],
  },
  {
    id: 1,
    writer: "작성자",
    date: "2025-06-13",
    comment: "102동 302호 층간소음 너무 심해서 계약기간 만기날만 기다리고 있음...",
    commentCount: 4,
  },
  {
    id: 2,
    writer: "작성자",
    date: "2025-06-13",
    comment: "102동 302호 층간소음 너무 심해서 계약기간 만기날만 기다리고 있음...",
    commentCount: 4,
  },
  {
    id: 3,
    writer: "작성자",
    date: "2025-06-13",
    comment: "102동 302호 층간소음 너무 심해서 계약기간 만기날만 기다리고 있음...",
    commentCount: 4,
  },
  {
    id: 4,
    writer: "작성자",
    date: "2025-06-13",
    comment: "102동 302호 층간소음 너무 심해서 계약기간 만기날만 기다리고 있음...",
    commentCount: 4,
  },
];
</script>
