<script setup lang="ts">
import HeroBackground from "~/assets/image/hero.png";
import ChevronDownWhite from "~/assets/icon/chevron-down-white.svg";
import PricingPage from "./pricing/index.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref, onMounted, onUnmounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

// Refs for elements
const heroSection = ref();
const heroBackground = ref();
const heroOverlay = ref();
const heroContent = ref();
const heroTitle = ref();
const heroSubtitle = ref();
const heroButton = ref();
const serviceIntro = ref();
const chevronArrow = ref();
const feature1 = ref();
const feature2 = ref();
const feature3 = ref();
const feature4 = ref();
const pricingSection = ref();

// Animation timeline
let tl: gsap.core.Timeline;
let chevronAnimation: gsap.core.Tween;

onMounted(() => {
  // Set initial fixed positioning to prevent bounce
  gsap.set(heroContent.value, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 10,
  });

  gsap.set(heroBackground.value, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
  });

  // Hero section animations
  tl = gsap.timeline();

  // Background overlay fade in
  tl.fromTo(heroOverlay.value, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.inOut" })
    // Title animation
    .fromTo(
      heroTitle.value,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      0.5
    )
    // Subtitle animation
    .fromTo(
      heroSubtitle.value,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      1.25
    )
    // Button animation
    .fromTo(
      heroButton.value,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      1.75
    )
    // Service intro text
    .fromTo(serviceIntro.value, { opacity: 0 }, { opacity: 1, duration: 1.2 }, 2.25)
    // Chevron arrow fade in and start bouncing
    .fromTo(
      chevronArrow.value,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        onComplete: () => {
          // Start infinite bouncing animation
          chevronAnimation = gsap.to(chevronArrow.value, {
            y: -8,
            duration: 0.75,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      },
      2.25
    );

  // Dynamic scroll effects for hero section
  // Make background completely fixed and fade out content
  ScrollTrigger.create({
    trigger: heroSection.value,
    start: "top top",
    end: "bottom top",
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      // Only update opacity since position is already fixed
      gsap.set(heroContent.value, {
        opacity: 1 - progress,
      });
    },
    onLeave: () => {
      // When hero section is completely scrolled past, restore everything to normal flow
      gsap.set(heroContent.value, {
        position: "relative",
        top: "auto",
        left: "auto",
        width: "auto",
        height: "auto",
        opacity: 0,
        zIndex: 10,
      });

      gsap.set(heroBackground.value, {
        position: "absolute",
        top: "auto",
        left: "auto",
        width: "100%",
        height: "120%",
        zIndex: "auto",
      });
    },
    onEnterBack: () => {
      // When scrolling back up, make everything fixed again
      gsap.set(heroContent.value, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        opacity: 1,
        zIndex: 10,
      });

      gsap.set(heroBackground.value, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      });
    },
  });

  // Feature scroll animations
  [feature1, feature2, feature3, feature4, pricingSection].forEach((feature) => {
    gsap.fromTo(
      feature.value,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: feature.value,
          start: "top 80%",
          once: true,
        },
      }
    );
  });
});

onUnmounted(() => {
  if (tl) tl.kill();
  if (chevronAnimation) chevronAnimation.kill();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <main class="max-w-full">
    <section id="hero" ref="heroSection" class="relative h-screen w-full overflow-hidden">
      <!-- 배경 -->
      <div
        ref="heroBackground"
        class="absolute inset-0 h-full w-full"
        :style="{
          backgroundImage: `url(${HeroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      />

      <!-- Dimmed -->
      <div ref="heroOverlay" class="absolute inset-0 h-full w-full bg-gray-1a/45" />

      <!-- 히어로 -->
      <div
        ref="heroContent"
        class="relative z-10 flex h-full items-center justify-center px-[100px] py-[300px]"
      >
        <div class="flex flex-col items-center gap-[30px]">
          <!-- Animated h1 -->
          <h1 ref="heroTitle" class="text-center text-[48px] font-[700] text-gray-fe">
            내 보증금, 안심해도 될까?
          </h1>

          <!-- Animated h2 -->
          <h2 ref="heroSubtitle" class="text-center text-[32px] font-[500] text-gray-d9">
            안심하기 어려운 보증금 계약,
            <br />
            전월세 위험도 분석을 지금 바로 확인해보세요.
          </h2>

          <button
            ref="heroButton"
            class="rounded-[15px] bg-gray-fe px-[50px] py-[15px] text-[24px] font-[600] text-primary"
            @click="navigateTo('/analyze')"
          >
            내 등기부등본 분석하기
          </button>
        </div>
        <div class="absolute bottom-[100px] flex flex-col items-center gap-[40px]">
          <span ref="serviceIntro" class="text-[32px] font-[600] text-gray-fe">서비스 소개</span>

          <div ref="chevronArrow">
            <ChevronDownWhite :font-controlled="false" filled="false" class="h-[18px] w-[30px]" />
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="relative z-20 flex flex-col gap-[120px] bg-white py-[110px]">
      <!-- 기능 1 -->
      <div ref="feature1" class="w-full space-y-[50px]">
        <img
          src="~/assets/image/landing-feature-1.png"
          alt=""
          class="mx-auto w-[600px] rounded-[15px] shadow-[0_0_12px_0_rgba(0,0,0,0.15)]"
        />
        <p class="text-center text-[32px]">
          <span class="font-[700] text-primary">복잡한 등기부등본,</span>
          <br />
          <span class="font-[500] text-gray-66">업로드 한 번으로 안전도 진단 끝!</span>
        </p>
      </div>

      <!-- 기능 2 -->
      <div ref="feature2" class="w-full space-y-[50px]">
        <img src="~/assets/image/landing-feature-2.png" alt="" class="mx-auto w-[600px]" />
        <p class="text-center text-[32px]">
          <span class="font-[700] text-primary">주소만 입력하면</span>
          <br />
          <span class="font-[500] text-gray-66">진짜 주민의 리뷰를 볼 수 있어요.</span>
        </p>
      </div>

      <!-- 기능 3 -->
      <div ref="feature3" class="w-full space-y-[50px]">
        <img
          src="~/assets/image/landing-feature-3.png"
          alt=""
          class="mx-auto w-[600px] rounded-[15px] shadow-[0_0_12px_0_rgba(0,0,0,0.15)]"
        />
        <p class="text-center text-[32px]">
          <span class="font-[700] text-primary">전월세 사기 신고 서비스로</span>
          <br />
          <span class="font-[500] text-gray-66">안전과 크레딧 모두를 챙겨보세요.</span>
        </p>
      </div>

      <!-- 기능 4 -->
      <div ref="feature4" class="w-full space-y-[50px]">
        <img src="~/assets/image/landing-feature-4.png" alt="" class="mx-auto w-[600px]" />
        <p class="text-center text-[32px]">
          <span class="font-[500] text-gray-66">신고 및 게시글 작성으로 받은 크레딧으로</span>
          <br />
          <span class="font-[700] text-primary">지역 제휴처에서 할인 혜택까지!</span>
        </p>
      </div>

      <!-- 가격 -->
      <div ref="pricingSection">
        <PricingPage />
      </div>
    </section>
  </main>
</template>
