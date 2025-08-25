<template>
  <div class="mt-[30px] flex flex-col items-center">
    <div class="flex flex-col items-center justify-center leading-10">
      <div class="text-[28px] font-bold leading-10 text-primary">
        신고해주신 정보는 다른 임차인들의 피해 예방을 위해 소중히 활용 됩니다.
      </div>
      <div class="text-[28px] font-bold leading-10 text-primary">
        신고시 소중한 제보에 감사한 마음을 담아 크레딧을 드립니다.
      </div>
      <div class="mt-[50px] flex h-[643px] justify-center gap-[80px]">
        <Upload
          file-name="민형사 고소증 접수 1부"
          btn-name="민형사 고소증 PDF 파일 업로드"
          type="report"
        ></Upload>
        <Upload
          file-name="등기부등본 1부"
          btn-name="등기부등본 PDF 파일 업로드"
          type="pdf"
        ></Upload>
      </div>
      <div class="mt-[40px] justify-start text-[24px] font-[400] text-gray-8f">
        ※ 상기 서류가 모두 구비되어야 신고 접수가 가능합니다.
      </div>
      <button
        :class="[
          'mb-[160px] mt-[35px] flex h-20 w-[762px] items-center justify-center rounded-[10px] text-3xl font-[600]',
          fileStore.canSubmit ? 'bg-primary text-background' : 'bg-gray-b4 text-background',
        ]"
        :disabled="!fileStore.canSubmit"
        @click="handleReport"
      >
        신고하기
      </button>
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(26,26,26,0.40)]"
      >
        <UploadComplete @close="closeModal" @check-credit="handleCreditCheck" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Upload from "./_components/Upload.vue";
import { useFileStore } from "~/stores/file";
import { apiInstance } from "~/utils/api";
import { useMutation } from "@tanstack/vue-query";
import UploadComplete from "./_modals/UploadComplete.vue";

const isModalOpen = ref(false);
const fileStore = useFileStore();

const reportMutation = useMutation({
  mutationFn: async () => {
    let formData: FormData | undefined;
    let isExample = 0;

    if (fileStore.selectedFile || fileStore.selectedReportFile) {
      // 실제 파일 업로드 모드
      formData = new FormData();
      if (fileStore.selectedFile) {
        formData.append("fraud_report_file", fileStore.selectedFile); // 등기부등본
      }
      if (fileStore.selectedReportFile) {
        formData.append("complaint_file", fileStore.selectedReportFile); // 고소장
      }
      isExample = 0;
    } else if (fileStore.selectedExample || fileStore.selectedReportExample) {
      // 예시 파일 모드

      const res = await fetch(`/pdf/${fileStore.selectedExample}`); //등기부
      const resReport = await fetch(`/pdf/${fileStore.selectedReportExample}`); //고소장

      const blob = await res.blob();
      const blob_report = await resReport.blob();

      formData = new FormData();

      formData.append("fraud_report_file", blob, fileStore.selectedExample!); // 등기부등본
      formData.append("complaint_file", blob_report, fileStore.selectedReportExample!); // 고소장

      isExample = 1;
    }

    return apiInstance
      .post(`fraud-reports/reports-result?isExample=${isExample}`, formData, {
        headers: formData ? { "Content-Type": "multipart/form-data" } : {},
      })
      .then((res) => res.data);
  },
  onSuccess: (data) => {
    console.log("신고 성공:", data);
    isModalOpen.value = true;
    fileStore.clearAll();
  },
  onError: (error) => {
    console.error("신고 실패:", error);
    alert("신고 처리 중 오류가 발생했습니다.");
  },
});

const closeModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
const handleCreditCheck = () => {
  navigateTo("/my");
  console.log("크레딧 페이지로 이동");
};
const handleReport = () => {
  if (fileStore.canSubmit) {
    reportMutation.mutate();
  } else {
    alert("등기부등본과 고소증 파일 모두 업로드해주세요.");
  }
};
</script>
