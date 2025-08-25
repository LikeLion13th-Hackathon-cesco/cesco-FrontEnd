<template>
  <div class="absolute left-[155px] top-[90px]">
    <div
      class="relative z-50 flex h-[70px] items-center justify-center gap-[20px] rounded-[100px] bg-background px-[50px] py-5 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)] outline outline-[3px] outline-[rgb(var(--primary))]"
    >
      <div class="flex items-center gap-[20px]">
        <BlueSearch class="h-[30px] w-[30px]" filled="false" :font-controlled="false"></BlueSearch>
        <input
          :value="address"
          type="search"
          class="w-[450px] text-[24px] outline-none"
          placeholder="실거주 후기가 궁금하다면, 주소를 입력하세요."
          @input="handleInput"
        />
      </div>
    </div>
    <!-- 검색 결과 -->
    <div
      v-if="searchResponse?.data && searchResponse.data.length > 0"
      class="mt-1/2 absolute left-0 right-0 top-1/2 z-40 flex flex-col gap-[30px] rounded-b-[30px] bg-background pb-[30px] pt-[60px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)]"
    >
      <div v-for="suggestion in searchResponse?.data" :key="suggestion.rnMgtSn" class="px-[50px]">
        <span
          v-for="part in splitByKeyword(suggestion.roadAddrPart1, address)"
          :key="part"
          :class="[
            'cursor-pointer text-[24px] font-[400] hover:underline hover:underline-offset-4',
            part.toLowerCase() === address.toLowerCase() ? 'text-primary' : 'text-foreground',
          ]"
          @click="emits('search-address', suggestion)"
        >
          {{ part }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlueSearch from "~/assets/icon/blueSearchIcon.svg";
import { ref, defineEmits, computed, defineProps, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { apiInstance } from "~/utils/api";
import type { BaseResponse } from "~/utils/api";
import type { SearchAddressResponse } from "../_api/types/SearchAddressResponse";
import { useDebounce } from "~/composables/useDebounce";
import { splitByKeyword } from "../_utils/splitByKeyword";

const props = defineProps<{
  initialValue?: string;
}>();

const address = ref(props.initialValue || "");
const debouncedAddress = useDebounce(address, 500);

// Watch for changes in initialValue prop
watch(
  () => props.initialValue,
  (newValue) => {
    if (newValue) {
      address.value = newValue;
    }
  },
  { immediate: true }
);

const emits = defineEmits(["search-address"]);

const { data: searchResponse } = useQuery<BaseResponse<SearchAddressResponse>>({
  queryKey: ["search-address", debouncedAddress],
  queryFn: async () =>
    apiInstance
      .get("v1/address-search", {
        params: {
          currentPage: 1,
          countPerPage: 20,
          keyword: debouncedAddress.value,
          resultType: "json",
        },
      })
      .then((res) => res.data),
  enabled: computed(() => !!debouncedAddress.value),
});
console.log("검색 결과 suggestion:", searchResponse.value);

const handleInput = (e: Event) => {
  address.value = (e.target as HTMLInputElement).value.trim();

  console.log("debounced 검색어:", debouncedAddress.value);
};
</script>
