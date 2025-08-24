<template>
  <div class="rounded-[20px] px-[54px] py-[40px] outline outline-[1.50px]" :class="cardClass">
    <div class="flex flex-col items-start">
      <div
        class="mb-[10px] mt-[34px] justify-start text-center font-['Pretendard'] text-[28px] font-semibold leading-10"
        :style="{ color: textColor }"
      >
        {{ option }}
      </div>
      <div class="mb-[15px]">
        <slot name="price"></slot>
      </div>
      <slot name="button"></slot>

      <div class="mb-[30px] mt-[40px] flex flex-col items-start gap-[30px]">
        <!-- 기능 리스트 -->
        <slot name="features"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  textColor = "#3b82f6",
  option = "PLUS",
  cardClass = "string",
} = defineProps({
  textColor: {
    type: String,
    default: "#3b82f6",
  },
  option: {
    type: String,
    default: "PLUS",
  },
  cardClass: {
    type: String,
    default: "PLUS",
  },
});
</script>
