<script setup>
import { storeToRefs } from 'pinia';

import Slider from '@/components/Slider.vue';
import AllShoes from '@/components/AllShoes.vue';
import TestSlider from '@/components/TestSlider.vue';

import { useOtherStore } from '@/stores/other.js';
import { useRouter } from 'vue-router';

const otherStore = useOtherStore();

const { sliderData } = storeToRefs(otherStore);

const router = useRouter();

</script>

<template>
  <div class="home">
    <div class="container">
      <Slider :data="sliderData" />
      <AllShoes />
      <!--      <TestSlider />-->
    </div>
  </div>
</template>
