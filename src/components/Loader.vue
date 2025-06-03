<script setup>
import { storeToRefs } from 'pinia'

import { useOtherStore } from '@/stores/other.js'
import { useUiStore } from '@/stores/uiStore.js'

const otherStore = useOtherStore();
const uiStore = useUiStore();

const { overlay } = storeToRefs(uiStore);

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
