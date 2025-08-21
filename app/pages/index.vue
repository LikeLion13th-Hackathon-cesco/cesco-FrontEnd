<script setup lang="ts">
import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore();
</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <NuxtLink to="/hello">Go to Hello</NuxtLink>
    <button class="rounded bg-primary px-4 py-2 text-white" @click="modalStore.open('modal1')">
      모달 1 열기
    </button>

    <!-- Modal 1 -->
    <Modal
      id="modal1"
      size="small"
      :buttons="[
        {
          label: '제출',
          variant: 'normal',
          onClick: async () => modalStore.open('modal2'),
        },
        {
          label: '취소',
          variant: 'dismiss',
          onClick: async () => modalStore.close('modal1'),
        },
      ]"
      @close="modalStore.close('modal1')"
    >
      <p>모달 1 내용입니다.</p>
    </Modal>

    <!-- Modal 2 (Modal 1 안에서 열 수 있음) -->
    <Modal
      id="modal2"
      size="large"
      :buttons="[
        {
          label: 'PLUS 서비스 이용하기',
          variant: 'normal',
          onClick: async () => modalStore.close('modal2'),
        },
      ]"
      :show-x-button="true"
      @close="modalStore.close('modal2')"
    >
      <p>모달 2 내용 (중첩 가능)</p>
    </Modal>
  </div>
</template>
