<template>
  <div
    class="relative z-0 rounded-bl-2xl rounded-br-2xl rounded-tl-2xl rounded-tr-2xl bg-neutral-100 px-7 pb-9 pt-6"
    :style="{ width: cardWidth, height: cardHeight }"
  >
    <img
      class="absolute left-0 top-0 z-10 w-full rounded-tl-2xl rounded-tr-2xl object-cover"
      :src="img"
      alt="사진"
      :style="{ height: cardImgHeight }"
    />
    <div
      class="absolute left-0 z-10 inline-flex flex-col items-start justify-start gap-2.5 px-[30px] pt-[25px]"
      :style="{ top: cardImgHeight }"
    >
      <div class="justify-start">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  img: {
    type: String,
    default: "",
  },
  cardWidth: {
    type: String,
    default: "413px",
  },
  cardHeight: {
    type: String,
    default: "208px",
  },
  cardImgHeight: {
    type: String,
    default: "240px",
  },
});
</script>
