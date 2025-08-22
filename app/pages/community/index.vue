<template>
  <div class="relative flex justify-center">
    <div
      class="absolute left-[120px] top-0 z-20 h-[871px] w-[488px] rounded-br-[30px] rounded-tr-[30px] bg-white shadow-[10px_15px_6px_0px_rgba(0,0,0,0.15)]"
    >
      <div v-if="currentTab === 'community'" class="sticky top-[15px] flex justify-center">
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
      <div v-else class="sticky top-[15px] flex justify-center">
        <div
          class="cursor-pointer rounded-full px-[70px] py-[15px] font-['Pretendard'] text-2xl font-semibold text-gray-b4"
          @click="handleTabCommunity"
        >
          커뮤니티
        </div>
        <div
          class="cursor-pointer rounded-full bg-primary px-[70px] py-[15px] font-['Pretendard'] text-2xl font-semibold text-gray-fe"
          @click="handleTabStore"
        >
          제휴매장
        </div>
      </div>
      <div class="flex flex-col items-center gap-[30px]">
        <div v-if="currentTab === 'community'">
          <div v-if="!roadCode || !buildingNumber">
            <div class="mt-[264px] flex flex-col items-center justify-center gap-[30px]">
              <MapIcon class="h-[122px] w-[110px]" filled="false" :font-controlled="false" />
              <div
                class="justify-start text-center text-[26px] font-medium leading-9 text-neutral-400"
              >
                지도에서 위치를 검색하여
                <br />
                커뮤니티 게시글을 확인하세요.
              </div>
            </div>
          </div>
          <div v-else>
            <CommentWrap
              :posts="posts || []"
              :is-loading="isLoading"
              :error="isError"
              :selected-address="selectedAddress"
            />
          </div>
        </div>
        <div v-else>
          <CreditStore></CreditStore>
        </div>
      </div>
    </div>
    <div
      id="map"
      class="absolute left-[598px] top-0 z-10 h-[871px] w-[897px] rounded-[20px] bg-black"
    >
      <SearchBar @search-address="searchAddress"></SearchBar>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MapIcon from "~/assets/icon/mapIcon.svg";
import SearchBar from "./_components/SearchBar.vue";
import CommentWrap from "./_components/CommentWrap.vue";
import CreditStore from "../credit/creditStore.vue";
import { useQuery } from "@tanstack/vue-query";
import { apiInstance } from "~/utils/api";

const currentTab = ref("community");
const handleTabStore = () => {
  currentTab.value = "store";
};
const handleTabCommunity = () => {
  currentTab.value = "community";
};
const roadCode = ref(null);
const buildingNumber = ref(null);
const selectedAddress = ref("");
const {
  data: posts,
  refetch,
  isLoading,
  isError,
} = useQuery({
  queryKey: ["posts", roadCode, buildingNumber],
  enabled: false,
  queryFn: async () => {
    console.log("queryFn 실행됨!");
    console.log("현재 roadCode:", roadCode.value);
    console.log("현재 buildingNumber:", buildingNumber.value);

    if (!roadCode.value || !buildingNumber.value) {
      console.log("roadCode 또는 buildingNumber가 없어서 빈 배열 반환");
      return [];
    }

    const url = `v1/posts/${roadCode.value}/${buildingNumber.value}`;
    console.log("API 호출 URL:", url);

    try {
      const response = await apiInstance.get(url);
      console.log("API Response:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
});

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

const searchAddress = (suggestion) => {
  if (!map.value || !kakaoRef.value) return;

  // 1. 백엔드 API 파라미터 세팅
  roadCode.value = suggestion.rnMgtSn;
  buildingNumber.value = suggestion.buldMnnm;
  selectedAddress.value = suggestion.roadAddrPart1;
  refetch();

  // 2. 지도 이동 (카카오 KeywordSearch)
  const places = new kakaoRef.value.maps.services.Places();
  places.keywordSearch(suggestion.roadAddrPart1, (result, status) => {
    if (status === kakaoRef.value.maps.services.Status.OK) {
      const coords = new kakaoRef.value.maps.LatLng(result[0].y, result[0].x);

      // 기존 마커 제거
      if (currentMarker.value) currentMarker.value.setMap(null);

      // 새 마커 추가
      const imageSrc = new URL("~/assets/icon/mapPin.svg", import.meta.url).href;
      const imageSize = new kakaoRef.value.maps.Size(40, 50);
      const imageOption = { offset: new kakaoRef.value.maps.Point(27, 69) };
      const markerImage = new kakaoRef.value.maps.MarkerImage(imageSrc, imageSize, imageOption);

      currentMarker.value = new kakaoRef.value.maps.Marker({
        position: coords,
        map: map.value,
        image: markerImage,
      });

      // 지도 중심 이동
      map.value.setCenter(coords);
    } else {
      console.warn("카카오 키워드 검색 실패:", status);
    }
  });
};
</script>
