<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useModalStore } from "~/stores/modal";
import { Motion, AnimatePresence } from "motion-v";
import XIcon from "~/assets/icon/x.svg";

interface ModalButton {
  label: string;
  variant: "normal" | "destructive" | "dismiss";
  onClick: () => Promise<void>;
  disabled?: boolean;
}

const {
  id,
  size,
  buttons,
  isOpen,
  backdropClose = true,
  showXButton = false,
} = defineProps<{
  id: string;
  size: "large" | "small";
  buttons: ModalButton[] | undefined;
  backdropClose?: boolean;
  isOpen?: boolean;
  showXButton?: boolean;
}>();

const emit = defineEmits(["close"]);
const loadingIndex = ref<number | null>(null);

const modalStore = useModalStore();
const visible = computed(() => isOpen || modalStore.isOpen(id));
const zIndex = computed(() => modalStore.topZIndex(id));

const handleClick = async (btn: ModalButton, index: number) => {
  if (loadingIndex.value !== null) return;
  loadingIndex.value = index;
  try {
    await btn.onClick();
  } finally {
    loadingIndex.value = null;
  }
};

watch(visible, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

const handleBackdropClick = () => {
  emit("close");
};
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <Motion
        v-if="visible"
        :key="'backdrop-' + id"
        tag="div"
        class="fixed inset-0 flex items-center justify-center bg-foreground/40 will-change-transform"
        :style="{ zIndex }"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1, transition: { duration: 0.2 } }"
        :exit="{ opacity: 0, transition: { duration: 0.2 } }"
        @click="backdropClose ? handleBackdropClick() : null"
      >
        <Motion
          :key="'modal-' + id"
          tag="div"
          :class="[
            'relative gap-[30px] rounded-[16px] bg-background will-change-transform',
            size === 'large' ? 'px-[120px] py-[60px]' : 'px-[80px] py-[50px]',
          ]"
          :initial="{ opacity: 0, scale: 0.93 }"
          :animate="{ opacity: 1, scale: 1, transition: { duration: 0.2 } }"
          :exit="{ opacity: 0, scale: 0.93, transition: { duration: 0.2 } }"
          @click.stop
        >
          <button
            v-if="showXButton"
            class="absolute right-[30px] top-[30px]"
            @click="emit('close')"
          >
            <XIcon class="h-[50px] w-[50px]" :font-controlled="false" />
          </button>

          <!-- 실제 모달에 담기는 컨텐츠 -->
          <slot />

          <div v-if="buttons?.length" class="mx-auto mt-[30px] flex gap-[40px]">
            <template v-for="(btn, i) in buttons" :key="i">
              <button
                :class="[
                  'flex items-center justify-center rounded-[10px] px-[80px] py-[20px] text-[26px] font-[600] text-gray-fe',
                  !btn.disabled &&
                    (btn.variant === 'normal'
                      ? 'bg-primary'
                      : btn.variant === 'destructive'
                        ? 'bg-destructive'
                        : 'bg-gray-b4'),
                  buttons.length === 1 ? 'mx-[20px] w-full' : 'flex-1',
                  (btn.disabled || loadingIndex === i) && 'cursor-not-allowed bg-gray-8f',
                ]"
                :disabled="btn.disabled || loadingIndex === i"
                @click="handleClick(btn, i)"
              >
                {{ btn.label }}
              </button>
            </template>
          </div>
        </Motion>
      </Motion>
    </AnimatePresence>
  </Teleport>
</template>
