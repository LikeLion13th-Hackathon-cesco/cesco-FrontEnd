<template>
  <div
    class="box-border flex h-[200px] w-[400px] cursor-pointer flex-col rounded-[10px] p-[30px] hover:bg-blue-50"
  >
    <div class="mb-[5px] justify-start text-lg font-semibold leading-tight text-gray-1a">익명</div>
    <div class="mb-[15px] justify-start text-base font-normal text-gray-b4">
      {{ dayjs(date).format("YYYY-MM-DD") }}
    </div>
    <div class="mb-[10px] justify-start text-base font-normal text-gray-1a">
      {{ comment }}
    </div>
    <div class="flex items-start justify-start gap-[20px]">
      <div class="flex justify-start gap-[10px]" @click.stop="handleClickLike">
        <FilledLike
          v-if="isLike"
          class="h-4 w-4"
          filled="false"
          :font-controlled="false"
        ></FilledLike>

        <Like v-else class="h-4 w-4" filled="false" :font-controlled="false" />
        <div class="justify-start text-base font-normal text-gray-b4">
          {{ currentLikeCount }}
        </div>
      </div>
      <div class="flex justify-start gap-[10px]">
        <CommentIcon class="h-4 w-4" filled="false" :font-controlled="false" />
        <div class="justify-start text-base font-normal text-gray-b4">
          {{ commentCount }}
        </div>
      </div>
    </div>
    <div class="hidden h-48 w-96 rounded-[10px] bg-blue-50" />
  </div>
</template>

<script setup lang="ts">
import CommentIcon from "~/assets/icon/commentIcon.svg";
import Like from "~/assets/icon/like.svg";
import FilledLike from "~/assets/icon/filledHeart.svg";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/vue-query";
import { apiInstance } from "~/utils/api";

const props = defineProps({
  writer: {
    type: String,
    default: "작성자",
  },
  date: {
    type: String,
    default: "",
  },
  comment: {
    type: String,
    default: "",
  },
  commentCount: {
    type: Number,
    default: 1,
  },
  likeCount: {
    type: Number,
    default: 1,
  },
  userId: {
    type: Number,
    default: 1,
  },
  postId: {
    type: Number,
    required: true,
  },
  likeByUser: {
    type: Boolean,
    default: false,
  },
});

// props.likeByUser로 초기값 설정
const isLike = ref(props.likeByUser);
const currentLikeCount = ref(props.likeCount);

// props가 변경될 때 isLike 상태도 업데이트
watch(
  () => props.likeByUser,
  (newValue) => {
    isLike.value = newValue;
  }
);

// likeCount props가 변경될 때 currentLikeCount도 업데이트
watch(
  () => props.likeCount,
  (newValue) => {
    currentLikeCount.value = newValue;
  }
);

const handleClickLike = () => {
  if (isLike.value) {
    handleDelete();
  } else {
    clickLike({
      userId: props.userId,
      postId: props.postId,
    });
  }
};

const { mutate: clickLike } = useMutation({
  mutationFn: async (postData: { userId: number; postId: number }) => {
    console.log("게시글 좋아요 누른 데이터:", postData);

    const response = await apiInstance.post(`v1/posts/${postData.postId}/likes`);

    console.log("좋아요 생성 응답:", response.data);
    return response.data;
  },
  onSuccess: (data) => {
    console.log("좋아요 생성 성공:", data);
    isLike.value = true;
    currentLikeCount.value += 1;
  },
  onError: (error) => {
    console.error("좋아요 생성 실패:", error);

    if (error?.message) {
      alert(`좋아요 등록에 실패했습니다: ${error.message}`);
    } else {
      alert("좋아요 등록을 실패했습니다. 다시 시도해주세요.");
    }
  },
});

const { mutate: cancelLike } = useMutation({
  mutationFn: async (postId: number) => {
    const response = await apiInstance.delete(`v1/posts/${postId}/likes`);
    return response.data;
  },
  onSuccess: () => {
    console.log("좋아요 삭제 성공");
    isLike.value = false;
    currentLikeCount.value = Math.max(0, currentLikeCount.value - 1);
  },
  onError: (error) => {
    console.error(`좋아요 삭제 실패했습니다: ${error.message}`);
  },
});

const handleDelete = () => {
  cancelLike(props.postId);
};
</script>
