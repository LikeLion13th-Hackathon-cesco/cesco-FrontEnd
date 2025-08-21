<template>
  <div class="flex flex-col items-center justify-start">
    <div
      class="relative flex h-[371px] w-[896px] flex-col items-center justify-center rounded-2xl bg-neutral-100 py-[35px]"
    >
      <img src="~/assets/image/checklistIcon.jpg" alt="체크리스트" class="h-[147px] w-[107px]" />
      <div
        class="justify-start px-[40px] py-[10px] text-center font-['Pretendard'] text-3xl font-semibold leading-10 text-zinc-900"
      >
        부동산 퀴즈 풀고 크레딧 받기
      </div>

      <button
        class="h-[64px] w-[177px] justify-start rounded-[10px] bg-[#2D8AE7] font-['Pretendard'] text-[32px] font-semibold leading-10 text-white"
      >
        퀴즈풀기
      </button>
    </div>
    <div class="mt-[90px] flex w-[896px] flex-col">
      <section class="mb-[80px]">
        <div class="mb-[60px] text-center">
          <div class="font-['Pretendard'] text-4xl font-bold leading-[58px] text-blue-500">
            잠깐!
          </div>
          <span class="font-['Pretendard'] text-4xl font-bold leading-[58px] text-zinc-900">
            집 구하기 전 확인하셨나요?
          </span>
        </div>
        <!-- 카드 그리드 -->
        <div class="mb-[80px] flex justify-center">
          <div class="grid grid-cols-2 items-start gap-x-[70px] gap-y-[50px]">
            <CheckCard card-width="413px" card-height="447px" card-img-height="240px" :img="One">
              <div>
                <span
                  class="font-['Pretendard'] text-2xl font-semibold leading-[50px] text-blue-500"
                >
                  보증보험 가입
                </span>
                <span
                  class="font-['Pretendard'] text-2xl font-semibold leading-[50px] text-zinc-900"
                >
                  가능 여부 확인
                </span>
              </div>
              <div
                class="justify-start font-['Pretendard'] text-lg font-normal leading-7 text-zinc-900"
              >
                보증보험을 가입하면 보증금 피해 발생 시
                <br />
                보증금의 일부나 전액을 배상 받을 수 있습니다.
              </div>
            </CheckCard>
            <CheckCard card-width="413px" card-height="447px" card-img-height="240px" :img="Two">
              <div>
                <span
                  class="font-['Pretendard'] text-2xl font-semibold leading-[50px] text-blue-500"
                >
                  중개업자 신원
                </span>
                <span
                  class="font-['Pretendard'] text-2xl font-semibold leading-[50px] text-zinc-900"
                >
                  확인
                </span>
              </div>
              <div class="justify-start">
                <span
                  class="whitespace-nowrap font-['Pretendard'] text-lg font-semibold leading-7 text-blue-500"
                >
                  국토부 중개사 조회 사이트
                </span>
                <span class="font-['Pretendard'] text-lg font-normal leading-7 text-zinc-900">
                  에서 중개사의 자격
                  <br />
                  여부를 확인해야합니다. 무자격자에게 계약하면
                  <br />
                  법적인 보호를 받지 못할 수 있습니다.
                </span>
              </div>
            </CheckCard>
            <CheckCard card-width="413px" card-height="570px" card-img-height="240px" :img="Three">
              <div>
                <span
                  class="font-['Pretendard'] text-2xl font-semibold leading-[50px] text-blue-500"
                >
                  등기부등본
                </span>
                <span
                  class="font-['Pretendard'] text-2xl font-semibold leading-[50px] text-zinc-900"
                >
                  확인
                </span>
              </div>
              <div class="justify-start">
                <span class="font-['Pretendard'] text-lg font-normal leading-7 text-zinc-900">
                  등기부등본은 부동산 또는
                </span>
                <span class="font-['Pretendard'] text-lg font-semibold leading-7 text-blue-500">
                  대법원 인터넷등기소
                </span>
                <span class="font-['Pretendard'] text-lg font-normal leading-7 text-zinc-900">
                  를 통해 반드시 확인해야할 정보입니다.
                  <br />
                  실제 집주인이 누구인지 확인하고 근저당이나 압류 여부를 확인할 수 있습니다.
                  <br />
                </span>
                <span
                  class="font-['Pretendard'] text-base font-normal leading-relaxed text-zinc-900"
                >
                  <br />
                </span>
                <span class="font-['Pretendard'] text-sm font-semibold leading-snug text-blue-500">
                  TIP!
                  <br />
                </span>
                <span
                  class="font-['Pretendard'] text-base font-normal leading-relaxed text-zinc-900"
                >
                  등기부등본은 변경 가능성이 있기에 입주 전 반드시 한번 더 확인해야합니다!
                </span>
              </div>
            </CheckCard>
            <CheckCard card-width="413px" card-height="570px" card-img-height="240px" :img="Four">
              <div>
                <span
                  class="font-['Pretendard'] text-2xl font-semibold leading-[50px] text-blue-500"
                >
                  확정일자 및 전입신고
                </span>
                <span
                  class="font-['Pretendard'] text-2xl font-semibold leading-[50px] text-zinc-900"
                >
                  가능 여부 확인
                </span>
              </div>
              <div
                class="justify-start font-['Pretendard'] text-lg font-normal leading-7 text-zinc-900"
              >
                확정일자와 전입신고가 가능해야지만 보증금을 법적으로 보호할 수 있습니다.
              </div>
              <div
                class="mt-[25px] justify-start font-['Pretendard'] text-lg font-normal leading-7 text-zinc-900"
              >
                다만, 상가주택이나 불법건축물 등의 경우 불가할 수도 있기에 반드시 사전에
                확인해야합니다.
              </div>
            </CheckCard>
          </div>
        </div>
        <!-- 큰 카드 -->
        <div class="flex justify-center">
          <CheckCard :img="Five" card-width="896px" card-height="764px" card-img-height="533px">
            <div class="justify-start">
              <span class="font-['Pretendard'] text-2xl font-semibold leading-[50px] text-blue-500">
                선순위 계약자
              </span>
              <span class="font-['Pretendard'] text-2xl font-semibold leading-[50px] text-zinc-900">
                확인
              </span>
              <div class="w-[836px] justify-start">
                <span class="font-['Pretendard'] text-lg font-normal leading-7 text-zinc-900">
                  입주하기 전 반드시
                </span>
                <span
                  class="font-['Pretendard'] text-lg font-normal leading-7 text-blue-500"
                ></span>
                <span class="font-['Pretendard'] text-lg font-semibold leading-7 text-blue-500">
                  주민센터나 정부24에서 전세입자의 전출 여부를 확인
                </span>
                <span class="font-['Pretendard'] text-lg font-normal leading-7 text-zinc-900">
                  해야 합니다.
                  <br />
                  만약 전세입자가 전출신고를 하지 않고 여전히 전입신고 상태를 유지하고 있다면,
                  <br />
                  해당 세입자는 법적으로 우선순위가 앞선 선순위 세입자가 됩니다.
                  <br />
                  이럴 경우 보증금 피해 시, 전세입자의 보증금이 먼저 보호됩니다.
                </span>
              </div>
            </div>
          </CheckCard>
        </div>
      </section>
      <div
        class="h-0 w-full outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-400"
      ></div>
      <section class="mt-[80px]">
        <div class="mb-[34px] font-['Pretendard'] text-4xl font-bold leading-[58px] text-blue-500">
          등기부등본 위조 확인 TIP
        </div>
        <div class="flex flex-col gap-[44px]">
          <CheckTipBox check-num="1">
            <div class="w-[634px] justify-start">
              <div class="font-['Pretendard'] text-3xl font-normal leading-[50px] text-zinc-900">
                등기부등본은 말소된 내역이 포함된
              </div>
              <span class="font-['Pretendard'] text-3xl font-semibold leading-[50px] text-blue-500">
                등기사항 전부 증명서 유형
              </span>
              <span class="font-['Pretendard'] text-3xl font-normal leading-[50px] text-zinc-900">
                으로 발급 받아야합니다.
              </span>
            </div>
          </CheckTipBox>

          <CheckTipBox check-num="2">
            <div
              class="justify-start font-['Pretendard'] text-3xl font-normal leading-[50px] text-zinc-900"
            >
              가압류, 가처분, 가등기, 근저당권 등에 대해 말소된
              <br />
              내역을 찾아야 합니다.
            </div>
          </CheckTipBox>

          <CheckTipBox check-num="3">
            <div class="w-[634px] justify-start">
              <div
                class="justify-start font-['Pretendard'] text-3xl font-normal leading-[50px] text-zinc-900"
              >
                말소된 이력에 대해 임대인에게 채권자로부터 채권변제
                <br />
                확인서 발급을 꼭 요청해야합니다.
              </div>
            </div>
          </CheckTipBox>

          <CheckTipBox check-num="4">
            <div class="w-[634px] justify-start">
              <div class="justify-start whitespace-nowrap">
                <span class="font-['Pretendard'] text-3xl font-normal leading-[50px] text-zinc-900">
                  요청을 거부한다면,
                </span>
                <span
                  class="font-['Pretendard'] text-3xl font-semibold leading-[50px] text-blue-500"
                >
                  해당 매물은 피하는 것이 안전
                </span>
                <span class="font-['Pretendard'] text-3xl font-normal leading-[50px] text-zinc-900">
                  합니다.
                </span>
              </div>
            </div>
          </CheckTipBox>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import One from "~/assets/image/checkOne.png";
import Two from "~/assets/image/checkTwo.jpg";
import Three from "~/assets/image/checkThree.jpg";
import Four from "~/assets/image/checkFour.jpg";
import Five from "~/assets/image/checkFive.jpg";
import CheckCard from "./_components/CheckCard.vue";
import CheckTipBox from "./_components/CheckTipBox.vue";
</script>
