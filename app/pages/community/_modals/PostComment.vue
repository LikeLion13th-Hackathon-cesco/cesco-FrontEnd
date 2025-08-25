<template>
  <div
    class="flex flex-col items-start justify-start rounded-2xl bg-background px-[52px] py-[60px]"
  >
    <!-- 헤더 -->
    <div class="mb-[20px] flex items-center justify-center">
      <BackIcon
        filled="false"
        :font-controlled="false"
        class="mr-[30px] h-[22px] w-[14px] cursor-pointer"
        @click="$emit('close')"
      />
      <div
        v-if="selectedAddress"
        class="mr-[198px] justify-start whitespace-nowrap text-[32px] font-[600] text-gray-1a"
      >
        <span class="text-[32px] font-semibold text-primary">
          {{ selectedAddress }}
        </span>
        에 게시글 작성
      </div>
      <div v-else class="mr-[198px] justify-start text-[32px] font-semibold text-gray-1a">
        지역을 검색해주세요.
      </div>
      <button
        class="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] bg-primary px-[30px] py-[10px]"
        @click="handleSubmit"
      >
        <div class="box-border justify-start text-[28px] font-[600] text-background">등록</div>
      </button>
    </div>

    <!-- 구분선 -->
    <div class="mb-[20px] h-[1px] w-full bg-[#B4B4B4]"></div>

    <!-- 입력 영역 -->
    <textarea
      v-model="postContent"
      class="h-[400px] w-full resize-none rounded-[10px] text-[28px] focus:border-primary focus:outline-none"
      :placeholder="placeholderText"
      style="font-size: 28px; color: #b4b4b4"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import BackIcon from "~/assets/icon/backIcon.svg";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { apiInstance } from "~/utils/api";

const props = defineProps({
  roadCode: {
    type: String,
    required: true,
  },
  buildingNumber: {
    type: String,
    required: true,
  },
  selectedAddress: {
    type: String,
    default: "",
  },
  userId: {
    type: Number,
    default: 1,
  },
});

const { mutate: createPost } = useMutation({
  mutationFn: async (postData: {
    userId: number;
    content: string;
    roadCode: string;
    buildingNumber: string;
  }) => {
    console.log("게시글 생성 API 호출:", postData);

    const response = await apiInstance.post("v1/posts", { ...postData });

    console.log("게시글 생성 응답:", response.data);
    return response.data;
  },
  onSuccess: (data) => {
    console.log("게시글 생성 성공:", data);

    console.log(props.roadCode, props.buildingNumber);

    // 게시글 목록 캐시 무효화 (새로 고침)
    queryClient.invalidateQueries({
      queryKey: ["posts", props.roadCode, props.buildingNumber],
    });
    alert("게시글이 성공적으로 등록되었습니다!");
    emit("success");
    emit("close");
  },
  onError: (error) => {
    console.error("게시글 생성 실패:", error);

    if (error?.message) {
      alert(`게시글 등록에 실패했습니다: ${error.message}`);
    } else {
      alert("게시글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  },
});

const emit = defineEmits(["close", "success"]);
const queryClient = useQueryClient();

const postContent = ref("");

const placeholderText = `• 선택 지역의 리뷰 게시글 내용을 작성해보세요.
• 해당 위치에 맞지 않는 게시글이라고 판단 될 경우 글이 자동으로 삭제 될 수 있습니다.`;

const handleSubmit = () => {
  console.log("게시글 등록 시도");
  console.log("내용:", postContent.value);
  console.log("roadCode:", props.roadCode);
  console.log("buildingNumber:", props.buildingNumber);

  if (!postContent.value.trim()) {
    alert("내용을 입력해주세요.");
    return;
  }

  createPost({
    content: postContent.value,
    roadCode: props.roadCode,
    buildingNumber: props.buildingNumber,
    userId: 1,
  });
};
</script>

<style scoped>
textarea::placeholder {
  font-size: 24px;
  color: #b4b4b4;
  line-height: 1.8;
}
</style>
