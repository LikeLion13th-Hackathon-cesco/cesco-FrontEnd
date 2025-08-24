<template>
  <div
    class="relative box-border flex h-[62px] w-[350px] items-center justify-start rounded-[10px] border-[1.50px] border-zinc-300 bg-white p-[30px]"
  >
    <div class="absolute left-0">
      <input
        v-model="replyContent"
        placeholder="댓글을 남겨보세요."
        class="w-[340px] pl-[30px] text-[20px] outline-none"
      />
    </div>
    <button
      v-if="replyContent.length > 0"
      class="absolute right-0 top-0 flex items-center justify-center rounded-br-[10px] rounded-tr-[10px] bg-zinc-300 px-[21px] py-[16px]"
    >
      <SendIcon
        filled="false"
        :font-controlled="false"
        class="h-[30px] w-[30px]"
        @click="handleSubmit"
      ></SendIcon>
    </button>
    <button
      v-if="replyContent.trim() !== 0"
      class="absolute right-0 top-0 flex items-center justify-center rounded-br-[10px] rounded-tr-[10px] bg-primary px-[21px] py-[16px]"
    >
      <SendIcon
        filled="false"
        :font-controlled="false"
        class="h-[30px] w-[30px]"
        @click="handleSubmit"
      ></SendIcon>
    </button>
  </div>
</template>

<script setup>
import SendIcon from "~/assets/icon/sendCommentIcon.svg";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { apiInstance } from "~/utils/api";

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
});

const replyContent = ref("");
const queryClient = useQueryClient();

const { mutate: createReply } = useMutation({
  mutationFn: async ({ postId, replyContent }) => {
    const res = await apiInstance.post("v1/comments", { postId, content: replyContent, userId: 1 });
    console.log("댓글생성 응답:", res.data);
    return res.data;
  },
  onSuccess: (data) => {
    console.log("댓글생성 성공:", data);
    //게시글 목록 캐시 무효화 (새로 고침)
    queryClient.invalidateQueries({
      queryKey: ["replies", props.postId],
    });
    alert("게시글이 성공적으로 등록되었습니다!");
    // emit("success");
    // emit("close");
  },
  onError: (error) => {
    console.error("댓글생성 실패:", error);

    if (error?.message) {
      alert(`댓글 생성에 실패했습니다: ${error.message}`);
    } else {
      alert("댓글등록에 실패했습니다. 다시 시도해주세요.");
    }
  },
});

const handleSubmit = () => {
  createReply({ replyContent: replyContent.value, userId: 1, postId: props.postId });
  replyContent.value = "";
};
</script>
