<script lang="ts" setup>
import { useRoute } from "vue-router"

const { params } = useRoute()
</script>

<template>
	<div class="view-album">
		Album {{ params.id }}
		<RouterLink to="/artist/123">Artist</RouterLink>
		<RouterLink to="/song">Song</RouterLink>
	</div>
</template>

<style lang="postcss" scoped></style>
