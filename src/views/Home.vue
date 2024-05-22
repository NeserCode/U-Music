<script lang="ts" setup>
import { useApi } from "@composables/useApi"
import { onMounted, reactive } from "vue"

const { getCountriesCodeList } = useApi()
const list = reactive({ data: [] })

onMounted(async () => {
	list.data = (await getCountriesCodeList()).data?.data[0]
	console.log(list.data)
})
</script>

<template>
	<div class="view-home">
		<span v-for="item in list.data.countryList" :key="item.code" class="code">
			{{ item.zh }}({{ item.en }}) - {{ item.code }}
		</span>
		<span class="code" v-if="!list.data.countryList">Loading...</span>
	</div>
</template>

<style lang="postcss" scoped>
.code {
	@apply inline-flex justify-center items-center mx-2;
}
</style>
