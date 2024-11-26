<script setup>
	import { RouterView } from 'vue-router'

	import { useOtherStore } from '@/stores/other.js'

	import {onMounted} from "vue";
	import {storeToRefs} from "pinia";

	const otherStore = useOtherStore();

	const { globalLogin, authorised } = storeToRefs(otherStore)

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
	<div class="content">

			<RouterView />

	</div>

</template>

<style lang="scss">
		*,
		*::before,
		*::after { box-sizing: border-box; }
	 #app{
		 display: flex;
		 flex-direction: column;
		 height: 100%;
	 }
	 .content{
		 position: relative;
	 }
	.container{
		margin: 0 auto;
		padding: 0 15px;
		max-width: 1560px;
		width: 100%;
		@media screen and (max-width: 1199px) {
			max-width: 970px;
		}
		@media screen and (max-width: 992px) {
			max-width: 750px;
		}
		@media screen and (max-width: 768px) {
			max-width: none;
		}
	}
	.img{
		display: block;
		max-width: 100%;
		height: auto;
	}
	.login{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 600px;
		margin: 0 auto;
		padding: 45px 0;
	}
	.login input, button {
		margin: 15px 0;
	}
	.login input, .p-password {
		width: 100%;
	}
	.login button, .p-float-label {
		width: 50%;
	}
	.p-float-label label{
		transform: translate(0, -50%);
	}
	.p-float-label:has(input:focus) label, .p-float-label:has(input.p-filled) label, .p-float-label:has(input:-webkit-autofill) label, .p-float-label:has(textarea:focus) label, .p-float-label:has(textarea.p-filled) label, .p-float-label:has(.p-inputwrapper-focus) label, .p-float-label:has(.p-inputwrapper-filled) label{
		top: -0.01rem;
		font-size: 12px;
	}
</style>
