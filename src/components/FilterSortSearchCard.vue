<script setup>
	import { ref } from 'vue'

	const filterTypes = ref([
		{type: 'Сначала дешевые', value: 'cheap', id: 1},
		{type: 'Сначала дорогие', value: 'darlings', id: 2},
		{type: 'По алфавиту', value: 'alphabet', id: 3},
	])
	const selectFilterTypes = ref()
</script>

<template>
	<div class="all-shoes__interaction">
		<v-autocomplete
				label="Тип сортировки"
				v-model="selectFilterTypes"
				:items="filterTypes"
				item-title="type"
				item-value="value"
		></v-autocomplete>
	</div>
</template>

<style scoped lang="scss">

</style>
