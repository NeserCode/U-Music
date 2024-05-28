<script lang="ts" setup>
import { useValues } from "@composables/useValues"
import { onMounted } from "vue"

const { countriesCodeListUpdater } = useValues()
onMounted(async () => {
	await countriesCodeListUpdater()
})
</script>

<template>
	<div class="view-home">
		<RouterLink to="/list/123">List</RouterLink>
		<RouterLink to="/artist/123">Artist</RouterLink>
		<RouterLink to="/album/123">Album</RouterLink>
		<RouterLink to="/song">Song</RouterLink>
	</div>
</template>

<style lang="postcss" scoped></style>
