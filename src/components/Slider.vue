<script setup>
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Navigation, Pagination];

import { useImageSkeletonLoader } from '@/composables/useImageSkeletonLoader.js';

const props = defineProps({
  data: Array
});

/* (item) => item.img это просто колбэк-иструкция, в useImageSkeletonLoader в map он извлечет item.img*/

const { skeletonVisible, contentVisible } = useImageSkeletonLoader(
  computed(() => props.data || []),
  (item) => item.img
);
</script>

<template>
  <div class="swiper__wrap">

    <swiper
      v-if="skeletonVisible"
      :modules="modules"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="mySwiper"
    >
      <swiper-slide v-for="n in 3" :key="'skeleton-' + n">
        <v-skeleton-loader
          type="image"
          width="100%"
          height="100%"
        />
      </swiper-slide>
    </swiper>

    <swiper
      v-if="contentVisible"
      :modules="modules"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="mySwiper"
    >
      <swiper-slide v-for="slide in props.data" :key="slide.id">
        <img
          :src="slide.img"
          :alt="slide.alt"
          height="100%"
        >
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss">
.swiper__wrap {
  padding: 0 0 45px 0;
}

.mySwiper {
  height: 600px;
  @media screen and (max-width: 768px) {
    height: 400px;
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

  .v-skeleton-loader__image {
    height: 100%;
  }
}
</style>
