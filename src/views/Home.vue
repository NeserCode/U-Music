<script lang="ts" setup>
import HomeSearch from "@/components/HomeSearch.vue";
import LocalList from "@components/LocalList.vue";
import TopList from "@/components/TopList.vue";
import { useValues } from "@composables/useValues";
import { onMounted } from "vue";

const { countriesCodeListUpdater, topListsUpdater } = useValues();
let RO: any = null;
onMounted(() => {
  countriesCodeListUpdater();
  topListsUpdater();
});
</script>

<template>
  <div class="view-home">
    <HomeSearch />
    <LocalList />
    <TopList />
  </div>
</template>

<style lang="postcss" scoped>
.view-home {
  @apply h-[516px] flex flex-col gap-1 md:p-4 lg:p-8
	select-none transition-colors ease-in-out duration-300;
}
.links {
  @apply w-full inline-flex justify-center items-center gap-2 py-2;
}
</style>
