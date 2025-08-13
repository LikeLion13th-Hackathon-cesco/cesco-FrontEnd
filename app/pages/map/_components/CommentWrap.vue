<template>
  <div class="flex-col max-w-[400px]">
    <div class="justify-start">
      <span class="text-blue-500 text-2xl font-semibold font-['Pretendard']">송파대로 48길 29</span>
      <span class="text-zinc-900 text-2xl font-semibold font-['Pretendard']">의</span>
      <span class="text-blue-500 text-2xl font-semibold font-['Pretendard']" />
      <span class="text-zinc-900 text-2xl font-semibold font-['Pretendard']">리뷰 게시글</span>
    </div>
    <div class="flex gap-[254px] mt-[28px]">
      <div class="justify-start">
        <span class="text-zinc-900 text-2xl font-semibold font-['Pretendard']">총</span>
        <span class="text-blue-500 text-2xl font-semibold font-['Pretendard']">5</span>
        <span class="text-zinc-900 text-2xl font-semibold font-['Pretendard']">개</span>
      </div>
      <div
        class="w-20 h-8 bg-white rounded-[5px] border border-zinc-400 flex justify-center items-center gap-1"
      >
        <p
          class="justify-start text-zinc-400 text-sm font-semibold font-['Pretendard'] leading-normal"
        >
          최신순
        </p>
        <img :src="DropDownIcon" class="w-[19px] h-[19px]" />
      </div>
    </div>
    <div class="w-[400px] h-[650px] flex flex-col mt-[21px] overflow-y-auto overflow-x-hidden">
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
