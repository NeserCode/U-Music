<script lang="ts" setup>
import { useApi } from "@composables/useApi"
import { onMounted } from "vue"

const { getCountriesCodeList } = useApi()

onMounted(async () => {
	const list = await getCountriesCodeList()
	console.log(list)
})
</script>

<template>
	<div class="view-home"></div>
</template>

<style lang="postcss" scoped></style>
