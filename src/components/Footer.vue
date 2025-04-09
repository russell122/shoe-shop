<script setup>

import { ref } from 'vue';

const icons = ref([
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram'
]);

</script>

<template>
  <v-footer class="d-flex flex-column" color="" rounded="lg">
    <div class="d-flex w-100 align-center px-4 py-2 footer_wrap">
      <div>
        <strong>Магазин обуви</strong>
      </div>


      <div class="d-flex ga-2 ms-auto footer_wrap-links">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          size="small"
          variant="plain"
        ></v-btn>
      </div>
    </div>

    <div class="px-4 py-2 bg-surface-variant text-center w-100 rounded-lg">
      {{ new Date().getFullYear() }}
    </div>
  </v-footer>
</template>


<style scoped lang="scss">
.footer_wrap {
  @media screen and (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start !important;
  }
}

.footer_wrap-links {
  @media screen and (max-width: 400px) {
    margin-inline-start: 0 !important;
  }
}

.v-footer {
  flex: 0 1 auto !important;
}
</style>
