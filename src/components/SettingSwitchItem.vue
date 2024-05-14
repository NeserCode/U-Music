<script lang="ts" setup>
import Switch from "@presets/Switch.vue"

const switchEnabled = defineModel<boolean>({ required: true })
</script>

<template>
	<div class="setting-switch-item">
		<div class="setting-constants">
			<span class="setting-title">
				<slot name="title"></slot>
			</span>
		</div>

		<div class="setting-operation">
			<Switch v-model:switch="switchEnabled" />
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.setting-switch-item {
	@apply flex items-center justify-center;
}

.setting-constants {
	@apply flex items-center;
}

.setting-title {
	@apply text-sm font-bold;
}

.setting-operation {
	@apply w-16;
}
</style>
