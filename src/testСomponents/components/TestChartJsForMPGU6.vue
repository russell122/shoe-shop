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
      color: '#1C7BFF'
    },
    { name: 'АННА', id_name: 124, rank: 1, cnt: 14250, gender: 'F', color: '#4093FF' },
    { name: 'АЛЕКСАНДР', id_name: 125, rank: 2, cnt: 17200, gender: 'M', color: '#6EADFF' },
    { name: 'СОФИЯ', id_name: 126, rank: 2, cnt: 5800, gender: 'F', color: '#99C7FF' },
    { name: 'ЛЕВ', id_name: 127, rank: 3, cnt: 1100, gender: 'M', color: '#C4DFFF' },
    { name: 'МАРИЯ', id_name: 128, rank: 3, cnt: 1000, gender: 'F', color: '#F0F7FF' }
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
          borderRadius: { topRight: 20, bottomRight: 20, topLeft: 20, bottomLeft: 20 }
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