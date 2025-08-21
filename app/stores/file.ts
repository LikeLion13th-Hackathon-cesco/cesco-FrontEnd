import { defineStore } from "pinia";

export const useFileStore = defineStore("file", {
  state: () => ({
    selectedFile: null as File | null,
    selectedExample: null as string | null,
    // 추가: 고소증
    selectedReportFile: null as File | null,
    selectedReportExample: null as string | null,
  }),

  getters: {
    hasFile: (state) => state.selectedFile !== null || state.selectedExample !== null,
    fileName: (state) => state.selectedFile?.name || state.selectedExample || null,
    // 추가: 고소증
    hasReport: (state) => state.selectedReportFile !== null || state.selectedReportExample !== null,
    reportFileName: (state) =>
      state.selectedReportFile?.name || state.selectedReportExample || null,

    // 둘 다 있어야 신고하기 버튼 활성화
    canSubmit(): boolean {
      return this.hasFile && this.hasReport; // 다른 getter 참조 시 this 사용
    },
  },

  actions: {
    setFile(file: File | null) {
      this.selectedFile = file;
      if (file) {
        this.selectedExample = null; // Clear example when file is set
      }
    },

    setExample(example: string | null) {
      this.selectedExample = example;
      if (example) {
        this.selectedFile = null; // Clear file when example is set
      }
    },
    // 추가
    setReportFile(file: File | null) {
      this.selectedReportFile = file;
      if (file) this.selectedReportExample = null;
    },
    setReportExample(example: string | null) {
      this.selectedReportExample = example;
      if (example) this.selectedReportFile = null;
    },

    clearAll() {
      this.selectedFile = null;
      this.selectedExample = null;
      this.selectedReportFile = null;
      this.selectedReportExample = null;
    },
  },
});
