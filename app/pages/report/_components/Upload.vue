<template>
  <div class="relative z-10 flex h-[439px] w-[341px] flex-col items-center gap-[25px]">
    <div class="justify-start text-center text-[24px] font-[400] leading-loose text-foreground">
      {{ fileName }}
    </div>
    <div
      class="flex w-[341px] flex-col items-center rounded-[15px] bg-secondary px-[40px] py-[47px]"
    >
      <CloudIcon
        alt="cloud"
        class="mb-[20px] h-[60px] w-[60px]"
        filled="false"
        :font-controlled="false"
      />
      <button
        class="mb-[40px] justify-start whitespace-nowrap rounded-[10px] bg-primary px-[30px] py-[8px] text-center text-[18px] font-[500] leading-7 text-gray-fe"
        @click="openModal"
      >
        {{ btnName }}
      </button>
      <div
        class="mb-[20px] justify-start text-center font-['Pretendard'] text-[20px] font-[400] text-gray-8f"
      >
        - 업로드 유의사항 -
      </div>
      <div class="flex flex-col justify-center text-center">
        <div class="text-[20px] font-normal text-gray-8f">파일 형식 : PDF 지원 (1개)</div>
        <div class="text-[20px] font-normal text-gray-8f">파일 크기 : 50MB 이내</div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-[15px]">
      <div class="justify-start text-center text-[20px] font-[600] text-gray-8f">
        업로드 된 파일
      </div>
      <div
        class="flex h-[90px] w-[341px] items-center justify-center gap-[30px] rounded-[10px] border border-gray-8f bg-background"
      >
        <div class="justify-start text-center text-[20px] font-[400] text-foreground">
          {{ displayFileName }}
        </div>
        <TrashIcon
          alt="trash"
          class="h-[23px] w-[23px] cursor-pointer"
          filled="false"
          :font-controlled="false"
          @click="removeFile"
        />
      </div>
    </div>
    <div
      v-if="modalStore.isOpen('pdf-select')"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="absolute inset-0 bg-[rgba(26,26,26,0.40)]" @click="closeModal"></div>
      <div class="relative z-[9999]">
        <PdfUploadModal @close="closeModal" />
      </div>
    </div>
    <div
      v-if="modalStore.isOpen('report-select')"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="absolute inset-0 bg-[rgba(26,26,26,0.40)]" @click="closeModal"></div>
      <div class="relative z-[9999]">
        <ReportUploadModal @close="closeModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CloudIcon from "~/assets/icon/cloudIcon.svg";
import TrashIcon from "~/assets/icon/trashIcon.svg";
import PdfUploadModal from "../_modals/PdfUpload.vue";
import ReportUploadModal from "../_modals/ReportUpload.vue";
import { useModalStore } from "~/stores/modal";
import { useFileStore } from "~/stores/file";

const modalStore = useModalStore();
const fileStore = useFileStore();

const props = defineProps({
  fileName: {
    type: String,
    default: "",
  },
  btnName: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "pdf",
  },
});

const displayFileName = computed(() => {
  if (props.type === "pdf") {
    return fileStore.fileName || "파일이 선택되지 않았습니다";
  } else {
    return fileStore.reportFileName || "파일이 선택되지 않았습니다";
  }
});

const openModal = () => {
  console.log("openModal called, type:", props.type);
  if (props.type === "pdf") {
    modalStore.open("pdf-select");
  } else if (props.type === "report") {
    modalStore.open("report-select");
  }
};

const closeModal = () => {
  if (props.type === "pdf") {
    modalStore.close("pdf-select");
  } else if (props.type === "report") {
    modalStore.close("report-select");
  }
};

const removeFile = () => {
  if (props.type === "pdf") {
    fileStore.setFile(null);
    fileStore.setExample(null);
  } else {
    fileStore.setReportFile(null);
    fileStore.setReportExample(null);
  }
};
</script>
