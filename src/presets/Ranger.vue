<script lang="ts" setup>
import { computed } from "vue";

const $props = defineProps<{
  total: number;
  current: number;
}>();
const playProgress = computed(
  () => Math.ceil(($props.current / $props.total) * 1000) / 10
);
</script>

<template>
  <div class="ranger-main">
    <span class="track"></span>
    <span class="progress" :style="{ width: `${playProgress}%` }"></span>
    <span class="alter" :style="{ left: `${playProgress}%` }"></span>
  </div>
</template>

<style lang="postcss" scoped>
.ranger-main {
  @apply relative w-full inline-flex flex-col justify-center py-2;
}

.track {
  @apply w-full h-1
  bg-gray-200 dark:bg-gray-700
  transition-all ease-in-out duration-300;
}
.alter {
  @apply absolute left-0 w-4 h-1.5 hover:h-4
  bg-white dark:bg-black border-2 border-slate-400
  box-content rounded-full cursor-grab -translate-x-1/2
  transition-all ease-in-out duration-300;
}
.progress {
  @apply absolute left-0 w-0 h-1
  rounded-full
  bg-green-400
  transition-all ease-linear duration-75;
}
</style>
