import { ref, watch, onMounted } from 'vue';
import { preloadImages } from '@/composables/usePreloadImages.js';

/* getUrl = (item) => item) - это значение по-умолчанию для map, как извлекать*/

export function useImageSkeletonLoader(imageUrlsOrObjects, getUrl = (item) => item) {
  const skeletonVisible = ref(true);
  const contentVisible = ref(false);

  const loadImages = async () => {
    skeletonVisible.value = true;
    contentVisible.value = false;

    // Получаем массив url (если передан массив объектов)
    const urls = Array.isArray(imageUrlsOrObjects.value)
      ? imageUrlsOrObjects.value.map(getUrl).filter(Boolean)
      : [];

    if (urls.length > 0) {
      await preloadImages(urls);
    }

    skeletonVisible.value = false;
    contentVisible.value = true;
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
    reload: loadImages
  };
}