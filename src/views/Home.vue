<script setup>
	import { storeToRefs } from 'pinia'

	import Slider from '@/components/Slider.vue'
	import { useOtherStore } from '@/stores/other.js'
	import Cards from "@/components/Cards.vue";
	import {onMounted} from "vue";

	const otherStore = useOtherStore();

	const { sliderData, globalLogin, authorised } = storeToRefs(otherStore)

	/**
	 * Проверяем при заходе на сайт авторизован ли уже пользователь, если да то запускается логика authorised
	 */
	onMounted(() => {
		globalLogin.value = localStorage.getItem('login');
		if(globalLogin.value){
			authorised.value = true;
		}
	})

</script>

<template>
	<div class="container">
		<Slider :data="sliderData"/>
		<Cards/>
	</div>
</template>
