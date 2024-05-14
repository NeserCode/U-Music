<script lang="ts" setup>
import TitleBar from "@frameworks/TitleBar.vue"
</script>

<template>
	<div class="app-container">
		<TitleBar />
	</div>
</template>

<style lang="postcss">
:root {
	color-scheme: light;
	font-size: 16px;
}
html.dark {
	color-scheme: dark;
}
</style>

<style lang="postcss" scoped>
.app-container {
	@apply w-full h-screen flex
	border border-slate-400
	bg-slate-50 dark:bg-slate-600
	rounded overflow-hidden
	transition-all ease-in-out duration-300;
}
</style>
