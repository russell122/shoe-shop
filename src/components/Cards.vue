<script setup>
import Card from '@/components/Card.vue';

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
</script>

<template>
  <div class="cards">
    <!--		<p>{{props.basketCards}}</p>-->
    <div class="cards__wrap">
      <Card v-for="card in cards" :key="card.id" :item="card"
            :basketItem="props.basketCards?.find(item => item.uniqueId === card.uniqueId)"
            :bookmarkedItem="props.bookmarkedCards?.find(item => item.uniqueId === card.uniqueId)" />
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
