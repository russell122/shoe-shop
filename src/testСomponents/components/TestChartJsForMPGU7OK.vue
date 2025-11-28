<template>
  <div class="chart-scroll-container">
    <div class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const chartCanvas = ref(null);
let chartInstance = null;

// Генерируем данные
// const years = Array.from({ length: 2025 - 1999 + 1 }, (_, i) => 1999 + i);
// const dataPoints = years.map(() => Math.floor(Math.random() * 11)); // случайные значения от 0 до 10

// const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
// const dataPoints = [6, 7, 10, 1, 5, 6, 7, 8, 9, 10, 5, 9, 2, 6, 8, 2];

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2026, 2026, 2026, 2026, 2026, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2026, 2026, 2026, 2026, 2026];
const dataPoints = [6, 7, 9, 2, 10, 8, 1, 3, 3, 3, 3, 3, 3, 6, 7, 9, 2, 10, 8, 1, 3, 3, 3, 3, 3, 3];


// Вычисляем ширину графика в зависимости от количества данных
const chartWidth = computed(() => {
  // Базовая ширина + дополнительное место для каждого элемента
  const baseWidth = 600; // Минимальная ширина графика
  const itemWidth = 80; // Ширина на одну точку данных
  return Math.max(baseWidth, years.length * itemWidth);
});

onMounted(() => {
  if (chartCanvas.value) {
    // Устанавливаем размеры canvas через стили
    chartCanvas.value.style.width = chartWidth.value + 'px';
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
          borderJoinStyle: 'miter',
          clip: { left: 20, right: 20, top: false, bottom: false }
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
.chart-scroll-container {
  width: 100%; /* Фиксированная ширина контейнера */
  max-width: 1560px; /* Такая же ширина как была изначально */
  overflow-x: auto; /* Горизонтальная прокрутка */
  overflow-y: hidden;
  margin: 40px 0;
  background: #fff;
  border-radius: 8px;
  position: relative;
  height: 450px; /* Фиксированная высота */
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f1f1;
}

.chart-wrapper {
  height: 400px;
  position: relative;
  /* Ширина будет установлена через canvas */
}

/* УБИРАЕМ ВСЕ СТРЕЛКИ В CHROME */
.chart-scroll-container::-webkit-scrollbar {
  height: 8px;
}

.chart-scroll-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
  /* Критически важно - убираем margin */
  margin: 0 !important;
}

.chart-scroll-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.chart-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* ГЛАВНОЕ ПРАВИЛО ДЛЯ УДАЛЕНИЯ СТРЕЛОК */
.chart-scroll-container::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
  background: transparent;
  border: none;
}

/* Альтернативный способ - делаем кнопки нулевого размера */
.chart-scroll-container::-webkit-scrollbar-button:vertical:start:increment,
.chart-scroll-container::-webkit-scrollbar-button:vertical:end:decrement,
.chart-scroll-container::-webkit-scrollbar-button:horizontal:start:increment,
.chart-scroll-container::-webkit-scrollbar-button:horizontal:end:decrement {
  width: 0px;
  height: 0px;
  display: none;
}

/* Для IE */
.chart-scroll-container {
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
</style>