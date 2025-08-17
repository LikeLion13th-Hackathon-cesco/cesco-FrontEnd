import { defineStore } from "pinia";

export const useFileStore = defineStore("file", {
  state: () => ({
    selectedFile: null as File | null,
    selectedExample: null as string | null,
  }),

  getters: {
    hasFile: (state) => state.selectedFile !== null || state.selectedExample !== null,
    fileName: (state) => state.selectedFile?.name || state.selectedExample || null,
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

    clearAll() {
      this.selectedFile = null;
      this.selectedExample = null;
    },
  },
});
