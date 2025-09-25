<template>
  <div class="flex cursor-pointer items-center gap-[43px] pt-11">
    <img class="h-[120px] w-[120px] rounded-2xl" :src="storeImg" />
    <div class="flex flex-col">
      <div class="justify-start font-['Pretendard'] text-[24px] font-[600] text-gray-1a">
        {{ storeName }}
      </div>
      <div class="justify-start font-['Pretendard'] text-[20px] font-[400] text-gray-1a">
        {{ address }}
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
