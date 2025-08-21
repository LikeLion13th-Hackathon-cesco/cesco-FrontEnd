<template>
  <div
    class="flex items-center gap-[20px] rounded-[15px] border-[1.5px] border-gray-d9 bg-background px-[60px] py-[25px]"
  >
    <AchievementCircleChecked
      v-if="props.completed"
      class="h-[49px] w-[49px]"
      :font-controlled="false"
      filled="false"
    />
    <AchievementCircleEmpty
      v-else
      :font-controlled="false"
      filled="false"
      class="h-[49px] w-[49px]"
    />
    <span class="text-[32px] font-[500] text-foreground">
      <span :class="props.completed ? 'text-primary' : ''">{{ props.achievement }}</span>
      작성
    </span>
    <span
      :class="[
        'ml-auto text-[32px] font-[400]',
        props.completed ? 'text-foreground' : 'text-gray-b4',
      ]"
    >
      크레딧 {{ props.credit.toLocaleString() }} P
    </span>
  </div>
</template>

<script setup lang="ts">
import AchievementCircleEmpty from "~/assets/icon/achievement-circle-empty.svg";
import AchievementCircleChecked from "~/assets/icon/achievement-circle-checked.svg";

const props = defineProps<{
  achievement: string;
  credit: number;
  completed: boolean;
}>();
</script>
