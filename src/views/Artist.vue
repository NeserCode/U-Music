<script lang="ts" setup>
import { useRoute } from "vue-router"

const { params } = useRoute()
</script>

<template>
	<div class="view-artist">
		Artist {{ params.id }}
		<RouterLink to="/album/123">Album</RouterLink>
		<RouterLink to="/song">Song</RouterLink>
	</div>
</template>

<style lang="postcss" scoped></style>
