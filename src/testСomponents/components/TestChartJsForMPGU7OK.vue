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

// Генерируем данные
const years = Array.from({ length: 2025 - 1999 + 1 }, (_, i) => 1999 + i);
const dataPoints = years.map(() => Math.floor(Math.random() * 11)); // случайные значения от 0 до 10

onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Популярность',
          data: dataPoints,
          borderColor: '#1C7BFF',
          backgroundColor: 'rgba(28,123,255,0.1)',
          pointBackgroundColor: '#1C7BFF',
          pointRadius: 4,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          x: {
            title: { display: true, text: 'Год' },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            },
            offset: true,
          },
          y: {
            title: { display: false, text: 'Место (полярность)' },
            min: 0,
            max: 10,
            reverse: true, // <-- инвертируем ось: 0 сверху, 10 снизу
            ticks: {
              stepSize: 1
            },
            offset: true,
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
  max-width: 900px;
  margin: 40px 0;
  background: #fff;
  border-radius: 8px;
}
</style>