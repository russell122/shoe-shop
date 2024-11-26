<script setup>
	import { storeToRefs } from 'pinia'

	import Slider from '@/components/Slider.vue'
	import AllShoes from "@/components/AllShoes.vue";

	import { useOtherStore } from '@/stores/other.js'
	import {watch} from "vue";
	import {useRouter} from "vue-router";

	const otherStore = useOtherStore();

	const { sliderData, dataRetrievalError } = storeToRefs(otherStore)

	const router = useRouter();

	watch(
			() => dataRetrievalError.value,
			(newValue) => {
				if(newValue){
					router.push('/dataRetrievalError')
				}
			},
	);



</script>

<template>
	<div class="home">
		<div class="container">
				<Slider :data="sliderData"/>
				<AllShoes/>
		</div>
	</div>
</template>
