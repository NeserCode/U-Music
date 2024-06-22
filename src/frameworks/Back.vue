<script lang="ts" setup>
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid"
import { useRouter } from "vue-router"

const $router = useRouter()
</script>

<template>
	<Transition name="fade" mode="out-in" :appear="true">
		<button type="button" class="back" @click="$router.back()">
			<ArrowUturnLeftIcon class="icon" />
		</button>
	</Transition>
</template>

<style lang="postcss" scoped>
.back {
	@apply inline-flex justify-center items-center md:gap-1 md:p-1.5 lg:p-2
	md:text-base lg:text-lg
  border-2 rounded border-slate-200 dark:border-slate-400
  hover:border-green-400 dark:hover:border-green-500
  bg-slate-100 dark:bg-slate-500
  outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400
  transition-all ease-in-out duration-300;
}

.icon {
	@apply md:w-3.5 md:h-3.5 lg:w-4 lg:h-4;
}
</style>
