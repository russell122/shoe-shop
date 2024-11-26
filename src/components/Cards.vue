<script setup>
	import Card from "@/components/Card.vue";

	const props = defineProps({
		cards: {
      type: Array,
      required: true,
    },
	})
</script>

<template>
	<div class="cards">
		<div class="container">
			<div class="cards__wrap">
				<Card v-for="card in cards" :key="card.id" :item="card"/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.cards{
		&__wrap{
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 1rem;
		}
	}
</style>
