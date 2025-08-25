<template>
  <div class="mt-[30px] flex-col pr-[20px]">
    <div
      class="my-[30px] box-border flex h-[60px] cursor-pointer items-center justify-start rounded-[10px] border-[#B4B4B4] px-[15px] py-[25px] outline outline-[1.50px] outline-offset-[-1.50px] outline-zinc-400"
      @click="handlePostModal"
    >
      <div class="justify-start text-[20px] font-medium text-gray-b4">
        선택 지역의 리뷰 게시글을 작성해보세요.
      </div>
      <Stick class="ml-[50px] h-[60px]" filled="false" :font-controlled="false"></Stick>
      <Pencil class="ml-[20px] h-[22px] w-[22px]" filled="false" :font-controlled="false"></Pencil>
    </div>

    <div class="justify-start text-[24px] font-semibold text-zinc-900">
      <span class="text-[24px] font-semibold text-primary">
        {{ selectedAddress || "지역을 선택해주세요" }}
      </span>
      의
      <br />
      리뷰 게시글
    </div>

    <div class="mt-[28px] flex justify-between">
      <div class="justify-start text-[24px] font-semibold text-zinc-900">
        <span class="text-[24px] font-semibold text-gray-1a">총 {{ " " }}</span>
        <span class="text-[24px] font-semibold text-primary">
          {{ posts?.length || 0 }}
        </span>
        <span class="font-['Pretendard'] text-2xl font-semibold text-gray-1a">개</span>
      </div>
      <div class="relative">
        <div
          class="flex h-8 w-20 items-center justify-center gap-1 rounded-[5px] border border-gray-b4 bg-background"
          @click="handleToggle"
        >
          <p class="cursor-pointer justify-start text-[16px] font-semibold text-gray-b4">
            {{ selectedOption }}
          </p>
          <DropDownIcon class="h-[19px] w-[19px]" filled="false" :font-controlled="false" />
        </div>
        <div
          v-if="ToggleOpen"
          class="absolute left-0 top-full z-10 mt-1 w-20 rounded-[5px] border bg-background shadow-lg"
        >
          <div
            v-for="option in options"
            :key="option"
            class="cursor-pointer px-3 py-2 text-[16px] font-semibold text-gray-b4 hover:bg-gray-50"
            @click="selectOption(option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="mt-[21px] flex h-[526px] w-[400px] items-center justify-center">
      <div class="text-gray-b4">게시글을 불러오는 중...</div>
    </div>

    <div v-else-if="error" class="mt-[21px] flex h-[526px] w-[400px] items-center justify-center">
      <div class="text-destructive">게시글을 불러오는데 실패했습니다.</div>
    </div>

    <div
      v-else-if="!posts || posts.length === 0"
      class="mt-[21px] flex h-[526px] w-[400px] items-center justify-center"
    >
      <div class="text-gray-b4">아직 작성된 게시글이 없습니다.</div>
    </div>

    <!-- 게시글 목록 -->
    <div v-else class="mt-[21px] flex h-[526px] flex-col overflow-y-auto overflow-x-hidden">
      <div v-for="post in sortedPosts" :key="post.postId">
        <CommentItem
          :writer="post.userId.toString()"
          :date="post.createdAt"
          :comment="post.content"
          :comment-count="post.commentCount"
          :like-count="post.likeCount"
          :like-by-user="true"
          :user-id="1"
          :post-id="post.postId"
          @click="handlePostClick(post.postId)"
        />

        <div v-if="openedPostId === post.postId" class="relative mt-[10px] bg-gray-50 p-4">
          <div v-if="isReplyLoading" class="text-zinc-400">댓글을 불러오는 중...</div>
          <!-- <div v-else-if="isReplyError" class="text-red-500">댓글을 불러오는데 실패했습니다.</div> -->
          <div v-for="reply in replyData?.data" :key="reply?.postId" class="mb-[10px] last:mb-0">
            <ReplyItem
              :writer="'익명'"
              :date="reply.createdAt"
              :comment="reply.content"
              class="border border-gray-200 bg-white shadow-sm"
            />
          </div>
          <div v-if="!replyData || replyData.data.length === 0" class="mb-[30px] text-zinc-400">
            댓글이 없습니다.
          </div>
          <div class="sticky bottom-0">
            <PostReply :post-id="post.postId" :opened-post-id="openedPostId"></PostReply>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="PostModalOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-1a/40"
      >
        <div class="absolute inset-0" @click="handlePostModal"></div>
        <div class="relative">
          <PostComment
            :road-code="roadCode"
            :building-number="buildingNumber"
            :selected-address="selectedAddress"
            @close="handlePostModal"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import DropDownIcon from "~/assets/icon/dropDownIcon.svg";
import CommentItem from "./CommentItem.vue";
import ReplyItem from "./ReplyItem.vue";
import PostComment from "../_modals/PostComment.vue";
import Stick from "~/assets/icon/stick.svg";
import Pencil from "~/assets/icon/pencil.svg";
import { useQuery } from "@tanstack/vue-query";
import { apiInstance, type BaseResponse } from "~/utils/api";
import PostReply from "./PostReply.vue";
import type { ReplyResponse } from "../_api/types/ReplyResponse";
import type { PostResponse } from "../_api/types/PostResponse";

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
const openedPostId = ref<number | null>(null);

const handlePostClick = (postId: number) => {
  openedPostId.value = openedPostId.value === postId ? null : postId;
};

const handleToggle = () => {
  ToggleOpen.value = !ToggleOpen.value;
};

const selectOption = (option: string) => {
  selectedOption.value = option;
  ToggleOpen.value = false;
};

const handlePostModal = () => {
  PostModalOpen.value = !PostModalOpen.value;
};

// 정렬된 게시글
const sortedPosts = computed(() => {
  if (!props.posts || props.posts.length === 0) return [];

  const sorted = [...props.posts] as PostResponse[];

  if (selectedOption.value === "최신순") {
    return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (selectedOption.value === "인기순") {
    return sorted.sort((a, b) => b.likeCount - a.likeCount);
  }

  return sorted;
});

const { data: replyData, isLoading: isReplyLoading } = useQuery<BaseResponse<ReplyResponse>>({
  queryKey: ["replies", openedPostId],
  queryFn: async () => {
    if (!openedPostId.value) return [];
    const res = await apiInstance.get(`v1/posts/${openedPostId.value}/comments`);
    console.log(res.data);
    return res.data;
  },
  enabled: computed(() => !!openedPostId.value),
});
</script>
