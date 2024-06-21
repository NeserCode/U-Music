<script lang="ts" setup>
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/solid"
import { useRoute } from "vue-router"

import { useConstant } from "@composables/useConstant"
import { computed } from "vue"

const $route = useRoute()
const exception = useConstant().router.alterExceptionRoutes

const isExceptedLink = computed(() => {
	if (!$route.meta.activeLink) return false
	return exception.includes($route.meta.activeLink.name)
})
</script>

<template>
	<Transition name="fade" mode="out-in" :appear="true">
		<RouterLink
			draggable="false"
			class="link"
			:to="$route.meta.activeLink.link"
			v-if="!isExceptedLink && $route.meta.activeLink"
		>
			<AdjustmentsHorizontalIcon class="icon" />
			<span class="text">{{ $route.meta.activeLink.name }}</span>
		</RouterLink>
	</Transition>
</template>

<style lang="postcss" scoped></style>
