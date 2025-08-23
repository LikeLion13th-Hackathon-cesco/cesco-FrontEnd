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

    <div class="justify-start text-2xl font-semibold text-zinc-900">
      <span class="font-['Pretendard'] text-2xl font-semibold text-blue-500">
        {{ selectedAddress || "지역을 선택해주세요" }}
      </span>
      의 리뷰 게시글
    </div>

    <div class="mt-[28px] flex gap-[254px]">
      <div class="justify-start text-2xl font-semibold text-zinc-900">
        <span class="font-['Pretendard'] text-2xl font-semibold text-zinc-900">총 {{ " " }}</span>
        <span class="font-['Pretendard'] text-2xl font-semibold text-blue-500">
          {{ posts?.length || 0 }}
        </span>
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

    <div v-if="isLoading" class="mt-[21px] flex h-[526px] w-[400px] items-center justify-center">
      <div class="text-zinc-400">게시글을 불러오는 중...</div>
    </div>

    <div v-else-if="error" class="mt-[21px] flex h-[526px] w-[400px] items-center justify-center">
      <div class="text-red-500">게시글을 불러오는데 실패했습니다.</div>
    </div>

    <div
      v-else-if="!posts || posts.length === 0"
      class="mt-[21px] flex h-[526px] w-[400px] items-center justify-center"
    >
      <div class="text-zinc-400">아직 작성된 게시글이 없습니다.</div>
    </div>

    <!-- 게시글 목록 -->
    <div
      v-else
      class="mt-[21px] flex h-[526px] w-[400px] flex-col overflow-y-auto overflow-x-hidden"
    >
      <div v-for="post in sortedPosts" :key="post.postId">
        <CommentItem
          :writer="post.userId.toString()"
          :date="post.createdAt"
          :comment="post.content"
          :comment-count="0"
          :like-count="post.likeCount"
          @click="handlePostClick(post.postId)"
        />
        <!-- 댓글 기능은 나중에 구현 -->

        <div v-if="openedPostId === post.postId && post.replies" class="mt-[10px] bg-gray-50 p-4">
          <div v-for="reply in post.replies" :key="reply.id" class="mb-[10px] last:mb-0">
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
        <PostComment
          :road-code="roadCode"
          :building-number="buildingNumber"
          :selected-address="selectedAddress"
          @close="handlePostModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import DropDownIcon from "~/assets/icon/dropDownIcon.svg";
import CommentItem from "./CommentItem.vue";
import ReplyItem from "./ReplyItem.vue";
import PostComment from "../_modals/PostComment.vue";
import Stick from "~/assets/icon/stick.svg";
import Pencil from "~/assets/icon/pencil.svg";

// Props 정의
const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [Error, String, null],
    default: null,
  },
  selectedAddress: {
    type: String,
    default: "",
  },
  roadCode: {
    type: String,
    default: "",
  },
  buildingNumber: {
    type: String,
    default: "",
  },
});

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

// 정렬된 게시글
const sortedPosts = computed(() => {
  if (!props.posts || props.posts.length === 0) return [];

  const sorted = [...props.posts];

  if (selectedOption.value === "최신순") {
    return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (selectedOption.value === "인기순") {
    return sorted.sort((a, b) => b.likeCount - a.likeCount);
  }

  return sorted;
});
</script>
