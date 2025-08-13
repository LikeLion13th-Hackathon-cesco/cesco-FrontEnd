<template>
  <main>
    <div class="px-[90px] py-[120px]">
      <h1 class="text-center text-[28px] font-[700] text-primary">
        복잡한 등기부등본, 업로드 한 번으로 안전지수부터 보증보험가입 가능 여부까지!
      </h1>
      <div class="mt-[60px] flex justify-center gap-[120px]">
        <PDFUploadPanel />
        <FormPanel />
      </div>
    </div>
  </main>
</template>

<script setup>
import PDFUploadPanel from "./_components/PDFUploadPanel.vue";
import FormPanel from "./_components/FormPanel.vue";
</script>
