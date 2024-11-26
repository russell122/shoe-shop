<script setup>
	import FilterSortSearchCard from "@/components/FilterSortSearchCard.vue";
	import Cards from "@/components/Cards.vue";

	import { storeToRefs } from 'pinia'

	import { useOtherStore } from '@/stores/other.js'

	const otherStore = useOtherStore();

	const { productsData } = storeToRefs(otherStore)
</script>

<template>
	<div class="all-shoes">
		<div class="container">
			<div class="all-shoes__wrap">
				<div class="all-shoes__descr">
					<h1>Все кроссовки</h1>
				</div>

				<FilterSortSearchCard/>
				<Cards :cards="productsData"/>

			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.all-shoes{
		&__descr{
			margin-bottom: 30px;
			h1{
				font-size: 32px;
				font-weight: 700;
			}
		}
	}
</style>
