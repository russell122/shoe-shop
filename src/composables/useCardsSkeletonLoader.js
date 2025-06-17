import { ref, watch, computed } from 'vue';
import { preloadImages } from '@/composables/usePreloadImages.js';

export function useCardsSkeletonLoader(cards) {
  const skeletonVisible = ref(true);
  const contentVisible = ref(false);
  const isLoading = ref(false);

  // Вычисляемое свойство для отслеживания готовности всех данных
  const allDataReady = computed(() => {
    return cards.value && cards.value.length > 0;
  });

  const loadImages = async () => {
    if (!allDataReady.value) {
      skeletonVisible.value = true;
      contentVisible.value = false;
      return;
    }

    // Если уже загружается, не запускаем повторно
    if (isLoading.value) {
      return;
    }

    isLoading.value = true;
    skeletonVisible.value = true;
    contentVisible.value = false;

    try {
      // Получаем все уникальные изображения из всех источников
      const allImages = new Set();

      // Добавляем изображения из основных карточек
      if (cards.value) {
        cards.value.forEach(item => {
          if (item.img) allImages.add(item.img);
        });
      }

      const imageUrls = Array.from(allImages);

      if (imageUrls.length > 0) {
        await preloadImages(imageUrls);
      }

      // Небольшая задержка для плавности анимации
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error('Ошибка загрузки изображений карточек:', error);
    } finally {
      skeletonVisible.value = false;
      contentVisible.value = true;
      isLoading.value = false;
    }
  };

  // Следим за изменением любого из массивов данных
  watch([cards], () => {
    loadImages();
  }, { immediate: true, deep: true });

  return {
    skeletonVisible,
    contentVisible,
    isLoading,
    reload: loadImages
  };
} 