<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
// import Header2 from '@/components/Header2.vue';
// import Footer from '@/components/Footer.vue';

import { RouterView } from 'vue-router';
import TestChartJs from '@/testСomponents/components/TestChartJs.vue';
import StepByStepGuideChartJs_Bar from '@/testСomponents/components/StepByStepGuideChartJs_Bar.vue';
import RealWorldDataChartJs from '@/testСomponents/components/RealWorldDataChartJs.vue';
import TestChartJsForMPGU from '@/testСomponents/components/TestChartJsForMPGU.vue';
import TestChartJsForMPGU2 from '@/testСomponents/components/TestChartJsForMPGU2.vue';
import TestChartJsForMPGU3 from '@/testСomponents/components/TestChartJsForMPGU3.vue';
import TestChartJsForMPGU4 from '@/testСomponents/components/TestChartJsForMPGU4.vue';
import TestChartJsForMPGU5 from '@/testСomponents/components/TestChartJsForMPGU5.vue';
import TestChartJsForMpgu6Ok from '@/testСomponents/components/TestChartJsForMPGU6OK.vue';
import TestChartJsForMpgu7Ok from '@/testСomponents/components/TestChartJsForMPGU7OK.vue';
import TestChartJsForMpgu7OkTEST from '@/testСomponents/components/TestChartJsForMPGU7OKTEST.vue';
import TestChartJsForMpgu8Ok from '@/testСomponents/components/TestChartJsForMPGU8OK.vue';
import WrapTestChartJsForMPGU2 from '@/testСomponents/components/WrapTestChartJsForMPGU2.vue';

const data = ref({
  'year': 2023,
  'name_list': [
    {
      'name': 'София (Софья)',
      'id_name': 123,
      'rank': 1,
      'cnt': 15331,
      'gender': 'M',
      'color': '#3CC755'
    },
    {
      'name': 'АННА',
      'id_name': 124,
      'rank': 1,
      'cnt': 14250,
      'gender': 'F',
      'color': '#FF6384'
    },
    { 'name': 'АЛЕКСАНДР', 'id_name': 125, 'rank': 2, 'cnt': 9200, 'gender': 'M', 'color': '#36A2EB' },
    { 'name': 'СОФИЯ', 'id_name': 126, 'rank': 2, 'cnt': 5800, 'gender': 'F', 'color': '#242012' },
    { 'name': 'ЛЕВ', 'id_name': 127, 'rank': 3, 'cnt': 1100, 'gender': 'M', 'color': '#9966FF' },
    { 'name': 'МАРИЯ', 'id_name': 128, 'rank': 3, 'cnt': 1000, 'gender': 'F', 'color': '#4BC0C0' }
  ]
});
</script>

<template>
  <!--  <Header />-->
  <!--  <Header2 />-->

  <!--  <TestChartJs />-->
  <!--	<StepByStepGuideChartJs_Bar/>-->
  <!--	<RealWorldDataChartJs/>-->

  <!--  <TestChartJsForMPGU />-->
  <!--  <div class="container">-->
  <!--    <div class="test__wrap">-->
  <!--      <div class="test__left">-->
  <!--        <TestChartJsForMPGU2 />-->
  <!--      </div>-->
  <!--      <div class="test__right">-->
  <!--        <TestChartJsForMPGU2 />-->
  <!--      </div>-->
  <!--    </div>-->

  <!--  </div>-->

  <!--  <div class="container">-->
  <!--    <div class="test__wrap">-->
  <!--      <div class="test__left">-->
  <!--        <TestChartJsForMPGU2 />-->
  <!--      </div>-->
  <!--      <div class="test__right">-->
  <!--        <TestChartJsForMPGU2 />-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  <div class="container">-->
  <!--    <div class="test__wrap">-->
  <!--      <div class="test__left">-->
  <!--        <TestChartJsForMPGU3-->
  <!--          :data="data" />-->
  <!--      </div>-->
  <!--      <div class="test__right">-->
  <!--        <TestChartJsForMPGU3-->
  <!--          :data="data" />-->

  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  <div class="container">-->
  <!--    <div class="test__wrap">-->
  <!--      <div class="test__left">-->
  <!--        <TestChartJsForMPGU4-->
  <!--          :data="data" />-->
  <!--      </div>-->
  <!--      <div class="test__right">-->
  <!--        <TestChartJsForMPGU4-->
  <!--          :data="data" />-->

  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <WrapTestChartJsForMPGU2 />


  <!--  <div class="container">-->
  <!--    <div class="test__wrap">-->
  <!--      <div class="test__left">-->
  <!--        <TestChartJsForMPGU5 />-->
  <!--      </div>-->
  <!--      <div class="test__right">-->
  <!--        <TestChartJsForMPGU5 />-->

  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  <div class="container">-->
  <!--    <TestChartJsForMpgu6Ok />-->
  <!--    <div class="test__wrap">-->
  <!--      <div class="test__left">-->
  <!--        <TestChartJsForMpgu6Ok />-->
  <!--      </div>-->
  <!--      <div class="test__right">-->
  <!--        <TestChartJsForMpgu6Ok />-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->


  <div class="container">
    <TestChartJsForMpgu7OkTEST />
    <TestChartJsForMpgu7Ok />
    <TestChartJsForMpgu8Ok />

    <!--    <div class="test__wrap">-->
    <!--      <div class="test__left">-->
    <!--        <TestChartJsForMpgu7Ok />-->
    <!--      </div>-->
    <!--      <div class="test__right">-->
    <!--        <TestChartJsForMpgu7Ok />-->

    <!--      </div>-->
    <!--    </div>-->
  </div>

  <!--  <div class="container">-->
  <!--    <TestChartJsForMPGU4-->
  <!--      :data="data" />-->
  <!--  </div>-->

  <RouterView />

  <!--  <Footer />-->
</template>

<style scoped lang="scss">
.test__wrap {
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1199px) {
    flex-direction: column;
  }
}

.test__left {
  flex: 0 1 48%;
  @media screen and (max-width: 1199px) {
    flex: 0 1 100%;
  }
}

.test__right {
  flex: 0 1 48%;
  @media screen and (max-width: 1199px) {
    flex: 0 1 100%;
  }
}
</style>
