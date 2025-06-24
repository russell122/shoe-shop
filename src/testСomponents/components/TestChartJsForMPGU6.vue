<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const chartCanvas = ref(null);
let chartInstance = null;

// Данные прямо в компоненте
const data = {
  year: 2023,
  name_list: [
    {
      name: 'МИХАИЛ',
      id_name: 123,
      rank: 1,
      cnt: 15331,
      gender: 'M',
      color: '#3CC755'
    },
    { name: 'АННА', id_name: 124, rank: 1, cnt: 14250, gender: 'F', color: '#FF6384' },
    { name: 'АЛЕКСАНДР', id_name: 125, rank: 2, cnt: 17200, gender: 'M', color: '#36A2EB' },
    { name: 'СОФИЯ', id_name: 126, rank: 2, cnt: 5800, gender: 'F', color: '#242012' },
    { name: 'ЛЕВ', id_name: 127, rank: 3, cnt: 1100, gender: 'M', color: '#9966FF' },
    { name: 'МАРИЯ', id_name: 128, rank: 3, cnt: 1000, gender: 'F', color: '#4BC0C0' }
  ]
};

onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: data.name_list.map(item => item.name),
        datasets: [{
          label: 'Количество',
          data: data.name_list.map(item => item.cnt),
          backgroundColor: data.name_list.map(item => item.color),
          borderColor: '#fff',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y', // Горизонтальная диаграмма
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 700px;
  margin: 40px 0;
  background: #fff;
  border-radius: 8px;
}
</style>