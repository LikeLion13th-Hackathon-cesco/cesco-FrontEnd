<template>
  <nav class="sticky top-0 z-[999] flex w-full items-center justify-center bg-background py-[40px]">
    <!-- 로고 -->
    <NuxtLink to="/" class="inline-flex items-center gap-[2px]">
      <LogoOutline :font-controlled="false" filled="false" class="h-[35px] w-[35px]" />
      <Setbangsari :font-controlled="false" filled="false" class="h-[26px]" />
    </NuxtLink>

    <!-- 메뉴 -->
    <div class="ml-[35px] flex items-center gap-[32px]">
      <NuxtLink
        to="/community"
        :class="[
          'relative p-[8px] text-[16px] text-foreground',
          isActive('/community') &&
            'font-[600] text-primary after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-primary after:transition-all after:duration-300 after:ease-in-out',
        ]"
      >
        커뮤니티
      </NuxtLink>
      <NuxtLink
        to="/report"
        :class="[
          'relative p-[8px] text-[16px] text-foreground',
          isActive('/report') &&
            'font-[600] text-primary after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-primary after:transition-all after:duration-300 after:ease-in-out',
        ]"
      >
        사기신고
      </NuxtLink>
      <NuxtLink
        to="/checklist"
        :class="[
          'relative p-[8px] text-[16px] text-foreground',
          isActive('/checklist') &&
            'font-[600] text-primary after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-primary after:transition-all after:duration-300 after:ease-in-out',
        ]"
      >
        체크리스트
      </NuxtLink>
      <NuxtLink
        to="/my"
        :class="[
          'relative p-[8px] text-[16px] text-foreground',
          isActive('/my') &&
            'font-[600] text-primary after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-primary after:transition-all after:duration-300 after:ease-in-out',
        ]"
      >
        마이 페이지
      </NuxtLink>
      <NuxtLink
        to="/pricing"
        :class="['rounded-[10px] p-[16px]', isPlus ? 'bg-primary' : 'bg-secondary']"
      >
        <span :class="['text-[16px] font-[600]', isPlus ? 'text-gray-fe' : 'text-primary']">
          PLUS 서비스 {{ isPlus ? "이용중" : "이용하기" }}
        </span>
      </NuxtLink>
    </div>

    <!-- 검색바 -->
    <div class="relative ml-[70px]">
      <div
        class="flex items-center gap-[12px] rounded-full border-[1.5px] border-gray-b4 px-[30px] py-[15px]"
      >
        <SearchIcon class="h-[20px] w-[20px]" filled="false" />
        <input
          :value="address"
          type="search"
          placeholder="실거주 후기가 궁금하다면, 주소를 입력하세요."
          class="desktop:w-[20rem] w-full text-[16px] font-[500] text-foreground outline-none placeholder:text-gray-b4"
          @input="handleInput"
        />
      </div>

      <!-- 검색 결과 -->
      <div
        v-if="searchResponse?.data && searchResponse.data.length > 0"
        class="absolute left-0 right-0 top-full z-50 mt-[2px] flex max-h-[300px] flex-col gap-[10px] overflow-y-auto rounded-[15px] bg-white px-[20px] py-[15px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)]"
      >
        <div
          v-for="suggestion in searchResponse?.data"
          :key="suggestion.rnMgtSn"
          class="px-[10px] py-[8px]"
        >
          <div
            class="cursor-pointer rounded-[8px] p-[8px] hover:bg-gray-50"
            @click="navigateToAddress(suggestion)"
          >
            <span
              v-for="part in splitByKeyword(suggestion.roadAddrPart1, address)"
              :key="part"
              :class="[
                'text-[14px] font-[400]',
                part.toLowerCase() === address.toLowerCase()
                  ? 'font-[600] text-primary'
                  : 'text-foreground',
              ]"
            >
              {{ part }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import SearchIcon from "~/assets/icon/search.svg";
import LogoOutline from "~/assets/icon/logo-outline.svg";
import Setbangsari from "~/assets/icon/setbangsari.svg";
import { apiInstance } from "~/utils/api";
import type { BaseResponse } from "~/utils/api";
import type { SearchAddressResponse } from "~/pages/community/_api/types/SearchAddressResponse";
import { useDebounce } from "~/composables/useDebounce";
import { splitByKeyword } from "~/pages/community/_utils/splitByKeyword";

// PLUS 구독중 여부
const isPlus = ref(true);

const route = useRoute();
const router = useRouter();

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + "/");
};

// 검색 기능
const address = ref("");
const debouncedAddress = useDebounce(address, 500);

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

const handleInput = (e: Event) => {
  address.value = (e.target as HTMLInputElement).value.trim();
};

const navigateToAddress = (suggestion: {
  rnMgtSn: string;
  buldMnnm: string;
  roadAddrPart1: string;
}) => {
  // 검색 결과 숨기기
  address.value = "";

  // 커뮤니티 페이지로 이동하면서 주소 정보를 쿼리 파라미터로 전달
  router.push({
    path: "/community",
    query: {
      roadCode: suggestion.rnMgtSn,
      buildingNumber: suggestion.buldMnnm,
      address: suggestion.roadAddrPart1,
    },
  });
};
</script>
