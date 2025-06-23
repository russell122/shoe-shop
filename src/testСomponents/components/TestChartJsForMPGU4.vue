<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const chartRef = ref(null);
let chartInstance = null;

const chartData = {
  labels: props.data.name_list.map(item => item.name),
  datasets: [{
    data: props.data.name_list.map(item => item.cnt),
    backgroundColor: props.data.name_list.map(item => item.color),
    borderColor: props.data.name_list.map(item => item.color),
    borderWidth: 1,
    barThickness: 20 // Фиксированная толщина столбцов
  }]
};

const chartOptions = {
  indexAxis: 'y', // Горизонтальные столбцы
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false // Убираем всплывающие подсказки
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: true
      },
      ticks: {
        display: false // Убираем цифры на оси X
      }
    },
    y: {
      grid: {
        display: true
      },
      ticks: {
        mirror: false,
        align: 'center', // Имена по центру строки
        padding: 0, // Отступ от края
        crossAlign: 'near', // Размещаем рядом со столбцом
        font: {
          size: 12
        }
      }
    }
  }
};

const renderChart = () => {
  if (chartRef.value) {
    if (chartInstance) {
      chartInstance.destroy();
    }
    chartInstance = new Chart(chartRef.value, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  }
};

onMounted(renderChart);
onBeforeUnmount(() => chartInstance?.destroy());
watch(() => props.data, renderChart, { deep: true });
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>