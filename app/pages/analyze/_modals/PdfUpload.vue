<script setup lang="ts">
import InfoIcon from "~/assets/icon/info.svg";
import TrashIcon from "~/assets/icon/trash.svg";
import { useFileStore } from "~/stores/file";

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
const fileStore = useFileStore();

const handleFileChange = (e: Event) => {
  const file = (e as HTMLInputEvent).target.files?.[0];
  if (file) {
    fileStore.setFile(file);
    console.log(file);
  }
};

const handleDeleteFile = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  fileStore.setFile(null);
};

const handleExampleSelect = (example: string) => {
  if (fileStore.selectedExample === example) {
    fileStore.setExample(null);
  } else {
    fileStore.setExample(example);
  }
};

const handleSubmit = async () => {
  if (props.onSubmit) {
    await props.onSubmit({
      selectedExample: fileStore.selectedExample,
      selectedFile: fileStore.selectedFile,
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
        disabled: fileStore.selectedExample == null && fileStore.selectedFile == null,
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
            fileStore.selectedExample === 'example1'
              ? 'ring-[5px] ring-primary'
              : 'ring-1 ring-gray-b4',
          ]"
          @click="handleExampleSelect('example1')"
        />
        <img
          src="~/assets/image/pdf-example.png"
          alt="등기부등본 예시 2"
          :class="[
            'h-[220px] w-[220px] cursor-pointer rounded-[10px] object-cover object-top transition duration-100 ease-in-out',
            fileStore.selectedExample === 'example2'
              ? 'ring-[5px] ring-primary'
              : 'ring-1 ring-gray-b4',
          ]"
          @click="handleExampleSelect('example2')"
        />
        <img
          src="~/assets/image/pdf-example.png"
          alt="등기부등본 예시 3"
          :class="[
            'h-[220px] w-[220px] cursor-pointer rounded-[10px] object-cover object-top transition duration-100 ease-in-out',
            fileStore.selectedExample === 'example3'
              ? 'ring-[5px] ring-primary'
              : 'ring-1 ring-gray-b4',
          ]"
          @click="handleExampleSelect('example3')"
        />
      </div>
      <label
        htmlFor="pdf-upload"
        class="flex w-full cursor-pointer items-center rounded-[10px] px-[32px] py-[28px] ring-[1.5px] ring-gray-b4"
        :class="[fileStore.selectedFile ? 'justify-between' : 'justify-center']"
      >
        <span
          :class="[
            'overflow-hidden text-ellipsis whitespace-nowrap',
            fileStore.selectedFile
              ? 'w-96 text-[24px] font-[400] text-foreground'
              : 'text-[28px] font-[600] text-gray-b4',
          ]"
        >
          {{ fileStore.selectedFile ? fileStore.selectedFile.name : "직접 파일 불러오기" }}
        </span>
        <TrashIcon
          v-if="fileStore.selectedFile"
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
