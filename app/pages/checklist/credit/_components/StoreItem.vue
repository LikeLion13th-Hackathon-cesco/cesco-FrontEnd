<template>
  <div class="flex cursor-pointer items-center gap-[43px] pt-11">
    <img class="h-48 w-48 rounded-2xl" :src="storeImg" />
    <div class="flex flex-col">
      <div
        class="h-12 w-auto justify-start font-['Pretendard'] text-4xl font-semibold leading-[50.31px] text-zinc-900"
      >
        {{ storeName }}
      </div>
      <div
        class="h-12 w-auto justify-start font-['Pretendard'] text-3xl font-normal leading-[50.31px] text-zinc-900"
      >
        주소 : {{ address }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  storeName: {
    type: String,
    default: "중앙톤 스토어",
  },
  address: {
    type: String,
    default: "서울 서초구 양재동 232",
  },
  storeImg: {
    type: String,
    default: "",
  },
});
</script>
