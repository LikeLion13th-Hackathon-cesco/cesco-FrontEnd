<template>
  <div
    class="box-border flex h-[70px] items-center justify-center gap-[20px] rounded-[100px] bg-white px-[50px] py-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)] outline outline-[3px] outline-blue-500"
  >
    <BlueSearch class="h-[30px] w-[30px]" filled="false" :font-controlled="false"></BlueSearch>
    <input
      v-model="address"
      type="search"
      class="w-[450px] text-[24px] outline-none"
      placeholder="실거주 후기가 궁금하다면, 주소를 입력하세요."
      @keyup.enter="handleSearch"
    />
  </div>
</template>

<script setup>
import BlueSearch from "~/assets/icon/blueSearchIcon.svg";
import { ref, defineEmits } from "vue";
const address = ref("");
const emits = defineEmits(["search-address"]);

const handleSearch = () => {
  if (address.value.trim() !== "") {
    console.log("검색어:", address.value);
    emits("search-address", address.value);
  }
};
</script>
