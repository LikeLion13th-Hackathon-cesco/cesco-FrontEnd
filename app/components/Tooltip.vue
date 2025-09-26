<template>
  <div class="relative inline-block">
    <div
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      @focus="showTooltip = true"
      @blur="showTooltip = false"
    >
      <slot />
    </div>

    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showTooltip"
        :class="[
          'absolute z-50 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-2 text-[16px] font-normal text-white shadow-lg',
          'pointer-events-none',
          positionClasses,
        ]"
      >
        {{ content }}
        <div :class="['absolute h-2 w-2 rotate-45 bg-gray-800', arrowClasses]"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  position: "top",
});

const showTooltip = ref(false);

const positionClasses = computed(() => {
  switch (props.position) {
    case "top":
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    case "bottom":
      return "top-full left-1/2 transform -translate-x-1/2 mt-2";
    case "left":
      return "right-full top-1/2 transform -translate-y-1/2 mr-2";
    case "right":
      return "left-full top-1/2 transform -translate-y-1/2 ml-2";
    default:
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
  }
});

const arrowClasses = computed(() => {
  switch (props.position) {
    case "top":
      return "top-full left-1/2 transform -translate-x-1/2 -mt-1";
    case "bottom":
      return "bottom-full left-1/2 transform -translate-x-1/2 -mb-1";
    case "left":
      return "left-full top-1/2 transform -translate-y-1/2 -ml-1";
    case "right":
      return "right-full top-1/2 transform -translate-y-1/2 -mr-1";
    default:
      return "top-full left-1/2 transform -translate-x-1/2 -mt-1";
  }
});
</script>
