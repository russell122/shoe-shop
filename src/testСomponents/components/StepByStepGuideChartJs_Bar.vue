<script setup>
	import { reactive } from "vue";

	import { Bar } from 'vue-chartjs';
	import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors);

	const data = [
		{ year: 2010, count: 10 },
		{ year: 2011, count: 20 },
		{ year: 2012, count: 15 },
		{ year: 2013, count: 25 },
		{ year: 2014, count: 22 },
		{ year: 2015, count: 30 },
		{ year: 2016, count: 28 },
	];

	const chartData = reactive({
		labels: data.map(row => row.year),
		datasets: [
			{
				label: 'Acquisitions by year',
				data: data.map(row => row.count)
			}
		]
	})

	const chartOptions = {
		animation: false,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				enabled: false
			}
		}
	}

</script>

<template>
	<div class="container">
		<Bar :data="chartData" :options="chartOptions"/>
	</div>
</template>

<style scoped lang="scss">

</style>
