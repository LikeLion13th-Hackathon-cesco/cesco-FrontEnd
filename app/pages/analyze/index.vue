<script setup lang="ts">
import PDFUploadPanel from "./_components/PDFUploadPanel.vue";
import FormPanel from "./_components/FormPanel.vue";
import type { formSchema } from "./_utils/formSchema";
import type z from "zod";
import { useMutation } from "@tanstack/vue-query";
import type { AnalyzeSubmitResponse } from "./_api/types/AnalyzeSubmitResponse";
import { apiInstance } from "~/utils/api";

const { mutate: submit } = useMutation<
  BaseResponse<AnalyzeSubmitResponse>,
  Error,
  z.infer<typeof formSchema>
>({
  mutationKey: ["analyze-submit"],
  mutationFn: async (data) => {
    console.log(data);
    return apiInstance.post("/analysis-reports/analysis-result", data).then((res) => res.data);
  },
});

const handleSubmit = (data: z.infer<typeof formSchema>) => {
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
