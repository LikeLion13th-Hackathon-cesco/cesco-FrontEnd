<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | 셋방살이` : "셋방살이";
  },
});
</script>

<template>
  <component :is="'style'">
    /* Copyright (c) 2021 Kil Hyung-jin, with Reserved Font Name Pretendard.
    https://github.com/orioncactus/pretendard This Font Software is licensed under the SIL Open Font
    License, Version 1.1. This license is copied below, and is also available with a FAQ at:
    http://scripts.sil.org/OFL */ @font-face { font-family: 'Pretendard'; font-weight: 900;
    font-display: swap; src: local('Pretendard Black'), url(./woff2/Pretendard-Black.woff2)
    format('woff2'), url(./woff/Pretendard-Black.woff) format('woff'); } @font-face { font-family:
    'Pretendard'; font-weight: 800; font-display: swap; src: local('Pretendard ExtraBold'),
    url(./woff2/Pretendard-ExtraBold.woff2) format('woff2'), url(./woff/Pretendard-ExtraBold.woff)
    format('woff'); } @font-face { font-family: 'Pretendard'; font-weight: 700; font-display: swap;
    src: local('Pretendard Bold'), url(./woff2/Pretendard-Bold.woff2) format('woff2'),
    url(./woff/Pretendard-Bold.woff) format('woff'); } @font-face { font-family: 'Pretendard';
    font-weight: 600; font-display: swap; src: local('Pretendard SemiBold'),
    url(./woff2/Pretendard-SemiBold.woff2) format('woff2'), url(./woff/Pretendard-SemiBold.woff)
    format('woff'); } @font-face { font-family: 'Pretendard'; font-weight: 500; font-display: swap;
    src: local('Pretendard Medium'), url(./woff2/Pretendard-Medium.woff2) format('woff2'),
    url(./woff/Pretendard-Medium.woff) format('woff'); } @font-face { font-family: 'Pretendard';
    font-weight: 400; font-display: swap; src: local('Pretendard Regular'),
    url(./woff2/Pretendard-Regular.woff2) format('woff2'), url(./woff/Pretendard-Regular.woff)
    format('woff'); } @font-face { font-family: 'Pretendard'; font-weight: 300; font-display: swap;
    src: local('Pretendard Light'), url(./woff2/Pretendard-Light.woff2) format('woff2'),
    url(./woff/Pretendard-Light.woff) format('woff'); } @font-face { font-family: 'Pretendard';
    font-weight: 200; font-display: swap; src: local('Pretendard ExtraLight'),
    url(./woff2/Pretendard-ExtraLight.woff2) format('woff2'), url(./woff/Pretendard-ExtraLight.woff)
    format('woff'); } @font-face { font-family: 'Pretendard'; font-weight: 100; font-display: swap;
    src: local('Pretendard Thin'), url(./woff2/Pretendard-Thin.woff2) format('woff2'),
    url(./woff/Pretendard-Thin.woff) format('woff'); } :root { --primary: 45 138 231; --secondary:
    239 247 255; --accent-1: 163 209 255; --accent-2: 249 199 91; --destructive: 255 97 94;
    --gray-fe: 254 254 254; --background: 254 254 254; --gray-f5: 245 245 245; --gray-d9: 217 217
    217; --gray-b4: 180 180 180; --gray-8f: 143 143 143; --gray-66: 102 102 102; --gray-1a: 26 26
    26; --foreground: 26 26 26; } * { font-family: "Pretendard", sans-serif; -webkit-font-smoothing:
    antialiased; -moz-osx-font-smoothing: grayscale; } body { min-height: 100vh; background-color:
    var(--background); color: var(--foreground); }
  </component>
  <Navbar />
  <NuxtPage class="mx-auto max-w-[1440px]" />
</template>
