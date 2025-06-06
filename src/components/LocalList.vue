<script lang="ts" setup>
import Pagination from "@components/Pagination.vue";
import { PhotoIcon } from "@heroicons/vue/24/solid";
import { LocalList, useLocalLists } from "@composables/useLocalList";
import { usePaginationChanges } from "@composables/useComponentsUtils";
import { onMounted, watch, ref, Ref } from "vue";

import type { PaginationPages } from "@shared";

const localLists: Ref<LocalList[]> = ref([]);
const computedLists = useLocalLists();
const localListPages = ref<PaginationPages>({
  total: 0,
  offset: 0,
  limit: 10,
});
const localListChanges = usePaginationChanges(localListPages);

const recentLocalList = new LocalList("recent");

onMounted(() => {
  watch(
    computedLists,
    (lists) => {
      localLists.value = lists;
      localListPages.value.total = localLists.value.length;

      console.log("[Local Lists]", lists);
    },
    { immediate: true }
  );

  if (LocalList.exists("recent"))
    console.log(`[LocalList::Recent]`, recentLocalList);
  else recentLocalList.create();
});
</script>

<template>
  <div class="local-list-main" ondragstart="javascript:return false">
    <div class="local-list-header">
      <span class="text">歌单</span>
      <span class="list-count"> {{ localLists.length ?? 0 }} </span>
    </div>
    <div class="local-list-list" v-if="localLists.length > 0">
      <div class="local-list" v-for="list of localLists" :key="list.hash!">
        <RouterLink class="cover" :to="`/list/${list.hash}`">
          <img
            v-if="list.profile?.cover"
            :src="list.profile?.cover"
            referrerpolicy="no-referrer"
            alt="Cover"
            lazy
          />
          <PhotoIcon v-else class="icon" />
        </RouterLink>
        <span class="info">
          <RouterLink :to="`/list/${list.hash}`" class="title">
            {{ list.profile?.name }}
            <span class="songs-count">{{ list.songs?.length ?? 0 }}</span>
          </RouterLink>
          <span class="keys">{{ list.key }} {{ list.hash }}</span>
        </span>
      </div>
    </div>
    <Pagination
      :pages="localListPages"
      v-if="localLists.length > 0"
      :changes="localListChanges"
    />
    <div
      class="local-list-placeholder local-list-list"
      v-if="localLists.length === 0"
    >
      <span> Nothing Here </span>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.local-list-main {
  @apply flex flex-col justify-center w-full h-full px-6;
}

.local-list-header {
  @apply flex items-center w-full gap-2 mb-4;
}
.local-list-header .icon {
  @apply md:w-6 md:h-6 lg:w-7 lg:h-7
  text-gray-500 dark:text-gray-200
  transition-colors ease-in-out duration-300;
}
.local-list-header .text {
  @apply md:text-lg lg:text-xl;
}
.local-list-header .list-count {
  @apply inline-block
	font-semibold text-sm opacity-50
	transition-colors ease-in-out duration-300;
}

.local-list-list {
  @apply w-full flex items-center flex-wrap gap-2;
}
.local-list {
  @apply relative w-fit flex flex-col justify-center items-center gap-1 px-3 py-1;
}
.local-list .cover {
  @apply w-full md:h-28 lg:h-36 overflow-hidden flex items-center justify-center
  border-2 rounded border-slate-300 dark:border-slate-500
  transition-all ease-in-out duration-300 cursor-pointer;
}
.local-list .cover img {
  @apply w-full h-full object-cover;
}
.local-list .cover .icon {
  @apply w-8 h-8;
}

.local-list .info {
  @apply inline-flex flex-col justify-center;
}
.info .title {
  @apply inline-block md:w-28 lg:w-36 text-sm
  transition-colors ease-in-out duration-300;
}
.info .keys {
  @apply text-xs opacity-50 transform -translate-y-0.5;
}
.info .songs-count {
  @apply text-xs opacity-50;
}

.local-list:hover .cover,
.local-list:hover .info .title {
  @apply text-green-500 border-green-500;
}

.local-list-placeholder {
  @apply inline-block px-8 pb-4
	font-black opacity-40;
}
</style>
