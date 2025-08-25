<template>
  <Explain :correct="true">
    <template #result>
      <div class="mb-[30px] text-[48px] font-[700] text-[#2D8AE7]">정답입니다.</div>
    </template>
    <template #resultExplain>
      <div class="text-[28px] font-[600] text-[#1A1A1A]">
        전입신고를 하면 확정일자가 자동으로 부여된다.
      </div>
    </template>
  </Explain>
</template>

<script setup>
import Explain from "./_components/Explain.vue";
</script>
