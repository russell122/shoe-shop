

<script setup>
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// Регистрация компонентов Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

// Настройка данных для диаграммы с использованием ref
const chartData = ref({
	labels: ['1980', '2021', '1990', '2024'], // Годы
	datasets: [{
		label: 'Александр',
		data: [17, 1, 6, 2],
		backgroundColor: [
			'rgba(75, 192, 192, 0.2)', // Цвет для других годов
			'rgba(255, 99, 132, 0.2)', // Цвет для 2021 года, подчеркивание (так как первое место)
			'rgba(75, 192, 192, 0.2)',
			'rgba(75, 192, 192, 0.2)'
		],
		borderColor: [
			'rgba(75, 192, 192, 1)',
			'rgba(255, 99, 132, 1)', // Подчеркнутый цвет для 2021 года (так как первое место)
			'rgba(75, 192, 192, 1)',
			'rgba(75, 192, 192, 1)'
		],
		borderWidth: 2,
	}]
});

const chartOptions = ref({
	responsive: true,
	scales: {
		y: {
			beginAtZero: false, // Настройка на false позволяет начать с значений из данных
			reverse: true, // Инвертирует ось Y, чтобы меньшее значение было выше
			ticks: {
				stepSize: 0, // тут указать 1 чтобы с 1 места начиналось
				callback: function(value) {
					return `${value} место`;
				}
			}
		}
	}
});
</script>

<template>
	<div class="container">
		<Line :data="chartData" :options="chartOptions"></Line>
	</div>
</template>
