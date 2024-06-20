<script lang="ts" setup>
import { toRefs } from "vue"

import type { PlayListCreatorOrSubscriber } from "@shared"

const $props = defineProps<{
	creator?: PlayListCreatorOrSubscriber
}>()
const { creator } = toRefs($props)
</script>

<template>
	<div class="play-list-creator" v-if="creator">
		<img
			class="icon"
			:src="creator.avatarUrl"
			alt="creator avatar"
			v-if="creator.avatarUrl"
		/>
		<span class="name">{{ creator.nickname }}</span>
	</div>
</template>

<style lang="postcss" scoped>
.play-list-creator {
	@apply w-full inline-flex items-center gap-1 py-1;
}

.icon {
	@apply w-6 h-6
  rounded;
}
.name {
	@apply text-sm;
}
</style>
