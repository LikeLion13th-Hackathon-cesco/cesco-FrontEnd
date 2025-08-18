<template>
  <div
    class="flex h-[653px] w-[880px] flex-col items-center justify-start rounded-2xl bg-white px-[52px] py-[60px]"
  >
    <!-- 헤더 -->
    <div class="mb-[37px] flex w-full items-center">
      <BackIcon
        filled="false"
        :font-controlled="false"
        class="mr-[30px] h-[22px] w-[14px] cursor-pointer"
        @click="$emit('close')"
      />
      <div class="mr-[198px] justify-start">
        <span class="text-[32px] font-semibold text-blue-500">송파대로 48길 29</span>
        <span class="text-[32px] font-semibold text-zinc-900">에 게시글 작성</span>
      </div>
      <button
        class="inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-blue-500 px-[30px] py-[10px]"
        @click="handleSubmit"
      >
        <div class="box-border justify-start text-[28px] font-semibold text-white">등록</div>
      </button>
    </div>

    <!-- 구분선 -->
    <div class="mb-[37px] h-[1px] w-[768px] bg-[#B4B4B4]"></div>

    <!-- 입력 영역 -->
    <textarea
      v-model="postContent"
      class="h-[400px] w-[768px] resize-none rounded-[10px] p-4 text-[28px] focus:border-blue-500 focus:outline-none"
      :placeholder="placeholderText"
      style="font-size: 28px; color: #b4b4b4"
    ></textarea>
  </div>
</template>

<script setup>
import BackIcon from "~/assets/icon/backIcon.svg";

const emit = defineEmits(["close"]);

const postContent = ref("");

const placeholderText = `• 선택 지역의 리뷰 게시글 내용을 작성해보세요.
• 해당 위치에 맞지 않는 게시글이라고 판단 될 경우 글이 자동으로 삭제 될 수 있습니다.`;

const handleSubmit = () => {
  if (postContent.value.trim()) {
    console.log("게시글 등록:", postContent.value);
    emit("close");
  } else {
    alert("내용을 입력해주세요.");
  }
};
</script>

<style scoped>
textarea::placeholder {
  font-size: 18px;
  color: #b4b4b4;
  line-height: 1.5;
}
</style>
