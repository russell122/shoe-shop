<script setup>
	import { storeToRefs } from 'pinia'

	import Slider from '@/components/Slider.vue'
	import { useOtherStore } from '@/stores/other.js'
	import Cards from "@/components/Cards.vue";

	const otherStore = useOtherStore();

	const { sliderData } = storeToRefs(otherStore)

</script>

<template>
	<div class="container">
		<Slider :data="sliderData"/>
		<Cards/>
	</div>
</template>
