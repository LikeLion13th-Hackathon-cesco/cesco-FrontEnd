import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    modalStack: [] as string[], // 열린 모달 id 순서대로 저장
  }),

  getters: {
    isOpen: (state) => (id: string) => state.modalStack.includes(id),
    topZIndex: (state) => (id: string) => state.modalStack.indexOf(id) + 1000,
  },

  actions: {
    open(id: string) {
      if (!this.modalStack.includes(id)) this.modalStack.push(id);
    },
    close(id: string) {
      this.modalStack = this.modalStack.filter((modalId) => modalId !== id);
    },
    toggle(id: string) {
      if (this.modalStack.includes(id)) this.close(id);
      else this.open(id);
    },
    closeAll() {
      this.modalStack = [];
    },
  },
});
