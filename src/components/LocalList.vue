<script lang="ts" setup>
import { CubeIcon, PhotoIcon } from "@heroicons/vue/24/solid"
import {
	useKeyList,
	useLocalList,
	type LocalList,
} from "@composables/useLocalList"
import { onMounted, ref } from "vue"

const LocalLists = ref<LocalList[]>([])

onMounted(() => {
	useKeyList().value.forEach((key) => {
		const l = useLocalList(key)
		if (l) LocalLists.value.push(l as any)
	})

	console.log(LocalLists.value)
})
</script>

<template>
	<div class="local-list-main" ondragstart="javascript:return false">
		<div class="local-list-header">
			<CubeIcon class="icon" />
			<span class="text">本地歌单</span>
			<span class="list-count"> {{ LocalLists.length ?? 0 }} </span>
		</div>
		<div class="local-list-list" v-if="LocalLists.length > 0">
			<div class="local-list" v-for="list of LocalLists" :key="list.hash!">
				<RouterLink class="cover" :to="`/list/${list.hash}`">
					<img
						v-if="list.profile?.cover"
						:src="list.profile?.cover"
						referrerpolicy="no-referrer"
						alt="Cover"
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
  hover:border-green-600 dark:hover:border-green-600
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
  hover:text-green-600
  transition-colors ease-in-out duration-300;
}
.info .keys {
	@apply text-xs opacity-50 transform -translate-y-0.5;
}
.info .songs-count {
	@apply text-xs opacity-50;
}
</style>
