<template>
  <!--  <div class="container">-->
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
  <!--  </div>-->
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
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

// Подготовка данных для графика
const chartData = computed(() => {
  return {
    labels: props.data.name_list.map(item => item.name),
    datasets: [{
      label: `Количество имен в ${props.data.year}`,
      data: props.data.name_list.map(item => item.cnt),
      backgroundColor: props.data.name_list.map(item => item.color),
      borderColor: props.data.name_list.map(item => item.color),
      borderWidth: 1
    }]
  };
});

const chartOptions = computed(() => ({
  indexAxis: 'y', // Это ключевое изменение для горизонтальных столбцов
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const item = props.data.name_list[context.dataIndex];
          return [
            `Имя: ${item.name}`,
            `Количество: ${item.cnt}`,
            `Ранг: ${item.rank}`,
            `Пол: ${item.gender === 'M' ? 'Мужской' : 'Женский'}`
          ];
        }
      }
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: false,
        text: 'Количество'
      },
      grid: {
        display: false
      },
      ticks: {
        display: false // Убираем цифры на оси X
      }
    },
    y: {
      ticks: {
        mirror: true,
        z: 1,
        color: 'white',
        font: {
          weight: 'bold'
        }
      },
      grid: {
        display: false
      }
    }
  }
}));

const renderChart = () => {
  if (chartRef.value) {
    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(chartRef.value, {
      type: 'bar',
      data: chartData.value,
      options: chartOptions.value
    });
  }
};

watch(
  () => [props.data],
  () => {
    renderChart();
  },
  { deep: true }
);

onMounted(() => {
  renderChart();
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
</style>