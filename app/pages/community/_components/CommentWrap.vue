<template>
  <div class="mt-[30px] flex-col">
    <div
      class="my-[30px] box-border flex h-[60px] cursor-pointer items-center justify-start rounded-[10px] border-[#B4B4B4] px-[15px] py-[25px] outline outline-[1.50px] outline-offset-[-1.50px] outline-zinc-400"
      @click="handlePostModal"
    >
      <div class="justify-start font-['Pretendard'] text-[20px] font-medium text-zinc-400">
        선택 지역의 리뷰 게시글을 작성해보세요.
      </div>
      <Stick class="ml-[50px] h-[60px]" filled="false" :font-controlled="false"></Stick>
      <Pencil class="ml-[20px] h-[22px] w-[22px]" filled="false" :font-controlled="false"></Pencil>
    </div>
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
      <div class="relative">
        <div
          class="flex h-8 w-20 items-center justify-center gap-1 rounded-[5px] border border-zinc-400 bg-white"
          @click="handleToggle"
        >
          <p
            class="cursor-pointer justify-start font-['Pretendard'] text-sm font-semibold leading-normal text-zinc-400"
          >
            {{ selectedOption }}
          </p>
          <DropDownIcon class="h-[19px] w-[19px]" filled="false" :font-controlled="false" />
        </div>
        <div
          v-if="ToggleOpen"
          class="absolute left-0 top-full z-10 mt-1 w-20 rounded-[5px] border bg-white shadow-lg"
        >
          <div
            v-for="option in options"
            :key="option"
            class="cursor-pointer px-3 py-2 text-sm font-semibold text-zinc-400 hover:bg-gray-50"
            @click="selectOption(option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-[21px] flex h-[526px] w-[400px] flex-col overflow-y-auto overflow-x-hidden">
      <div v-for="post in dummy" :key="post.id">
        <CommentItem
          :writer="post?.writer"
          :date="post?.date"
          :comment="post.comment"
          :comment-count="post.commentCount"
          :like-count="post.likeCount"
          @click="handlePostClick(post.id)"
        />
        <!-- 해당 게시물의 댓글들 (게시물이 열려있을 때만 표시) -->
        <div v-if="openedPostId === post.id && post.replies" class="mt-[10px] bg-gray-50 p-4">
          <div v-for="reply in post.replies" :key="reply.id" class="mb-[10px] last:mb-0">
            <!-- 댓글도 CommentItem 재사용 (좋아요/댓글수 숨김) -->
            <ReplyItem
              :writer="reply.writer"
              :date="reply.date"
              :comment="reply.content"
              class="border border-gray-200 bg-white shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="PostModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-zinc-900/40" @click="handlePostModal"></div>
      <div class="z-60 relative">
        <PostComment @close="handlePostModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DropDownIcon from "~/assets/icon/dropDownIcon.svg";
import CommentItem from "./CommentItem.vue";
import ReplyItem from "./ReplyItem.vue";
import PostComment from "../_modals/PostComment.vue";
import Stick from "~/assets/icon/stick.svg";
import Pencil from "~/assets/icon/pencil.svg";

const ToggleOpen = ref(false);
const PostModalOpen = ref(false);
const selectedOption = ref("최신순");
const options = ["최신순", "인기순"];
const openedPostId = ref(null);

const handlePostClick = (postId) => {
  openedPostId.value = openedPostId.value === postId ? null : postId;
};
const handleToggle = () => {
  ToggleOpen.value = !ToggleOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  ToggleOpen.value = false;
};
const handlePostModal = () => {
  PostModalOpen.value = !PostModalOpen.value;
};
const dummy = [
  {
    id: 0,
    writer: "작성자",
    date: "2025-06-13",
    comment: "102동 302호 층간소음 너무 심해서 계약기간 만기날만 기다리고 있음...",
    commentCount: 4,
    likeCount: 7,
    replies: [
      {
        id: 0,
        writer: "답글작성자1",
        date: "2025-06-13",
        content: "도대체 얼마나 심하길래 그러시나요?",
      },
      {
        id: 1,
        writer: "작성자",
        date: "2025-06-13",
        content: "밤잠을 도저히 못자겠어요 다들 왜이리 눈이 퀭해졌냐고 물어보네요",
      },
      {
        id: 2,
        writer: "답글작성자3",
        date: "2025-06-12",
        content: "헉... 그정도면 집주인이나 경찰에 얘기 해봐야 하는거 아닌가요 ??",
      },
    ],
  },
  {
    id: 1,
    writer: "작성자",
    date: "2025-06-13",
    comment: "102동 302호 층간소음 너무 심해서 계약기간 만기날만 기다리고 있음...",
    commentCount: 4,
    likeCount: 1,
    replies: [
      {
        id: 0,
        writer: "답글작성자1",
        date: "2025-06-13",
        content: "하루빨리 이사 가시길..^^",
      },
      {
        id: 1,
        writer: "작성자",
        date: "2025-06-13",
        content: "밤잠을 도저히 못자겠어요 다들 왜이리 눈이 퀭해졌냐고 물어보네요",
      },
    ],
  },
  {
    id: 2,
    writer: "작성자",
    date: "2025-06-13",
    comment: "102동 302호 층간소음 너무 심해서 계약기간 만기날만 기다리고 있음...",
    commentCount: 4,
    likeCount: 1,
  },
  {
    id: 3,
    writer: "작성자",
    date: "2025-06-13",
    comment: "102동 302호 층간소음 너무 심해서 계약기간 만기날만 기다리고 있음...",
    commentCount: 4,
    likeCount: 13,
  },
  {
    id: 4,
    writer: "작성자",
    date: "2025-06-13",
    comment: "102동 302호 층간소음 너무 심해서 계약기간 만기날만 기다리고 있음...",
    commentCount: 4,
    likeCount: 1,
  },
];
</script>
