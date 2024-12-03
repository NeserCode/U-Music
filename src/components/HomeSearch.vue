<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const keywords = ref<string>("")
const router = useRouter()

const handleSearch = () => {
	console.log(keywords.value)
}
</script>

<template>
	<form class="home-search" @submit.prevent="handleSearch">
		<input
			class="home-search-body"
			id="home-search"
			type="text"
			placeholder=" "
			v-model="keywords"
		/>
		<label for="home-search" class="home-search-placeholder"> 搜索 </label>
	</form>
</template>

<style lang="postcss" scoped>
.home-search {
	@apply relative flex justify-center items-center w-full py-12;
}

.home-search-placeholder {
	@apply absolute z-10 text-sky-900 dark:text-sky-100
  text-base font-medium
  pointer-events-none opacity-75
  transition-all duration-300 ease-in-out;
}
.home-search-body {
	@apply inline-flex items-center w-1/2 py-1.5 px-2.5
  rounded border-2 border-zinc-500 dark:border-zinc-400
  bg-zinc-100 dark:bg-zinc-700 text-sky-900 dark:text-sky-100
  focus:border-sky-500 dark:focus:border-sky-200
  shadow outline-none
  transition-all duration-300 ease-in-out;
}

.home-search-body:placeholder-shown + .home-search-placeholder {
	@apply animate-pulse;
}
.home-search-body:focus,
.home-search-body:not(:placeholder-shown) {
	@apply translate-y-1/2;
}
.home-search-body:focus + .home-search-placeholder,
.home-search-body:not(:placeholder-shown) + .home-search-placeholder {
	@apply -translate-y-full animate-none opacity-100;
}
</style>
