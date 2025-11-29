<template>
  <div class="chart-wrapper">
    <div ref="scrollContainer" class="chart-scroll-container" data-simplebar>
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';
import SimpleBar from 'simplebar'; // Импортируем конструктор

Chart.register(...registerables);

const chartCanvas = ref(null);
const scrollContainer = ref(null);
let chartInstance = null;
let simpleBarInstance = null;

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040];
const dataPoints = [6, 7, 9, 2, 10, 8, 1, 3, 5, 4, 7, 6, 8, 5, 9, 3, 4, 6, 7, 8, 5, 4];

onMounted(() => {
  // Инициализируем SimpleBar
  if (scrollContainer.value) {
    simpleBarInstance = new SimpleBar(scrollContainer.value, {
      autoHide: false
    });
  }

  if (chartCanvas.value) {
    chartCanvas.value.style.width = `${years.length * 80}px`;
    chartCanvas.value.style.height = '400px';

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
          borderJoinStyle: 'miter'
        }]
      },
      options: {
        responsive: false,
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
              padding: 20,
              color: '#13151A',
              font: { size: 14, family: 'Golos' }
            },
            grid: {
              drawTicks: false,
              drawBorder: false,
              color: '#E6E9ED'
            }
          },
          y: {
            title: { display: false },
            min: 1,
            max: 10,
            reverse: true,
            ticks: {
              stepSize: 1,
              padding: 20,
              color: '#13151A',
              font: { size: 14, family: 'Golos' }
            },
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
  if (simpleBarInstance) {
    simpleBarInstance.unMount();
  }
});
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  max-width: 1560px;
  margin: 40px 0;
  background: #fff;
  border-radius: 8px;
}

.chart-scroll-container {
  height: 450px;
  border-radius: 8px;
}

.chart-container {
  height: 400px;
  padding: 20px;
  width: max-content;
}

/* Исправленные стили для скроллбара */
:deep(.simplebar-track.simplebar-horizontal) {
  position: absolute !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 8px !important;
  background: #f1f1f1 !important;
  border-radius: 0 !important;
}

:deep(.simplebar-track.simplebar-horizontal .simplebar-scrollbar) {
  height: 8px !important;
  top: 0 !important;
  background: #c1c1c1 !important;
  border-radius: 0 !important;
  min-width: 40px !important;
}

:deep(.simplebar-track.simplebar-horizontal .simplebar-scrollbar:hover) {
  background: #a8a8a8 !important;
}

:deep(.simplebar-track.simplebar-horizontal .simplebar-scrollbar:before) {
  display: none !important;
}
</style>