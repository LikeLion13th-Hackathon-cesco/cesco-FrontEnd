<template>
  <div class="flex items-center gap-[43px] pt-11 cursor-pointer">
    <img class="w-48 h-48 rounded-2xl" :src="storeImg" />
    <div class="flex flex-col">
      <div
        class="w-auto h-12 justify-start text-zinc-900 text-4xl font-semibold font-['Pretendard'] leading-[50.31px]"
      >
        {{ storeName }}
      </div>
      <div
        class="w-auto h-12 justify-start text-zinc-900 text-3xl font-normal font-['Pretendard'] leading-[50.31px]"
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
