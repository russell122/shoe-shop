<script setup>
import { useOtherStore } from '@/stores/other.js'

import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const otherStore = useOtherStore();

const { dataRetrievalError, transitionDataRetrievalError } = storeToRefs(otherStore)

const router = useRouter();

if(!dataRetrievalError.value && localStorage.getItem('transitionDataRetrievalError')){
	router.push('/')
}

</script>

<template>
	<v-empty-state
			headline="Упс, сервис не отвечает"
			title="Попробуйте позже, мы занимаемся устранением неполадки"
			text=""
			image="/destr_cable.jpg"
	></v-empty-state>
</template>

<style lang="scss">

</style>
