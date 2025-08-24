<script setup lang="ts">
import PDFUploadPanel from "./_components/PDFUploadPanel.vue";
import FormPanel from "./_components/FormPanel.vue";
import type { formSchema } from "./_utils/formSchema";
import { calculateDepositAmount, calculateMonthlyRentAmount } from "./_utils/calculations";
import type z from "zod";
import { useMutation } from "@tanstack/vue-query";
import type { AnalyzeSubmitResponse } from "./_api/types/AnalyzeSubmitResponse";
import { apiInstance, type BaseResponse } from "~/utils/api";
import { useModalStore } from "~/stores/modal";
import PdfSubmitted from "./_modals/PdfSubmitted.vue";

const modalStore = useModalStore();

const { mutate: submit } = useMutation<
  BaseResponse<AnalyzeSubmitResponse>,
  Error,
  z.infer<typeof formSchema>
>({
  mutationKey: ["analyze-submit"],
  mutationFn: async (data) => {
    const isMonthlyRent = data.rentType === "월세" ? "1" : "0";

    const deposit = calculateDepositAmount(data).toString();

    const monthlyRent =
      data.rentType === "전세" ? "0" : calculateMonthlyRentAmount(data).toString();

    // Build detailed address
    let detailAddress = "";
    if (data.detailed_address_dong && data.detailed_address_ho) {
      detailAddress = `${data.detailed_address_dong}동 ${data.detailed_address_ho}호`;
    } else if (data.detailed_address_dong) {
      detailAddress = `${data.detailed_address_dong}동`;
    } else if (data.detailed_address_ho) {
      detailAddress = `${data.detailed_address_ho}호`;
    }

    let isExample = "0";
    let fileToUpload: File;

    if (data.selected_example) {
      // 예시 파일 불러오기
      isExample = data.selected_example.match(/\d+/)?.[0] || "1";

      // 예시 파일 PDF fetch
      const response = await fetch(`/pdf/${data.selected_example}`);
      const blob = await response.blob();

      fileToUpload = new File([blob], data.selected_example, { type: "application/pdf" });
    } else {
      // 직접 업로드함
      isExample = "0";
      fileToUpload = data.selected_file!;
    }

    const formData = new FormData();
    formData.append(
      "file",
      fileToUpload,
      data.selected_example ? data.selected_example : data.selected_file?.name // 예시 파일 이름 또는 직접 업로드 파일 이름
    );

    const queryParams = new URLSearchParams({
      isMonthlyRent,
      deposit,
      monthlyRent,
      detailAddress,
      isExample,
    });

    return apiInstance
      .post(`/analysis-reports/analysis-result?${queryParams.toString()}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },
});

const handleSubmit = (data: z.infer<typeof formSchema>) => {
  modalStore.open("pdf-submitted");
  submit(data);
};
</script>

<template>
  <main>
    <div class="px-[90px] py-[120px]">
      <h1 class="text-center text-[28px] font-[700] text-primary">
        복잡한 등기부등본, 업로드 한 번으로 안전지수부터 보증보험가입 가능 여부까지!
      </h1>
      <div class="mt-[60px] flex justify-center gap-[60px]">
        <PDFUploadPanel />
        <FormPanel @submit="handleSubmit" />
      </div>
    </div>
  </main>

  <!-- 모달 -->
  <PdfSubmitted />
</template>
