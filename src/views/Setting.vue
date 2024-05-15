<script lang="ts" setup>
import SettingSwitchItem from "@components/SettingSwitchItem.vue"
import SettingInputItem from "@components/SettingInputItem.vue"

import { useAppRounded } from "@composables/useAppRounded"
import { useDarkMode } from "@composables/useDarkMode"
import { useStorage } from "@vueuse/core"
import { ref } from "vue"

const testFlag = useStorage("test-flag", true)
const testInpput = useStorage("test-input", "")
const testTempInput = ref("")

function updateTempInput() {
	testTempInput.value = testInpput.value
}
function updateInput() {
	testInpput.value = testTempInput.value
}

const { isRounded } = useAppRounded()
const { isDarkMode } = useDarkMode()
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
				<template #title> 修改本选项的提示 </template>
				<template #content>
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
					<span>控制应用框架是否表现圆角。</span>
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
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.view-setting {
	@apply w-full h-full flex flex-col items-center gap-1 md:px-24 lg:px-48
	select-none snap-y snap-mandatory;
}

.setting-header {
	@apply w-full h-fit flex items-center
	text-2xl font-semibold snap-start
	transition-all ease-in-out duration-300;
}

.setting-items {
	@apply w-full h-fit flex md:flex-col lg:flex-row lg:flex-wrap md:gap-2 lg:gap-6 py-4
	snap-start
	transition-all ease-in-out duration-300;
}

/* Input */
.setting-input-text {
	@apply w-full h-fit p-2 my-2
	bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600
	rounded-md transition-all ease-in-out duration-300
	border-2 border-slate-300 dark:border-slate-600
	outline-none;
}
</style>
