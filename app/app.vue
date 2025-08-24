<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | 셋방살이` : "셋방살이";
  },
});
</script>

<template>
  <component :is="'style'">
    @font-face { font-family: "Pretendard"; src: url("/font/PretendardVariable.woff2")
    format("woff2"); font-weight: 400; font-style: normal; font-display: swap; } :root { --primary:
    45 138 231; --secondary: 239 247 255; --accent-1: 163 209 255; --accent-2: 249 199 91;
    --destructive: 255 97 94; --gray-fe: 254 254 254; --background: 254 254 254; --gray-f5: 245 245
    245; --gray-d9: 217 217 217; --gray-b4: 180 180 180; --gray-8f: 143 143 143; --gray-66: 102 102
    102; --gray-1a: 26 26 26; --foreground: 26 26 26; } * { font-family: "Pretendard", sans-serif;
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } body { min-height:
    100vh; background-color: var(--background); color: var(--foreground); }
  </component>
  <Navbar />
  <NuxtPage class="mx-auto max-w-[1440px]" />
</template>
