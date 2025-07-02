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
const dataPoints = [600, 756, 993, 153, 643, 834, 500];

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
          clip: { left: 20, right: 20, top: false, bottom: false },
          fill: {
            target: 'start',
            above: 'rgba(0, 123, 255, 1)'
          }
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
            // afterFit: function(scale) {
            //   scale.paddingLeft = 0;
            //   scale.paddingRight = 20;
            // }
          },
          y: {
            title: { display: false, text: 'Место (полярность)' },
            suggestedMin: 0,  // Минимальное значение
            suggestedMax: 1000,  // Максимальное значение
            reverse: false,
            ticks: {
              callback: function(value) {
                if (value % 100 === 0) {  // Проверяем, делится ли значение на 100
                  return value;
                }
                return null;  // Иначе не показываем
              },
              stepSize: 100,
              padding: 20,
              color: '#13151A',
              align: 'start',
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