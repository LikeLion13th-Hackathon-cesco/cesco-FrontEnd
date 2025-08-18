<template>
  <div class="relative flex justify-center">
    <div
      class="absolute left-[120px] top-0 z-20 h-[871px] w-[488px] rounded-br-[30px] rounded-tr-[30px] bg-white shadow-[10px_15px_6px_0px_rgba(0,0,0,0.15)]"
    >
      <div class="sticky top-[15px] flex justify-center">
        <div
          class="cursor-pointer rounded-full bg-primary px-[70px] py-[15px] font-['Pretendard'] text-2xl font-semibold text-gray-fe"
          @click="handleTabCommunity"
        >
          커뮤니티
        </div>
        <div
          class="cursor-pointer rounded-full px-[70px] py-[15px] font-['Pretendard'] text-2xl font-semibold text-gray-b4"
          @click="handleTabStore"
        >
          제휴매장
        </div>
      </div>
      <div class="flex flex-col items-center gap-[30px]">
        <div v-if="currentTab === 'community'">
          <CommentWrap></CommentWrap>
        </div>
        <div v-else>
          <CreditStore></CreditStore>
        </div>
        <MapIcon class="h-[122px] w-[110px]" filled="false" :font-controlled="false"></MapIcon>
        <div class="justify-start text-center text-[26px] font-medium leading-9 text-neutral-400">
          지도에서 위치를 검색하여
          <br />
          제휴매장을 확인하세요.
        </div>
      </div>
    </div>
    <div
      id="map"
      class="absolute left-[598px] top-0 z-10 h-[871px] w-[897px] rounded-[20px] bg-black"
    >
      <SearchBar
        class="absolute left-[155px] top-[87px] z-10"
        @search-address="searchAddress"
      ></SearchBar>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MapIcon from "~/assets/icon/mapIcon.svg";
import SearchBar from "./_components/SearchBar.vue";
import CommentWrap from "./_components/CommentWrap.vue";
import CreditStore from "../checklist/credit/creditStore.vue";

const currentTab = ref("community");
const handleTabStore = () => {
  currentTab.value = "store";
};
const handleTabCommunity = () => {
  currentTab.value = "community";
};

//const selectedPost = ref(null);
// const handlePost = () => {
//   selectedPost.value = post;
// };

const config = useRuntimeConfig();
const kakaoKey = config.public.kakaoJavascriptKey;
const map = ref(null); // 지도 인스턴스를 저장할 ref
const currentMarker = ref(null); // 현재 마커 인스턴스를 저장할 ref

const loadKakaoMapScript = () => {
  return new Promise((resolve) => {
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao);
    } else {
      const script = document.createElement("script");
      // services 라이브러리 추가
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          resolve(window.kakao);
        });
      };
      document.head.appendChild(script);
    }
  });
};

const kakaoRef = ref(null);
onMounted(async () => {
  const kakao = await loadKakaoMapScript();
  kakaoRef.value = kakao;

  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(37.4979, 127.0276),
    level: 3,
  };
  // 지도 인스턴스를 ref 변수에 할당
  map.value = new kakao.maps.Map(container, options);

  // 초기 마커를 ref 변수에 할당
  currentMarker.value = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.4979, 127.0276),
    map: map.value,
  });
});

const searchAddress = (address) => {
  if (!map.value || !kakaoRef.value) return;

  const geocoder = new kakaoRef.value.maps.services.Geocoder();
  geocoder.addressSearch(address, (result, status) => {
    if (status === kakaoRef.value.maps.services.Status.OK) {
      const coords = new kakaoRef.value.maps.LatLng(result[0].y, result[0].x);

      if (currentMarker.value) currentMarker.value.setMap(null);

      const imageSrc = new URL("~/assets/icon/mapPin.svg", import.meta.url).href;
      const imageSize = new kakao.maps.Size(40, 50); // 이미지 크기
      const imageOption = { offset: new kakao.maps.Point(27, 69) };
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      currentMarker.value = new kakaoRef.value.maps.Marker({
        position: coords,
        map: map.value,
        image: markerImage,
      });

      map.value.setCenter(coords);
    }
  });
};
</script>
