<script setup lang="ts">
import UploadIcon from "~/assets/icon/upload.svg";
import TrashIcon from "~/assets/icon/trash.svg";
import PdfUpload from "../_modals/PdfUpload.vue";
import { useFileStore } from "~/stores/file";

const modalStore = useModalStore();
const fileStore = useFileStore();

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    fileStore.setFile(file);
    console.log(file);
  }
};

const handleDeleteFile = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  fileStore.clearAll();
};

const handleUploadFile = async (data: {
  selectedExample: string | null;
  selectedFile: File | null;
}) => {
  console.log(data);

  // Update store with the data from modal
  if (data.selectedFile) {
    fileStore.setFile(data.selectedFile);
  } else if (data.selectedExample) {
    fileStore.setExample(data.selectedExample);
  }

  modalStore.close("pdf-select");
};
</script>

<template>
  <div class="flex flex-col gap-[30px]">
    <div
      class="flex flex-1 flex-col items-center justify-center rounded-[16px] bg-secondary p-[40px]"
    >
      <UploadIcon class="h-[60px] w-[60px]" filled="false" :font-controlled="false" />
      <button
        class="mt-[20px] rounded-[10px] bg-primary px-[30px] py-[8px] text-center text-[18px] font-[600] text-gray-fe"
        @click="modalStore.open('pdf-select')"
      >
        등기부등본 PDF 파일 업로드
      </button>
      <p class="mt-[40px] text-center text-[20px] font-[400] leading-[30px] text-gray-8f">
        - 업로드 유의사항 -
        <br />
        <br />
        파일 형식 : PDF 지원 (1개)
        <br />
        파일 크기 : 50MB 이내
      </p>
    </div>

    <!-- 업로드 된 파일 -->
    <div v-if="fileStore.hasFile">
      <span class="block text-center text-[20px] font-[600] text-gray-b4">업로드 된 파일</span>
      <label
        htmlFor="pdf-upload"
        class="mt-[15px] flex w-full cursor-pointer items-center justify-between rounded-[10px] px-[18px] py-[30px] ring-[1.5px] ring-gray-b4"
      >
        <span
          class="overflow-hidden text-ellipsis whitespace-nowrap text-[24px] font-[400] text-foreground"
        >
          {{ fileStore.fileName }}
        </span>
        <TrashIcon
          class="h-[25px] w-[25px] cursor-pointer"
          :font-controlled="false"
          filled="false"
          @click="handleDeleteFile"
        />
      </label>
      <input id="pdf-upload" type="file" class="hidden" @change="handleFileChange" />
    </div>
  </div>

  <!-- 모달 -->
  <PdfUpload :on-submit="handleUploadFile" />
</template>
