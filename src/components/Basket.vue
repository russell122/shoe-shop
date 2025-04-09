<script setup>
import { storeToRefs } from 'pinia';

import { useOtherStore } from '@/stores/other.js';

const otherStore = useOtherStore();

const { basketsData } = storeToRefs(otherStore);
</script>

<template>
  <div class="basket">
    <h1>Корзина</h1>
    <div>
      <div v-for="basket in basketsData" :key="basket.id">
        <p>{{ basket.title }}</p>
      </div>
    </div>
  </div>

</template>

<style scoped>
.basket {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100001;
  background-color: white;
  width: 500px;
  height: 100%;
}

@media screen and (max-width: 576px) {
  .basket {
    width: 90%;
  }
}
</style>
