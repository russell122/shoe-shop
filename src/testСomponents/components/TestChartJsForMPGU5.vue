<template>
  <!--  <div class="container">-->
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
  <!--  </div>-->
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const data = ref({
  'year': 2023,
  'name_list': [
    {
      'name': 'МИХАИЛМИХАИЛМИХАИЛ',
      'id_name': 123,
      'rank': 1,
      'cnt': 15331,
      'gender': 'M',
      'color': '#3CC755'
    },
    { 'name': 'АННА', 'id_name': 124, 'rank': 1, 'cnt': 14250, 'gender': 'F', 'color': '#FF6384' },
    { 'name': 'АЛЕКСАНДР', 'id_name': 125, 'rank': 2, 'cnt': 17200, 'gender': 'M', 'color': '#36A2EB' },
    { 'name': 'СОФИЯ', 'id_name': 126, 'rank': 2, 'cnt': 5800, 'gender': 'F', 'color': '#242012' },
    { 'name': 'ЛЕВ', 'id_name': 127, 'rank': 3, 'cnt': 1100, 'gender': 'M', 'color': '#9966FF' },
    { 'name': 'МАРИЯ', 'id_name': 128, 'rank': 3, 'cnt': 1000, 'gender': 'F', 'color': '#4BC0C0' }
  ]
});

const chartCanvas = ref(null);
let chartInstance = null;

// Функция для расчета ширины текста
const getTextWidth = (text, font = '13px Arial') => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  return context.measureText(text).width;
};

// Вычисляем максимальную ширину имени
const maxNameWidth = computed(() => {
  const font = '13px Arial';
  const nameWidths = data.value.name_list.map(item => getTextWidth(item.name, font));
  return Math.max(...nameWidths);
});

const chartData = computed(() => {
  const sortedData = [...data.value.name_list].sort((a, b) => b.cnt - a.cnt);

  return {
    labels: sortedData.map(item => item.name),
    datasets: [{
      data: sortedData.map(item => item.cnt),
      backgroundColor: sortedData.map(item => item.color),
      borderColor: '#fff',
      borderWidth: 1,
      categoryPercentage: 0.8,
      barPercentage: 0.9,
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
      enabled: true,
      callbacks: {
        title: function(context) {
          return context[0].label;
        },
        label: function(context) {
          return `Количество: ${context.parsed.x.toLocaleString()}`;
        }
      }
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
        const maxNameLength = Math.max(...context.chart.data.labels.map(label => label.length));
        const screenWidth = window.innerWidth; // ширина экрана

        // Базовые коэффициенты сжатия для разных размеров экрана
        let compressionRates;
        if (screenWidth < 768) { // Мобильные
          compressionRates = {
            long: 0.9,
            medium: 0.4,
            short: 0.4
          };
        } else if (screenWidth < 1200) { // Планшеты
          compressionRates = {
            long: 0.5,
            medium: 0.4,
            short: 0.3
          };
        } else { // Десктопы
          compressionRates = {
            long: 0.9,
            medium: 0.4,
            short: 0.4
          };
        }

        const scaleFactor = Math.max(0.4, 1 - (
          maxNameLength >= 30 ? compressionRates.long :
            maxNameLength >= 20 ? compressionRates.medium :
              compressionRates.short
        ));

        return maxValue / scaleFactor;
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
      const barEnd = bar.x;
      const x = barEnd + 5;
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
  background: #fff;
  border-radius: 8px;
  overflow: visible;
}
</style>