

<script setup>
import { defineComponent, reactive } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js';

// Регистрация компонентов Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors);

const chartData = reactive({
	labels: ['January', 'February', 'March'],
	datasets: [
		{
			label: 'Example Data',
			// backgroundColor: ['green', 'orange', 'black'],
			// borderColor: 'rgba(75, 192, 192, 1)',
			// borderWidth: 1,
			data: [65, 59, 80],
			maxBarThickness: 50
		},
		{
			label: 'Example Data 2',
			// backgroundColor: ['green', 'orange', 'black'],
			// borderColor: 'rgba(75, 192, 192, 1)',
			// borderWidth: 1,
			data: [65, 59, 80],
			maxBarThickness: 50 // максимальная ширина столбца в графике, есть ещё barThickness
		}
	]
});

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false, // Позволяет графику растягиваться
	plugins: {
		legend: {
			display: true
		},
		colors: {
			enabled: true
		}
	},
	scales: {
		y: {
			beginAtZero: true
		}
	}
};
</script>

<template>
	<div class="chart">
		<div class="container">
			<Bar :data="chartData" :options="chartOptions"></Bar>
		</div>
	</div>
</template>

<style scoped>
	.chart .container{
		height: 765px;
		@media screen and (max-width: 1199px) {
			height: 600px;
		}
		@media screen and (max-width: 992px) {
			height: 500px;
		}
		@media screen and (max-width: 768px) {
			height: 400px;
		}
		@media screen and (max-width: 576px) {
			height: 300px;
		}
	}
</style>
