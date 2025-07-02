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
// const years = Array.from({ length: 2025 - 1999 + 1 }, (_, i) => 1999 + i);
// const dataPoints = years.map(() => Math.floor(Math.random() * 11)); // случайные значения от 0 до 10

// const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
// const dataPoints = [6, 7, 10, 1, 5, 6, 7, 8, 9, 10, 5, 9, 2, 6, 8, 2];

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
const dataPoints = [6, 7, 9, 2, 10, 8, 1];

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
          backgroundColor: 'rgba(28,123,255,0.1)',
          pointBackgroundColor: '#CC0029',
          pointRadius: 4,
          tension: 0,
          borderJoinStyle: 'miter',
          clip: { left: 20, right: 20, top: false, bottom: false }
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
            title: { display: false, text: 'Год' },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              padding: 20,
              color: '#13151A',
              font: {
                size: 14,
                family: 'Golos'
              }
            },
            offset: false,
            grid: {
              drawTicks: false,
              drawBorder: false,
              color: '#E6E9ED'
            }
          },
          y: {
            title: { display: false, text: 'Место (полярность)' },
            min: 1,
            max: 10,
            reverse: true, // <-- инвертируем ось: 0 сверху, 10 снизу
            ticks: {
              stepSize: 1,
              padding: 20,
              color: '#13151A',
              font: {
                size: 14,
                family: 'Golos'
              }
            },
            offset: false,
            grid: {
              drawTicks: false,
              drawBorder: false,
              color: '#E6E9ED'
            }
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