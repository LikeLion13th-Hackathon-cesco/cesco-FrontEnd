<template>
  <template v-for="i in 5" :key="i">
    <StarFilledIcon
      v-if="i <= Math.floor(props.rating)"
      :font-controlled="false"
      filled="true"
      :style="{ display: 'inline-block', width: `${props.size}px`, height: `${props.size}px` }"
    />
    <StarHalfIcon
      v-else-if="i === Math.ceil(props.rating) && props.rating % 1 < 1"
      :font-controlled="false"
      filled="false"
      :style="{ display: 'inline-block', width: `${props.size}px`, height: `${props.size}px` }"
    />
    <StarEmptyIcon
      v-else
      :font-controlled="false"
      filled="false"
      :style="{ display: 'inline-block', width: `${props.size}px`, height: `${props.size}px` }"
    />
  </template>
</template>

<script setup lang="ts">
import StarEmptyIcon from "~/assets/icon/star-empty.svg";
import StarFilledIcon from "~/assets/icon/star-filled.svg";
import StarHalfIcon from "~/assets/icon/star-half.svg";

const props = defineProps<{
  rating: number;
  size: number;
}>();
</script>
