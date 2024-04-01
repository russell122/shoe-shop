<script setup>
	import { ref } from 'vue'
	import Dropdown from 'primevue/dropdown';

	const filterTypes = ref([
		{type: 'Сначала дешевые', value: 'cheap'},
		{type: 'Сначала дорогие', value: 'darlings'},
	])
	const selectFilterTypes = ref()

</script>

<template>
	<div class="cards">
		<div class="container">
			<div class="cards__wrap">
				<div class="cards__descr">
					<h3>Все кроссовки</h3>
				</div>
				<div class="cards__interaction">
					<Dropdown v-model="selectFilterTypes" :options="filterTypes" optionLabel="type" placeholder="Тип сортировки" class="w-full md:w-14rem" />
					{{selectFilterTypes}}
				</div>
			</div>
		</div>
	</div>
</template>
