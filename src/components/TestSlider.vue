<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Данные
const products = ref([]);
const contentLoaded = ref(false); // Всё загружено (API + картинки)
const error = ref(null);

// Настройки адаптивности
const breakpoints = {
  320: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 3 }
};

// Модули Swiper
const modules = [Navigation, Pagination];

// Загрузка товаров с DummyJSON
const fetchProducts = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=10');
    products.value = response.data.products;

    // Ждём загрузки всех изображений
    await preloadImages();
    contentLoaded.value = true;
  } catch (err) {
    error.value = 'Ошибка загрузки данных: ' + err.message;
    contentLoaded.value = true; // Всё равно показываем контент (без картинок)
  }
};

// Предзагрузка изображений
const preloadImages = () => {
  return Promise.all(
    products.value.map((product) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = product.thumbnail;
        img.onload = resolve;
        img.onerror = resolve; // Если картинка не загрузится — всё равно считаем успехом
      });
    })
  );
};

// Инициализация
onMounted(fetchProducts);
</script>

<template>
  <div class="swiper-container">
    <!-- Скелетоны, пока грузится контент -->
    <swiper
      v-if="!contentLoaded"
      :modules="modules"
      :slides-per-view="3"
      :space-between="30"
      :breakpoints="breakpoints"
    >
      <swiper-slide v-for="n in 3" :key="'skeleton-' + n">
        <v-skeleton-loader
          type="image, heading, text"
          width="100%"
          height="100%"
        />
      </swiper-slide>
    </swiper>

    <!-- Реальные слайды, когда всё загружено -->
    <swiper
      v-else
      :modules="modules"
      :slides-per-view="3"
      :space-between="30"
      navigation
      :pagination="{ clickable: true }"
      :breakpoints="breakpoints"
    >
      <swiper-slide v-for="product in products" :key="product.id">
        <div class="slide-content">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="slide-image"
          />
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-price">${{ product.price }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.swiper-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.slide-content {
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-height: 300px;
}

.slide-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
}

.product-title {
  font-size: 16px;
  margin: 8px 0;
  color: #333;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #4CAF50;
}

/* Анимация "мерцания" для фона картинки */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>