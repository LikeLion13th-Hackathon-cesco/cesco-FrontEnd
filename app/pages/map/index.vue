<template>
  <div class="flex justify-center">
    <div v-if="!selectedPost" class="flex justify-center gap-[70px]">
      <div id="map" class="w-[604px] h-[768px] rounded-[20px] bg-black font-white">지도위치</div>
      <CommentWrap />
    </div>
    <div v-else class="flex gap-[72px]">
      <CommentWrap />
      <ReplyItem />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CommentWrap from "./_components/CommentWrap.vue";
import ReplyItem from "./_components/ReplyItem.vue";

const selectedPost = ref(null);
// const handlePost = () => {
//   selectedPost.value = post;
// };

const config = useRuntimeConfig();
const kakaoKey = config.public.kakaoJavascriptKey;

const loadKakaoMapScript = () => {
  return new Promise((resolve) => {
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao);
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          resolve(window.kakao);
        });
      };
      document.head.appendChild(script);
    }
  });
};

onMounted(async () => {
  const kakao = await loadKakaoMapScript();

  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(37.4979, 127.0276), // 초기 좌표
    level: 3,
  };

  const map = new kakao.maps.Map(container, options);

  // 마커 예시
  new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.4979, 127.0276),
    map: map,
  });
});
</script>
