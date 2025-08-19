<template>
  <div
    class="hover:bg-gray-70 box-border flex h-[200px] cursor-pointer flex-col rounded-[10px] p-[30px]"
  >
    <div
      class="mb-[5px] justify-start font-['Pretendard'] text-lg font-semibold leading-tight text-zinc-900"
    >
      {{ writer }}
    </div>
    <div
      class="mb-[15px] justify-start font-['Pretendard'] text-base font-normal leading-tight text-neutral-400"
    >
      {{ date }}
    </div>
    <div
      class="mb-[10px] justify-start font-['Pretendard'] text-base font-normal leading-normal text-zinc-900"
    >
      {{ comment }}
    </div>

    <div class="hidden h-48 w-96 rounded-[10px] bg-blue-50" />
  </div>
</template>

<script setup>
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
