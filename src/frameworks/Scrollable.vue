<script lang="ts" setup>
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";
import { $bus } from "@/composables/useMitt";
import { nextTick, onMounted } from "vue";

onMounted(() => {
  nextTick(() => {
    $bus.emit("scrollbar-init");
  });
});
</script>

<template>
  <ScrollArea>
    <div class="view-scrollable">
      <slot></slot>
    </div>
  </ScrollArea>
</template>

<style lang="postcss"></style>
