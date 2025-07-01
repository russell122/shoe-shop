<script setup>
import { ref, computed, watch } from 'vue';
import TestChartJsForMPGU6OK from '@/testСomponents/components/TestChartJsForMPGU6OK.vue';

const arrYearsMen = ref([
  {
    year: 2023,
    data: [
      { name: 'Александр', id_name: 122, cnt: 17200, gender: 'M', color: '#0043BF' },
      { name: 'Михаил', id_name: 123, cnt: 16331, gender: 'M', color: '#0050DB' },
      { name: 'Артем', id_name: 124, cnt: 14250, gender: 'M', color: '#0763ED' },
      { name: 'Илья', id_name: 125, cnt: 13250, gender: 'M', color: '#0763ED' },
      { name: 'Георгий', id_name: 126, cnt: 12000, gender: 'M', color: '#1C7BFF' },
      { name: 'Борис', id_name: 127, cnt: 11000, gender: 'M', color: '#4093FF' },
      { name: 'Василий', id_name: 128, cnt: 10000, gender: 'M', color: '#6EADFF' },
      { name: 'Дмитрий', id_name: 129, cnt: 9000, gender: 'M', color: '#99C7FF' },
      { name: 'Олег', id_name: 130, cnt: 6000, gender: 'M', color: '#C4DFFF' },
      { name: 'Вадим', id_name: 131, cnt: 4000, gender: 'M', color: '#F0F7FF' }
    ]
  },
  {
    year: 2024,
    data: [
      { name: 'Александр', id_name: 122, cnt: 1200, gender: 'M', color: '#0043BF' },
      { name: 'Михаил', id_name: 123, cnt: 3331, gender: 'M', color: '#0050DB' },
      { name: 'Артем', id_name: 124, cnt: 250, gender: 'M', color: '#0763ED' },
      { name: 'Илья', id_name: 125, cnt: 500, gender: 'M', color: '#0763ED' },
      { name: 'Георгий', id_name: 126, cnt: 700, gender: 'M', color: '#1C7BFF' },
      { name: 'Борис', id_name: 127, cnt: 1090, gender: 'M', color: '#4093FF' },
      { name: 'Василий', id_name: 128, cnt: 5621, gender: 'M', color: '#6EADFF' },
      { name: 'Дмитрий', id_name: 129, cnt: 325, gender: 'M', color: '#99C7FF' },
      { name: 'Олег', id_name: 130, cnt: 127, gender: 'M', color: '#C4DFFF' },
      { name: 'Вадим', id_name: 131, cnt: 981, gender: 'M', color: '#F0F7FF' }
    ]
  }
]);

const arrYearsWomen = ref([
  {
    year: 2023,
    data: [
      { name: 'София (Софья)', id_name: 122, cnt: 17200, gender: 'M', color: '#A10020' },
      { name: 'Мария', id_name: 123, cnt: 16331, gender: 'M', color: '#CC0029' },
      { name: 'Анна', id_name: 124, cnt: 14250, gender: 'M', color: '#F23057' },
      { name: 'Алиса', id_name: 125, cnt: 13250, gender: 'M', color: '#FF597A' },
      { name: 'Ева', id_name: 126, cnt: 12000, gender: 'M', color: '#FF8CA3' },
      { name: 'Виктория', id_name: 127, cnt: 11000, gender: 'M', color: '#FFB2C2' },
      { name: 'Полина', id_name: 128, cnt: 10000, gender: 'M', color: '#FFD4DC' },
      { name: 'Варвара', id_name: 129, cnt: 9000, gender: 'M', color: '#FFD4DC' },
      { name: 'Александра', id_name: 130, cnt: 6000, gender: 'M', color: '#FEE4EA' },
      { name: 'Елизавета', id_name: 131, cnt: 4000, gender: 'M', color: '#FFF2F5' }
    ]
  },
  {
    year: 2024,
    data: [
      { name: 'София (Софья)', id_name: 122, cnt: 1200, gender: 'M', color: '#A10020' },
      { name: 'Мария', id_name: 123, cnt: 3331, gender: 'M', color: '#CC0029' },
      { name: 'Анна', id_name: 124, cnt: 250, gender: 'M', color: '#F23057' },
      { name: 'Алиса', id_name: 125, cnt: 500, gender: 'M', color: '#FF597A' },
      { name: 'Ева', id_name: 126, cnt: 700, gender: 'M', color: '#FF8CA3' },
      { name: 'Виктория', id_name: 127, cnt: 1090, gender: 'M', color: '#FFB2C2' },
      { name: 'Полина', id_name: 128, cnt: 5621, gender: 'M', color: '#FFD4DC' },
      { name: 'Варвара', id_name: 129, cnt: 325, gender: 'M', color: '#FFD4DC' },
      { name: 'Александра', id_name: 130, cnt: 127, gender: 'M', color: '#FEE4EA' },
      { name: 'Елизавета', id_name: 131, cnt: 981, gender: 'M', color: '#FFF2F5' }
    ]
  }
]);

const selectArrYears = ref('');
const arrYearsFilter = computed(() => arrYearsMen.value.map(item => item.year));

watch(() => arrYearsMen.value, (newVal) => {
  if (newVal?.length > 0 && !selectArrYears.value) {
    selectArrYears.value = newVal[0].year;
  }
}, { immediate: true });

</script>

<template>
  <div class="container">
    <v-col cols="4">
      <v-select
        label="Год"
        v-model="selectArrYears"
        :items="arrYearsFilter"
        class="pa-2 ma-2"
      ></v-select>
    </v-col>

    <TestChartJsForMPGU6OK :data="arrYearsMen" :selectArrYears="selectArrYears" />
    <TestChartJsForMPGU6OK :data="arrYearsWomen" :selectArrYears="selectArrYears" />
  </div>
</template>

<style scoped lang="scss">

</style>