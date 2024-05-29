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
	@apply relative w-full md:h-16 lg:h-24 flex justify-center items-center md:gap-4 lg:gap-8
	border-b border-slate-200 dark:border-slate-500
  select-none transition-colors ease-in-out duration-300;
}

.app-top-links .link {
	@apply inline-flex justify-center items-center md:gap-1 md:px-2.5 md:py-0.5 lg:gap-2 lg:py-1 lg:px-3
	md:text-base lg:text-lg
  border-2 rounded border-slate-200 dark:border-slate-400
  hover:border-green-400 dark:hover:border-green-500
  bg-slate-100 dark:bg-slate-500
  outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400
  transition-all ease-in-out duration-300;
}
.link.router-link-exact-active {
	@apply text-sky-600 dark:text-sky-300 border-sky-500 dark:border-sky-400;
}

.icon {
	@apply md:w-4 md:h-4 lg:w-5 lg:h-5;
}
</style>
