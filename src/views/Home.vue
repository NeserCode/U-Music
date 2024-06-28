<script lang="ts" setup>
import LocalList from "@components/LocalList.vue"
import TopList from "@/components/TopList.vue"
import { useValues } from "@composables/useValues"
import { onDeactivated, onMounted } from "vue"
import { BoundingObserver } from "@composables/useWindow"

const { countriesCodeListUpdater, topListsUpdater } = useValues()
let RO: any = null
onMounted(() => {
	countriesCodeListUpdater()
	topListsUpdater()
	RO = new BoundingObserver("home")
	RO?.observe()
})
onDeactivated(() => {
	RO?.disconnect()
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
		<TopList />
	</div>
</template>

<style lang="postcss" scoped>
.view-home {
	@apply h-screen flex gap-1 md:p-4 lg:p-8
	select-none transition-colors ease-in-out duration-300;
}
.links {
	@apply w-full inline-flex justify-center items-center gap-2 py-2;
}
</style>
