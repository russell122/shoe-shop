<script setup>
import Card from '@/components/Card.vue';

import { useCardsSkeletonLoader } from '@/composables/useCardsSkeletonLoader.js';
import { computed } from 'vue';

const props = defineProps({
  cards: {
    type: Array,
    required: true
  },
  basketCards: {
    type: Array,
    required: false
  },
  bookmarkedCards: {
    type: Array,
    required: false
  }
});

const { skeletonVisible, contentVisible } = useCardsSkeletonLoader(
  computed(() => props.cards || [])
);

</script>

<template>
  <div class="cards">
    <div class="cards__wrap">
      <div v-if="skeletonVisible" v-for="n in 12" :key="'skeleton-' + n">
        <v-skeleton-loader
          width="100%"
          height="100%"
          type="card-avatar, actions"
        ></v-skeleton-loader>
      </div>

      <Card v-if="contentVisible" v-for="card in cards" :key="card.id" :item="card"
            :basketItem="props.basketCards?.find(item => item.uniqueId === card.uniqueId)"
            :bookmarkedItem="props.bookmarkedCards?.find(item => item.uniqueId === card.uniqueId)"
            :skeletonVisible="false" :contentVisible="true" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cards {
  &__wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
}
</style>
