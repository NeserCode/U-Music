<script lang="ts" setup>
import Switch from "@presets/Switch.vue"
import { toRefs } from "@vueuse/core"

const switchEnabled = defineModel<boolean>({ required: true })
const switchProps = withDefaults(
	defineProps<{
		disabled?: boolean
	}>(),
	{
		disabled: false,
	}
)
const { disabled } = toRefs(switchProps)
</script>

<template>
	<div class="setting-switch-item">
		<div class="setting-constants">
			<span class="setting-title">
				<slot name="title"></slot>
			</span>
			<span class="setting-tips">
				<slot name="tips"></slot>
			</span>
		</div>

		<div class="setting-operation">
			<Switch v-model:switch="switchEnabled" :disabled="disabled">
				<template #sr-only>
					<slot name="sr-only"></slot>
				</template>
			</Switch>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.setting-switch-item {
	@apply md:w-full lg:w-2/5 h-full flex items-center justify-center py-4 px-4 gap-2
	hover:bg-sky-100 dark:hover:bg-sky-800
	border-2 border-transparent hover:border-sky-200 dark:hover:border-sky-700
	transition-all ease-in-out duration-300
	rounded-md select-none;
}

.setting-constants {
	@apply w-full
	flex flex-col justify-center;
}

.setting-title {
	@apply text-base font-normal;
}
.setting-tips {
	@apply text-sm whitespace-pre-line text-gray-400;
}

.setting-operation {
	@apply w-fit h-full inline-flex items-center justify-center;
}
</style>
