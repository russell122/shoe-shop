<script setup>
import {ref, onMounted, computed} from 'vue';
import axios from "axios";

import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors);

const chartData = ref([]);

const data = computed(() => ({
	labels: chartData.value.map(row => row.year),
	datasets: [
		{
			label: 'Acquisitions by year',
			data: chartData.value.map(row => row.count)
		}
	]
}))

const getChartData = async () => {
	try {
		const { data } = await axios.get('https://7402571ecc17c5c9.mokky.dev/chart-data');

		chartData.value = data;

	} catch (error) {
		console.log(error);
	}
}


onMounted( () => {
	getChartData();
});
</script>

<template>
	<Bar :data="data" />
</template>

<style scoped lang="scss">

</style>
