<template>
  <div
    class="hover:bg-gray-70 box-border flex h-[150px] cursor-pointer flex-col rounded-[10px] p-[30px]"
  >
    <div class="mb-[5px] justify-start text-[20px] font-semibold leading-tight text-gray-1a">
      {{ writer }}
    </div>
    <div class="mb-[15px] justify-start text-base font-normal text-gray-8f">
      {{ dayjs(date).format("YYYY-MM-DD") }}
    </div>
    <div class="mb-[10px] justify-start text-base font-normal text-gray-1a">
      {{ comment }}
    </div>

    <div class="hidden h-48 w-96 rounded-[10px] bg-secondary" />
  </div>
</template>

<script setup>
import dayjs from "dayjs";
defineProps({
  writer: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  comment: {
    type: String,
    default: "",
  },
});
</script>
