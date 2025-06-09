<script setup>
import { ref, watch, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Navigation, Pagination];
const showSkeleton = ref(true);
const showContent = ref(false);

const props = defineProps({
  data: Array,
  contentLoaded: Boolean
});


watch(() => props.contentLoaded, (loaded) => {
  if (loaded) {
    showSkeleton.value = false;
    showContent.value = true;
  } else {
    showContent.value = false;
    showSkeleton.value = true;
  }
}, {
  immediate: true
});

// Инициализация
onMounted(() => {
  if (!props.contentLoaded) {
    showSkeleton.value = true;
  }
});
</script>

<template>
  <div class="swiper__wrap">

    <swiper
      v-if="showSkeleton"
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
      v-if="showContent"
      :modules="modules"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="mySwiper"
    >
      <swiper-slide v-for="slide in props.data" :key="slide.id">
        <img
          :src="slide.url"
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
