<template>
  <div class="mb-[200px] flex flex-col items-center justify-start">
    <div
      class="relative flex h-[371px] w-[896px] flex-col items-center justify-center rounded-[15px] bg-gray-f5 py-[35px]"
    >
      <img src="~/assets/image/checklistIcon.jpg" alt="체크리스트" class="h-[147px] w-[107px]" />
      <div
        class="justify-start px-[40px] py-[20px] text-center text-[32px] font-[600] text-gray-1a"
      >
        부동산 퀴즈 풀고 크레딧 받기
      </div>

      <button
        class="h-[64px] w-[177px] justify-start rounded-[10px] bg-primary text-[28px] font-[500] text-background"
        @click="gotoQuiz"
      >
        퀴즈 풀기
      </button>
    </div>
    <div class="mt-[90px] flex w-[896px] flex-col">
      <section class="mb-[80px]">
        <div class="mb-[60px] text-center">
          <div class="text-[40px] font-[700] leading-[58px] text-primary">잠깐!</div>
          <span class="text-[40px] font-[700] leading-[58px] text-gray-1a">
            집 구하기 전 확인하셨나요?
          </span>
        </div>
        <!-- 카드 그리드 -->
        <div class="mb-[80px] flex justify-center">
          <div class="grid grid-cols-2 items-start gap-x-[70px] gap-y-[50px]">
            <CheckCard card-width="413px" card-height="447px" card-img-height="240px" :img="One">
              <div class="mb-[10px]">
                <span class="text-[24px] font-[600] text-primary">보증보험 가입</span>
                <span class="text-[24px] font-[600] text-gray-1a">가능 여부 확인</span>
              </div>
              <div class="justify-start text-[18px] font-[400] text-gray-1a">
                보증보험을 가입하면 보증금 피해 발생 시
                <br />
                보증금의 일부나 전액을 배상 받을 수 있습니다.
              </div>
            </CheckCard>
            <CheckCard card-width="413px" card-height="447px" card-img-height="240px" :img="Two">
              <div class="mb-[10px]">
                <span class="text-[24px] font-[600] text-primary">중개업자 신원</span>
                <span class="text-[24px] font-[600] text-gray-1a">확인</span>
              </div>
              <div class="justify-start">
                <span class="whitespace-nowrap text-[18px] font-[400] text-primary">
                  국토부 중개사 조회 사이트
                </span>
                <span class="text-[18px] font-[400] text-gray-1a">
                  에서 중개사의 자격
                  <br />
                  여부를 확인해야합니다. 무자격자에게 계약하면
                  <br />
                  법적인 보호를 받지 못할 수 있습니다.
                </span>
              </div>
            </CheckCard>
            <CheckCard card-width="413px" card-height="570px" card-img-height="240px" :img="Three">
              <div class="mb-[10px]">
                <span class="text-[24px] font-[600] text-primary">등기부등본</span>
                <span class="text-[24px] font-[600] text-gray-1a">확인</span>
              </div>
              <div class="justify-start">
                <span class="text-[18px] font-normal text-gray-1a">등기부등본은 부동산 또는</span>
                <span class="text-[18px] font-semibold text-primary">대법원 인터넷등기소</span>
                <span class="text-[18px] font-normal text-gray-1a">
                  를 통해 반드시 확인해야할 정보입니다.
                  <br />
                  실제 집주인이 누구인지 확인하고 근저당이나 압류 여부를 확인할 수 있습니다.
                  <br />
                </span>
                <span class="text-base font-normal text-gray-1a">
                  <br />
                </span>
                <span class="text-[14px] font-[400] text-primary">
                  TIP!
                  <br />
                </span>
                <span class="text-base font-normal text-gray-1a">
                  등기부등본은 변경 가능성이 있기에 입주 전 반드시 한번 더 확인해야합니다!
                </span>
              </div>
            </CheckCard>
            <CheckCard card-width="413px" card-height="570px" card-img-height="240px" :img="Four">
              <div class="mb-[10px]">
                <span class="text-[24px] font-[600] text-primary">확정일자 및 전입신고</span>
                <span class="text-[24px] font-[600] text-gray-1a">가능 여부 확인</span>
              </div>
              <div class="justify-start text-[18px] font-[400] text-gray-1a">
                확정일자와 전입신고가 가능해야지만 보증금을 법적으로 보호할 수 있습니다.
              </div>
              <div class="mt-[25px] justify-start text-[18px] font-[400] text-gray-1a">
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
              <span class="text-[24px] font-[600] text-primary">선순위 계약자</span>
              <span class="text-[24px] font-[600] text-gray-1a">확인</span>
              <div class="mt-[10px] w-[836px] justify-start">
                <span class="text-[18px] font-[400] text-gray-1a">입주하기 전 반드시</span>
                <span class="text-[18px] font-[400] text-primary"></span>
                <span class="text-[18px] font-semibold text-primary">
                  주민센터나 정부24에서 전세입자의 전출 여부를 확인
                </span>
                <span class="text-[18px] font-[400] text-gray-1a">
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
        class="h-0 w-full outline outline-[1.50px] outline-offset-[-0.75px] outline-[#B4B4B4]"
      ></div>
      <section class="mt-[80px]">
        <div class="mb-[34px] text-[40px] font-[700] text-primary">등기부등본 위조 확인 TIP</div>
        <div class="flex flex-col gap-[44px]">
          <CheckTipBox check-num="1">
            <div class="w-[634px] justify-start">
              <div class="text-[32px] font-normal text-gray-1a">
                등기부등본은 말소된 내역이 포함된
              </div>
              <span class="text-[32px] font-semibold text-primary">등기사항 전부 증명서 유형</span>
              <span class="text-[32px] font-normal text-gray-1a">으로 발급 받아야합니다.</span>
            </div>
          </CheckTipBox>

          <CheckTipBox check-num="2">
            <div class="justify-start text-[32px] font-normal text-gray-1a">
              가압류, 가처분, 가등기, 근저당권 등에 대해 말소된
              <br />
              내역을 찾아야 합니다.
            </div>
          </CheckTipBox>

          <CheckTipBox check-num="3">
            <div class="w-[634px] justify-start">
              <div class="justify-start whitespace-nowrap text-[32px] font-normal text-gray-1a">
                말소된 이력에 대해 임대인에게 채권자로부터 채권변제
                <br />
                확인서 발급을 꼭 요청해야합니다.
              </div>
            </div>
          </CheckTipBox>

          <CheckTipBox check-num="4">
            <div class="w-[634px] justify-start">
              <div class="justify-start whitespace-nowrap">
                <span class="text-[32px] font-normal text-gray-1a">요청을 거부한다면,</span>
                <span class="text-[32px] font-semibold text-primary">
                  해당 매물은 피하는 것이 안전
                </span>
                <span class="text-[32px] font-normal text-gray-1a">합니다.</span>
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

useHead({
  title: "체크리스트",
});

const gotoQuiz = () => {
  navigateTo("/quiz");
};
</script>
