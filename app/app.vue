<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | 셋방살이` : "셋방살이";
  },
});
</script>

<template>
  <Navbar />
  <NuxtPage />
</template>
