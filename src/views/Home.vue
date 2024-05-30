<script lang="ts" setup>
import LocalList from "@components/LocalList.vue"
import { useValues } from "@composables/useValues"
import { onMounted } from "vue"

const { countriesCodeListUpdater } = useValues()
onMounted(async () => {
	await countriesCodeListUpdater()
})
</script>

<template>
	<div class="view-home">
		<!-- <div class="links">
			<RouterLink to="/list/123">List</RouterLink>
			<RouterLink to="/artist/123">Artist</RouterLink>
			<RouterLink to="/album/123">Album</RouterLink>
			<RouterLink to="/song">Song</RouterLink>
		</div> -->
		<LocalList />
	</div>
</template>

<style lang="postcss" scoped>
.view-home {
	@apply h-screen flex gap-1 md:p-4 lg:p-8
	select-none transition-all ease-in-out duration-300;
}
.links {
	@apply w-full inline-flex justify-center items-center gap-2 py-2;
}
</style>
