<script lang="ts" setup>
import SettingSwitchItem from "@components/SettingSwitchItem.vue"
import { ref } from "vue"

const test = ref(true)
</script>

<template>
	<div class="view-setting">
		<div class="setting-header">
			<span class="text">设置</span>
		</div>
		<div class="setting-items">
			<SettingSwitchItem v-model="test">
				<template #title>Test: {{ test }}</template>
			</SettingSwitchItem>
		</div>
	</div>
</template>

<style lang="postcss" scoped></style>
