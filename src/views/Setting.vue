<script lang="ts" setup>
import SettingSwitchItem from "@components/SettingSwitchItem.vue"
import SettingInputItem from "@components/SettingInputItem.vue"

import { useStorage } from "@vueuse/core"
import { ref } from "vue"
import { useAppRounded } from "@composables/useAppRounded"
import { useDarkMode } from "@composables/useDarkMode"
import { useScrollbar } from "@composables/useScrollbar"
import { useServerConfig } from "@composables/useServerConfig"

const testFlag = useStorage("test-flag", true)
const testInpput = useStorage("test-input", "")
const testTempInput = ref("")

function updateTempInput() {
	testTempInput.value = testInpput.value
}
function updateInput() {
	testInpput.value = testTempInput.value
}

const appTempServer = ref("")
const { server: appServer } = useServerConfig()

function updateTempServer() {
	appTempServer.value = appServer.value
}
function updateServer() {
	appServer.value = appTempServer.value
}

const { isRounded } = useAppRounded()
const { isDarkMode } = useDarkMode()
const { isScrollbarAutoHide } = useScrollbar()
</script>

<template>
	<div class="view-setting">
		<div class="setting-header">
			<span class="text">测试</span>
		</div>
		<div class="setting-items">
			<SettingSwitchItem v-model="testFlag" :disabled="true">
				<template #title>
					<span>开关设置</span>
				</template>
				<template #tips>
					<span>一段用于一个开关设置测试选项的测试文字。</span>
				</template>
				<template #sr-only> Switch Test Item </template>
			</SettingSwitchItem>
			<SettingInputItem :open="updateTempInput" :close="updateInput">
				<template #oTitle>
					<span>输入设置</span>
				</template>
				<template #tips>
					<span>{{ testInpput }}</span>
				</template>
				<template #sr-only> Input Test Item </template>
				<template #btn> 修改 </template>
				<template #title> 输入设置 </template>
				<template #content>
					<span> 修改本选项的提示 </span>
					<input
						type="text"
						v-model="testTempInput"
						class="setting-input-text"
					/>
				</template>
				<template #confirm> 确认 </template>
			</SettingInputItem>
		</div>
		<!-- Application Settings -->
		<div class="setting-header">
			<span class="text">外观</span>
		</div>
		<div class="setting-items">
			<SettingSwitchItem v-model="isRounded">
				<template #title>
					<span>圆角</span>
				</template>
				<template #tips>
					<span>控制应用视窗是否表现圆角。</span>
				</template>
				<template #sr-only> Application Rounded </template>
			</SettingSwitchItem>
			<SettingSwitchItem v-model="isDarkMode">
				<template #title>
					<span>暗黑主题</span>
				</template>
				<template #tips>
					<span>控制应用框架是否切换到暗黑主题。</span>
				</template>
				<template #sr-only> Application Dark Theme </template>
			</SettingSwitchItem>
			<SettingSwitchItem v-model="isScrollbarAutoHide">
				<template #title>
					<span>隐藏滚动条</span>
				</template>
				<template #tips>
					<span>控制应用框架是否自动隐藏滚动条。</span>
				</template>
				<template #sr-only> Scrollbar Auto Hide </template>
			</SettingSwitchItem>
		</div>
		<!-- Server Setting -->
		<div class="setting-header">
			<span class="text">接口</span>
		</div>
		<div class="setting-items">
			<SettingInputItem :open="updateTempServer" :close="updateServer">
				<template #oTitle>
					<span>接口地址</span>
				</template>
				<template #tips>
					<span v-if="!appServer"
						>决定应用使用的 NeteaseCloudMusicApi 位置。</span
					>
					<span v-else>🚀 {{ appServer }}</span>
				</template>
				<template #sr-only> Server Address Item </template>
				<template #btn> 修改 </template>
				<template #title> 修改接口地址 </template>
				<template #content>
					<span>修改后请重启本软件。</span>
					<input
						type="text"
						v-model="appTempServer"
						class="setting-input-text"
					/>
				</template>
				<template #confirm> 确认 </template>
			</SettingInputItem>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.view-setting {
	@apply w-full h-full flex flex-col items-center gap-1 md:px-20 lg:px-40 py-8
	select-none transition-all ease-in-out duration-300;
}

.setting-header {
	@apply sticky w-full h-fit top-0 flex items-center py-4
	text-2xl bg-slate-50 dark:bg-slate-600 font-semibold
	transition-all ease-in-out duration-300 z-50;
}

.setting-items {
	@apply w-full flex md:flex-col lg:flex-row lg:flex-wrap md:gap-2 lg:gap-6 py-4
	transition-all ease-in-out duration-300;
}

/* Input */
.setting-input-text {
	@apply w-full h-fit p-2 my-2
	bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600
	text-slate-700 dark:text-slate-200 selection:bg-sky-200 dark:selection:bg-green-600
	rounded-md transition-all ease-in-out duration-300
	border-2 border-slate-300 dark:border-slate-600
	outline-none;
}
</style>
