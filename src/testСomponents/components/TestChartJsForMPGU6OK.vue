<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';

const props = defineProps({
  data: {
    type: Array,
    default: [],
    required: true
  },
  selectArrYears: {
    type: String,
    default: '',
    required: true
  }
});

Chart.register(...registerables);

const chartCanvas = ref(null);
let chartInstance = null;

const currentYearData = computed(() => {
  const yearData = props.data.find(item => item.year === props.selectArrYears);
  return yearData ? yearData.data : [];
});

const emit = defineEmits(['name-click']);

// Функция для определения, кликнули ли на метку оси Y
const isClickOnYAxisLabel = (event, chart) => {
  if (!chart || !chart.scales.y) return false;

  const yScale = chart.scales.y;
  const rect = chart.canvas.getBoundingClientRect();

  // Получаем позицию и размеры оси Y
  const yAxisLeft = yScale.left;
  const yAxisRight = yScale.right;
  const yAxisTop = yScale.top;
  const yAxisBottom = yScale.bottom;

  // Проверяем, находится ли клик в области оси Y
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return x >= yAxisLeft && x <= yAxisRight && y >= yAxisTop && y <= yAxisBottom;
};

// Функция для определения, на какую метку оси Y кликнули
const getClickedLabelIndex = (event, chart) => {
  if (!chart || !chart.scales.y) return -1;

  const yScale = chart.scales.y;
  const rect = chart.canvas.getBoundingClientRect();
  const y = event.clientY - rect.top;

  // Вычисляем индекс метки на основе позиции клика
  const pixelRange = yScale.bottom - yScale.top;
  const valueRange = yScale.max - yScale.min;
  const relativePosition = (y - yScale.top) / pixelRange;
  const value = yScale.max - relativePosition * valueRange;

  // Округляем до ближайшего целого (индекса)
  return Math.round(value);
};

const handleCanvasClick = (event) => {
  if (!chartInstance) return;

  // Проверяем, кликнули ли на ось Y
  if (isClickOnYAxisLabel(event, chartInstance)) {
    const labelIndex = getClickedLabelIndex(event, chartInstance);

    if (labelIndex >= 0 && labelIndex < currentYearData.value.length) {
      const clickedName = currentYearData.value[labelIndex];
      // console.log('Кликнули на имя:', clickedName.name);
      emit('name-click', clickedName);
    }
  }
};

const updateChart = () => {
  if (!chartCanvas.value || !currentYearData.value.length) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: currentYearData.value.map(item => item.name),
      datasets: [{
        label: 'Количество',
        data: currentYearData.value.map(item => item.cnt),
        backgroundColor: currentYearData.value.map(item => item.color),
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: { topRight: 20, bottomRight: 20, topLeft: 20, bottomLeft: 20 }
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: {
          display: false,
          beginAtZero: true,
          grid: { display: false }
        },
        y: {
          ticks: {
            color: '#13151A',
            font: { size: 14, family: 'Golos' },
            // Делаем метки похожими на кликабельные ссылки
            callback: function(value, index) {
              return currentYearData.value[index]?.name || value;
            }
          },
          grid: { display: false },
          border: { display: false },
          categoryPercentage: 0.8,
          barPercentage: 0.6
        }
      },
      onHover: (event, elements) => {
        const canvas = event.native?.target;
        if (canvas && isClickOnYAxisLabel(event, chartInstance)) {
          canvas.style.cursor = 'pointer';
        } else if (canvas) {
          canvas.style.cursor = 'default';
        }
      }
    }
  });

  // Добавляем обработчик кликов
  if (chartCanvas.value) {
    chartCanvas.value.addEventListener('click', handleCanvasClick);
    chartCanvas.value.style.cursor = 'default';
  }
};

onMounted(() => {
  nextTick(() => {
    updateChart();
  });
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  if (chartCanvas.value) {
    chartCanvas.value.removeEventListener('click', handleCanvasClick);
  }
});

watch([() => props.selectArrYears, currentYearData], () => {
  updateChart();
}, { immediate: true });
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  margin: 0 0 40px 0;
  background: #fff;
  border-radius: 8px;
  padding-left: 80px;
  position: relative;
  height: 300px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6%;
    width: 1px;
    height: 94%;
    background: #E6E9ED;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #E6E9ED;
  }
}

/* Стили для кликабельных меток */
:deep(.chartjs-render-monitor) {
  .chartjs-scale-y {
    .chartjs-tick {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>