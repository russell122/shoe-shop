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

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
const dataPoints = [6, 7, 9, 2, 6, 8, 2];

onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Популярность',
          data: dataPoints,
          borderColor: '#CC0029',
          backgroundColor: 'rgba(0, 123, 255, 0.3)',
          pointBackgroundColor: '#CC0029',
          pointRadius: 4,
          tension: 0,
          borderJoinStyle: 'miter',
          fill: {
            target: 'start',
            above: 'rgba(0, 123, 255, 0.3)'
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          x: {
            title: { display: false },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              padding: 20 // Убираем отступы у меток
            },
            offset: false,
            grid: {
              drawTicks: false,
              drawBorder: false
            },
            afterFit: function(scale) {
              scale.paddingLeft = 0;
              scale.paddingRight = 0;
            }
          },
          y: {
            title: { display: false },
            min: 1,
            max: 10,
            reverse: true,
            ticks: {
              stepSize: 1,
              padding: 20 // Убираем отступы у меток
            },
            offset: false,
            grid: {
              drawBorder: false
            }
          }
        },
        layout: {
          padding: 0
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
  padding: 5px; /* Минимальный отступ для контейнера */
}

.chart-container canvas {
  display: block;
  width: 100% !important;
  height: auto !important;
  margin: 0;
}
</style>