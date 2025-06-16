<template>
  <div class="container">
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const data = ref({
  'year': 2023,
  'name_list': [
    { 'name': 'МИХАИЛ', 'id_name': 123, 'rank': 1, 'cnt': 15331, 'gender': 'M', 'color': '#3CC755' },
    { 'name': 'АННА', 'id_name': 124, 'rank': 1, 'cnt': 14250, 'gender': 'F', 'color': '#FF6384' },
    { 'name': 'АЛЕКСАНДР', 'id_name': 125, 'rank': 2, 'cnt': 13200, 'gender': 'M', 'color': '#36A2EB' },
    { 'name': 'СОФИЯ', 'id_name': 126, 'rank': 2, 'cnt': 12800, 'gender': 'F', 'color': '#242012' },
    { 'name': 'ЛЕВ', 'id_name': 127, 'rank': 3, 'cnt': 11500, 'gender': 'M', 'color': '#9966FF' },
    { 'name': 'МАРИЯ', 'id_name': 128, 'rank': 3, 'cnt': 11000, 'gender': 'F', 'color': '#4BC0C0' }
  ]
});

const chartCanvas = ref(null);
let chartInstance = null;

const chartData = computed(() => {
  const sortedData = [...data.value.name_list].sort((a, b) => b.cnt - a.cnt);

  return {
    labels: sortedData.map(item => item.name),
    datasets: [{
      data: sortedData.map(item => item.cnt),
      backgroundColor: sortedData.map(item => item.color), // Берем цвет из данных
      borderColor: '#fff',
      borderWidth: 1,
      categoryPercentage: 0.6,
      barPercentage: 1,
      borderRadius: 4
    }]
  };
});

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    }
  },
  scales: {
    x: {
      display: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: false,
        drawTicks: false
      },
      ticks: {
        display: false
      },
      max: function(context) {
        const maxValue = Math.max(...context.chart.data.datasets[0].data);
        return maxValue * 1.1;
      }
    },
    y: {
      display: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: false,
        drawTicks: false
      },
      ticks: {
        display: false
      }
    }
  }
};

const rightLabelsPlugin = {
  id: 'rightLabels',
  afterDatasetsDraw(chart) {
    const { ctx, data, chartArea: { top, bottom, left, right } } = chart;
    const meta = chart.getDatasetMeta(0);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = '13px Arial';

    meta.data.forEach((bar, index) => {
      const label = data.labels[index];
      const x = bar.x + 15;
      const y = bar.y;

      ctx.fillStyle = '#555';
      ctx.fillText(label, x, y);
    });
  }
};

const initChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  if (chartCanvas.value) {
    Chart.register(rightLabelsPlugin);

    chartInstance = new Chart(chartCanvas.value, {
      type: 'bar',
      data: chartData.value,
      options: chartOptions,
      plugins: [rightLabelsPlugin]
    });
  }
};

onMounted(initChart);
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});

watch(chartData, initChart);
</script>

<style scoped>
.chart-container {
  margin: 50px 0;
  position: relative;
  height: 500px;
  min-width: 600px;
  background: #fff;
  border-radius: 8px;
  overflow: visible;
}
</style>