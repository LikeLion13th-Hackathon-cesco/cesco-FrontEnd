<template>
  <nav
    class="sticky top-0 z-[999] flex w-full items-center justify-center bg-background px-[80px] py-[40px]"
  >
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
    <div
      class="ml-[70px] flex items-center gap-[12px] rounded-full border-[1.5px] border-gray-b4 px-[30px] py-[15px]"
    >
      <SearchIcon class="h-[20px] w-[20px]" filled="false" />
      <input
        type="search"
        placeholder="실거주 후기가 궁금하다면, 주소를 입력하세요."
        class="w-full text-[16px] font-[500] text-foreground outline-none placeholder:text-gray-b4"
      />
    </div>
  </nav>
</template>

<script setup>
import SearchIcon from "~/assets/icon/search.svg";
import LogoOutline from "~/assets/icon/logo-outline.svg";
import Setbangsari from "~/assets/icon/setbangsari.svg";

// PLUS 구독중 여부
const isPlus = ref(true);

const route = useRoute();

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + "/");
};
</script>
