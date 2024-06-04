<script setup>
import { storeToRefs } from 'pinia'

import { useOtherStore } from '@/stores/other.js'

const otherStore = useOtherStore();

const { overlay } = storeToRefs(otherStore)

</script>

<template>
	<v-overlay
			:model-value="overlay"
			class="align-center justify-center"
	>
		<v-progress-circular
				color="#3CC755"
				size="64"
				indeterminate
		></v-progress-circular>
	</v-overlay>
</template>

<style scoped lang="scss">

</style>
