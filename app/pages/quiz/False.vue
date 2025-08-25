<template>
  <Explain>
    <template #result>
      <div class="mb-[30px] text-[48px] font-[700] text-[#FF615E]">오답입니다.</div>
    </template>
    <template #resultExplain>
      <div class="text-[28px] font-[600] text-[#1A1A1A]">
        정답: 전입신고를 하면 확정일자가 자동으로 부여된다.
      </div>
    </template>
  </Explain>
</template>

<script setup>
import Explain from "./_components/Explain.vue";
</script>
