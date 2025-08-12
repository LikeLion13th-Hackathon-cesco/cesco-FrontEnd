<template>
  <nav
    class="sticky top-0 w-full py-[40px] px-[80px] flex items-center justify-center gap-[70px] bg-background"
  >
    <!-- 로고 -->
    <NuxtLink to="/">
      <span class="text-2xl font-mono font-light tracking-wide">Logo</span>
    </NuxtLink>

    <!-- 메뉴 -->
    <div class="flex items-center gap-[32px]">
      <NuxtLink
        to="/community"
        :class="[
          'relative p-[8px] text-[16px] text-foreground',
          isActive('/community') &&
            'text-primary font-[600] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:rounded-full after:transition-all after:duration-300 after:ease-in-out after:bg-primary',
        ]"
      >
        커뮤니티
      </NuxtLink>
      <NuxtLink
        to="/report"
        :class="[
          'relative p-[8px] text-[16px] text-foreground',
          isActive('/report') &&
            'text-primary font-[600] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:rounded-full after:transition-all after:duration-300 after:ease-in-out after:bg-primary',
        ]"
      >
        사기신고
      </NuxtLink>
      <NuxtLink
        to="/checklist"
        :class="[
          'relative p-[8px] text-[16px] text-foreground',
          isActive('/checklist') &&
            'text-primary font-[600] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:rounded-full after:transition-all after:duration-300 after:ease-in-out after:bg-primary',
        ]"
      >
        체크리스트
      </NuxtLink>
      <NuxtLink
        to="/my"
        :class="[
          'relative p-[8px] text-[16px] text-foreground',
          isActive('/my') &&
            'text-primary font-[600] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:rounded-full after:transition-all after:duration-300 after:ease-in-out after:bg-primary',
        ]"
      >
        마이 페이지
      </NuxtLink>
      <NuxtLink
        to="/pricing"
        :class="['p-[16px] rounded-[10px]', isPlus ? 'bg-primary' : 'bg-secondary']"
      >
        <span :class="['text-[16px] font-[600]', isPlus ? 'text-gray-fe' : 'text-primary']">
          PLUS 서비스 {{ isPlus ? "이용중" : "이용하기" }}
        </span>
      </NuxtLink>
    </div>

    <!-- 검색바 -->
    <div
      class="py-[15px] px-[30px] flex items-center gap-[12px] border-[1.5px] border-gray-b4 rounded-full"
    >
      <SearchIcon class="w-[20px] h-[20px]" filled="false" />
      <input
        type="search"
        placeholder="실거주 후기가 궁금하다면, 주소를 입력하세요."
        class="w-full text-foreground placeholder:text-gray-b4 text-[16px] font-[500] outline-none"
      />
    </div>
  </nav>
</template>

<script setup>
import SearchIcon from "~/assets/icon/search.svg";

// PLUS 구독중 여부
const isPlus = ref(true);

const route = useRoute();

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + "/");
};
</script>
