<script setup>
import { storeToRefs } from 'pinia';

import { useOtherStore } from '@/stores/other.js';

const otherStore = useOtherStore();

const { basketsData } = storeToRefs(otherStore);

const { basketOverlay } = storeToRefs(otherStore);
</script>

<template>


  <v-navigation-drawer
    v-model="basketOverlay"
    temporary
    location="right"
    width="700"
    class="basket"
  >
    <div class="basket__wrap">
      <div class="basket__close">
        <v-icon :icon="'mdi-plus'" @click="basketOverlay = !basketOverlay" />
      </div>
      <h1>Абоба</h1>
      <div v-for="basket in basketsData" :key="basket.id">
        <p>{{ basket.title }}</p>
      </div>
    </div>

  </v-navigation-drawer>


</template>

<style scoped>
@media screen and (max-width: 992px) {
  .basket {
    width: 100% !important;
  }
}
</style>
