<template>
  <div class="flex flex-col gap-[30px] py-[20px]">
    <!-- 1. 전/월세 선택 -->
    <span class="text-[26px] font-[400] text-foreground">1. 전/월세 선택</span>
    <div class="flex items-center gap-[30px]">
      <button
        class="rounded-[10px] border border-primary px-[100px] py-[30px] text-center text-[26px] font-[400] text-primary"
      >
        전세
      </button>
      <button
        class="rounded-[10px] border border-primary px-[100px] py-[30px] text-center text-[26px] font-[400] text-primary"
      >
        월세
      </button>
    </div>

    <!-- 2. 보증금 입력 -->
    <span class="text-[26px] font-[400] text-foreground">2. 보증금 입력</span>
    <div class="flex items-center justify-between gap-[15px]">
      <input
        type="tel"
        class="w-[100px] border-b border-gray-b4 text-center text-[26px] font-[600] text-foreground outline-none"
      />
      <span class="text-[26px] font-[400] text-gray-b4">억</span>
      <input
        type="tel"
        class="w-[100px] border-b border-gray-b4 text-center text-[26px] font-[600] text-foreground outline-none"
      />
      <span class="text-[26px] font-[400] text-gray-b4">천</span>
      <input
        type="tel"
        class="w-[100px] border-b border-gray-b4 text-center text-[26px] font-[600] text-foreground outline-none"
      />
      <span class="text-[26px] font-[400] text-gray-b4">백만원</span>
    </div>

    <!-- 3. 월세 입력 -->
    <span class="text-[26px] font-[400] text-foreground">3. 월세 입력</span>
    <div class="flex items-center justify-between gap-[15px]">
      <input
        type="tel"
        class="w-[200px] border-b border-gray-b4 text-center text-[26px] font-[600] text-foreground outline-none"
      />
      <span class="text-[26px] font-[400] text-gray-b4">백</span>
      <input
        type="tel"
        class="w-[200px] border-b border-gray-b4 text-center text-[26px] font-[600] text-foreground outline-none"
      />
      <span class="text-[26px] font-[400] text-gray-b4">만원</span>
    </div>

    <button
      class="mt-[100px] w-full rounded-[10px] bg-gray-b4 py-[30px] text-center text-[26px] font-[600] text-gray-fe"
    >
      제출
    </button>
  </div>
</template>
