<script lang="ts" setup>
import {
	MusicalNoteIcon,
	AdjustmentsHorizontalIcon,
} from "@heroicons/vue/24/solid"
</script>

<template>
	<div class="app-top-links">
		<RouterLink draggable="false" class="link" to="/">
			<MusicalNoteIcon class="icon" />
			<span class="text">音乐</span>
		</RouterLink>
		<RouterLink draggable="false" class="link" to="/setting">
			<AdjustmentsHorizontalIcon class="icon" />
			<span class="text">设置</span>
		</RouterLink>
	</div>
</template>

<style lang="postcss" scoped>
.app-top-links {
	@apply w-full h-16 flex justify-center items-center gap-4
  select-none;
}

.app-top-links .link {
	@apply inline-flex justify-center items-center gap-1 px-2.5 py-0.5
  border-2 rounded border-slate-200 dark:border-slate-400
  hover:border-green-400 dark:hover:border-green-500
  bg-slate-100 dark:bg-slate-500
  outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400
  transition-all ease-in-out duration-300;
}

.link .icon {
	@apply w-4 h-4;
}
</style>
