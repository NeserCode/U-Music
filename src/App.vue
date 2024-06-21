<script lang="ts" setup>
import Scrollable from "@frameworks/Scrollable.vue"
import TitleBar from "@frameworks/TitleBar.vue"
import TopLinks from "@frameworks/TopLinks.vue"

import { useAppRounded } from "@composables/useAppRounded"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const $route = useRoute()
const view = ref<HTMLDivElement>()

const application = ref<HTMLDivElement>()
const { listeningRounded } = useAppRounded(application)

onMounted(() => {
	listeningRounded(application)
})
</script>

<template>
	<div class="app-container" ref="application">
		<TitleBar />
		<TopLinks />

		<router-view id="context" v-slot="{ Component }">
			<Scrollable>
				<Transition name="view" mode="out-in" :appear="true">
					<keep-alive :include="['Home', 'List', 'Setting']">
						<component ref="view" :is="Component" :key="$route.fullPath" />
					</keep-alive>
				</Transition>
			</Scrollable>
		</router-view>
	</div>
</template>

<style lang="postcss">
@font-face {
	font-family: "HarmonyOS_Sans_SC";
	src: url("@assets/HarmonyOS_Sans_SC_Regular.ttf") format("truetype");
}

:root {
	color-scheme: light;
	font-size: 16px;
	font-family: "HarmonyOS_Sans_SC";
}

html.dark {
	color-scheme: dark;
}

.view-enter-active,
.view-leave-active {
	@apply transition-all ease-in-out duration-300;
}
.view-enter-from,
.view-leave-to {
	@apply opacity-0;
}

.fade-enter-active,
.fade-leave-active {
	@apply transition-all ease-in-out duration-300;
}
.fade-enter-from,
.fade-leave-to {
	@apply opacity-0 -translate-x-2;
}

/* Keyframes */
@keyframes fade-in {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes fade-out {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}
</style>

<style lang="postcss" scoped>
.app-container {
	@apply relative w-screen h-screen flex flex-col box-border
	border border-slate-400
	bg-slate-50 dark:bg-slate-600
	transition-colors ease-in-out duration-300 overflow-hidden;
}
.app-container.rounded-style {
	@apply rounded-lg;
}

#context {
	height: calc(100vh - 2rem - 6rem - 2px);
	width: calc(100vw - 2px);
}
@media (max-width: 1024px) {
	#context {
		height: calc(100vh - 2rem - 4rem - 2px);
	}
}
</style>
