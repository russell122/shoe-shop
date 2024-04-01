<script setup>

import { ref } from 'vue'

	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { Navigation, Pagination } from 'swiper/modules';

	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';

	const modules = ref([Navigation, Pagination]);

	const props = defineProps({
		data: Array
	})

</script>

<template>
	<div class="swiper__wrap">
		<swiper
				:modules="modules"
				:navigation="true"
				:pagination="{
				clickable: true,
			}"
				class="mySwiper"
		>
			<swiper-slide v-for="slide of props.data" :key="slide.id">
				<img :src="slide.url" :alt="slide.alt">
			</swiper-slide>
		</swiper>
	</div>
</template>


<style lang="scss">
	.swiper__wrap{
		padding: 45px 0;
	}
	.mySwiper{
		height: 400px;
		@media screen and (max-width: 768px) {
			height: 250px;
		}
		.swiper-button-prev, .swiper-button-next {
			color: #3CC755;
		}
		.swiper-pagination-bullet-active {
			background: #3CC755;
		}
		img::selection {
			background: transparent;
		}
	}
</style>
