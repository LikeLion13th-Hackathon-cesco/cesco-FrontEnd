<script setup lang="ts">
import InfoIcon from "~/assets/icon/info.svg";
import TrashIcon from "~/assets/icon/trash.svg";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface Props {
  onSubmit?: (data: { selectedExample: string | null; selectedFile: File | null }) => Promise<void>;
}

const props = withDefaults(defineProps<Props>(), {
  onSubmit: undefined,
});

const modalStore = useModalStore();

const selectedExample = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const handleFileChange = (e: Event) => {
  const file = (e as HTMLInputEvent).target.files?.[0];
  if (file) {
    selectedFile.value = file;
    selectedExample.value = null; // Clear selected example when file is uploaded
    console.log(file);
  }
};

const handleDeleteFile = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  selectedFile.value = null;
};

const handleExampleSelect = (example: string) => {
  if (selectedExample.value === example) {
    selectedExample.value = null;
  } else {
    selectedExample.value = example;
    selectedFile.value = null; // Clear uploaded file when example is selected
  }
};

const handleSubmit = async () => {
  if (props.onSubmit) {
    await props.onSubmit({
      selectedExample: selectedExample.value,
      selectedFile: selectedFile.value,
    });
  }
};
</script>

<template>
  <Modal
    id="pdf-select"
    size="large"
    :buttons="[
      {
        label: '취소',
        variant: 'dismiss',
        onClick: async () => modalStore.close('pdf-select'),
      },
      {
        label: '제출',
        variant: 'normal',
        onClick: handleSubmit,
        disabled: selectedExample == null && selectedFile == null,
      },
    ]"
    @close="modalStore.close('pdf-select')"
  >
    <InfoIcon :font-controlled="false" filled="false" class="mx-auto h-[80px] w-[80px]" />
    <div class="mt-[30px] flex flex-col gap-[40px]">
      <div>
        <h1 class="text-center text-[32px] font-[600] text-foreground">
          등기부등본 예시 세 가지 중 하나를 선택하여 분석하세요.
        </h1>
        <p class="mt-[15px] text-center text-[24px] font-[400] text-gray-8f">
          심사 편의를 위해 등기부등본 예시를 세 가지 준비했습니다.
          <br />
          이 중 하나를 선택해 주시면 감사하겠습니다.
        </p>
      </div>
      <div class="flex items-center gap-[40px]">
        <img
          src="~/assets/image/pdf-example.png"
          alt="등기부등본 예시 1"
          :class="[
            'h-[220px] w-[220px] cursor-pointer rounded-[10px] object-cover object-top transition duration-100 ease-in-out',
            selectedExample === 'example1' ? 'ring-[5px] ring-primary' : 'ring-1 ring-gray-b4',
          ]"
          @click="handleExampleSelect('example1')"
        />
        <img
          src="~/assets/image/pdf-example.png"
          alt="등기부등본 예시 2"
          :class="[
            'h-[220px] w-[220px] cursor-pointer rounded-[10px] object-cover object-top transition duration-100 ease-in-out',
            selectedExample === 'example2' ? 'ring-[5px] ring-primary' : 'ring-1 ring-gray-b4',
          ]"
          @click="handleExampleSelect('example2')"
        />
        <img
          src="~/assets/image/pdf-example.png"
          alt="등기부등본 예시 3"
          :class="[
            'h-[220px] w-[220px] cursor-pointer rounded-[10px] object-cover object-top transition duration-100 ease-in-out',
            selectedExample === 'example3' ? 'ring-[5px] ring-primary' : 'ring-1 ring-gray-b4',
          ]"
          @click="handleExampleSelect('example3')"
        />
      </div>
      <label
        htmlFor="pdf-upload"
        class="flex w-full cursor-pointer items-center rounded-[10px] px-[32px] py-[28px] ring-[1.5px] ring-gray-b4"
        :class="[selectedFile ? 'justify-between' : 'justify-center']"
      >
        <span
          :class="[
            'overflow-hidden text-ellipsis whitespace-nowrap',
            selectedFile
              ? 'w-96 text-[24px] font-[400] text-foreground'
              : 'text-[28px] font-[600] text-gray-b4',
          ]"
        >
          {{ selectedFile ? selectedFile.name : "직접 파일 불러오기" }}
        </span>
        <TrashIcon
          v-if="selectedFile"
          class="h-[25px] w-[25px] cursor-pointer"
          :font-controlled="false"
          filled="false"
          @click="handleDeleteFile"
        />
      </label>
      <input id="pdf-upload" type="file" class="hidden" @change="handleFileChange" />
    </div>
  </Modal>
</template>
