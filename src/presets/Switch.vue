<script lang="ts" setup>
import { computed } from "vue"
import { Switch } from "@headlessui/vue"

const enabled = defineModel<boolean>("switch", {
	default: false,
	required: true,
})
const disabled = defineModel<boolean>("disabled", {
	default: false,
	required: false,
})
const cssEnabled = computed(() => {
	return enabled.value ? "enabled" : "disabled"
})
</script>

<template>
	<Switch
		v-model="enabled"
		:class="cssEnabled"
		class="switch-main"
		:disabled="disabled"
	>
		<span class="sr-only">Use setting</span>
		<span aria-hidden="true" :class="cssEnabled" class="switch-handle" />
	</Switch>
</template>

<style lang="postcss" scoped>
.switch-main {
	@apply relative h-[38px] w-[74px] inline-flex shrink-0
  rounded-full border-2 border-transparent
  transition-colors duration-200 ease-in-out
  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75;
}
.switch-main.enabled {
	@apply bg-teal-900;
}
.switch-main.disabled {
	@apply bg-teal-700;
}

.switch-handle {
	@apply pointer-events-none  w-[34px] h-[34px]
	inline-block transform
	rounded-full bg-white shadow-lg ring-0
	transition ease-in-out duration-300;
}
.switch-handle.enabled {
	@apply translate-x-9;
}
.switch-handle.disabled {
	@apply translate-x-0;
}
</style>
