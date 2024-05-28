<script lang="ts" setup>
import { useApi } from "@composables/useApi"
import { onMounted, reactive } from "vue"

const { getCountriesCodeList } = useApi()
const list = reactive({ data: [] })

onMounted(async () => {
	const res = await getCountriesCodeList()
	list.data = res.data.data[0]
	console.log(res, list.data)
})
</script>

<template>
	<div class="view-home">
		<p v-for="item in list.data.countryList" :key="item.code" class="code">
			{{ item.zh }}({{ item.en }}) - {{ item.code }}
		</p>
		<p class="code" v-if="!list.data.countryList">Loading...</p>
	</div>
</template>

<style lang="postcss" scoped>
.code {
	@apply flex justify-center items-center mx-2;
}
</style>
