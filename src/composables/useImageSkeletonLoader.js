import { ref, watch, onMounted } from 'vue';
import { preloadImages } from '@/composables/usePreloadImages.js';

/* getUrl = (item) => item) - это значение по-умолчанию для map, как извлекать*/

export function useImageSkeletonLoader(imageUrlsOrObjects, getUrl = (item) => item) {
  const skeletonVisible = ref(true);
  const contentVisible = ref(false);
  const isLoading = ref(false);

  const loadImages = async () => {
    // Если уже загружается, не запускаем повторно
    if (isLoading.value) {
      return;
    }

    // Если нет данных, показываем скелетон
    if (!imageUrlsOrObjects.value || imageUrlsOrObjects.value.length === 0) {
      skeletonVisible.value = true;
      contentVisible.value = false;
      return;
    }

    isLoading.value = true;
    skeletonVisible.value = true;
    contentVisible.value = false;

    try {
      // Получаем массив url (если передан массив объектов)
      const urls = Array.isArray(imageUrlsOrObjects.value)
        ? imageUrlsOrObjects.value.map(getUrl).filter(Boolean)
        : [];

      if (urls.length > 0) {
        await preloadImages(urls);
      }

      // Небольшая задержка для плавности анимации
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error('Ошибка загрузки изображений:', error);
    } finally {
      skeletonVisible.value = false;
      contentVisible.value = true;
      isLoading.value = false;
    }
  };

  // Следим за изменением массива картинок
  watch(imageUrlsOrObjects, () => {
    loadImages();
  }, { immediate: true });

  // На всякий случай, если нужно вручную вызвать
  onMounted(loadImages);

  return {
    skeletonVisible,
    contentVisible,
    isLoading,
    reload: loadImages
  };
}