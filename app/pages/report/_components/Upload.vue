<template>
  <div class="relative z-10 flex h-[439px] w-[341px] flex-col items-center gap-[30px]">
    <div class="justify-start text-center text-[26px] font-normal leading-loose text-zinc-900">
      {{ fileName }}
    </div>
    <div class="flex h-96 w-80 flex-col items-center rounded-2xl bg-blue-50 py-[40px] pt-[47px]">
      <CloudIcon
        alt="cloud"
        class="mb-[20px] h-[60px] w-[60px]"
        filled="false"
        :font-controlled="false"
      />
      <button
        class="mb-[40px] justify-start whitespace-nowrap rounded-[10px] bg-blue-500 px-[30px] py-[8px] text-center font-['Pretendard'] text-[18px] font-[600] leading-7 text-white"
        @click="openModal"
      >
        {{ btnName }}
      </button>
      <div
        class="mb-[20px] justify-start text-center font-['Pretendard'] text-xl font-normal leading-loose text-neutral-400"
      >
        - 업로드 유의사항 -
      </div>
      <div class="flex flex-col justify-center text-center leading-6">
        <div class="font-['Pretendard'] text-xl font-normal text-neutral-400">
          파일 형식 : PDF 지원 (1개)
        </div>
        <div class="font-['Pretendard'] text-xl font-normal text-neutral-400">
          파일 크기 : 50MB 이내
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-[15px]">
      <div
        class="justify-start text-center font-['Pretendard'] text-xl font-semibold leading-loose text-neutral-400"
      >
        업로드 된 파일
      </div>
      <div
        class="flex h-[90px] w-[341px] items-center justify-center gap-[30px] rounded-[10px] border border-neutral-400 bg-white"
      >
        <div
          class="justify-start text-center font-['Pretendard'] text-[20px] font-normal leading-6 text-zinc-900"
        >
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
      <div class="absolute inset-0 bg-zinc-900/40" @click="closeModal"></div>
      <div class="z-60 relative">
        <PdfUploadModal @close="closeModal" />
      </div>
    </div>
    <div
      v-if="modalStore.isOpen('report-select')"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="absolute inset-0 bg-zinc-900/40" @click="closeModal"></div>
      <div class="z-60 relative">
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
