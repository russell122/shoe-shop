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
        // Уберите barThickness, если хотите использовать процентные соотношения
        // barThickness: 20, // <- комментируем или удаляем эту строку
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false, // Важно добавить!
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
            font: { size: 14, family: 'Golos' }
          },
          grid: { display: false },
          border: { display: false },
          // Настройки расстояния между колонками:
          categoryPercentage: 0.8, // Пространство для всей категории (включая отступы)
          barPercentage: 0.6     // Пространство, занимаемое самим баром
        }
      }
    }
  });
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
</style>