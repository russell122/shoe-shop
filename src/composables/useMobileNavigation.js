import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia';
import { useUiStore } from '@/stores/uiStore';
import { useOtherStore } from '@/stores/other';

export function useMobileNavigation() {
  const { width } = useDisplay();
  const uiStore = useUiStore();
  const otherStore = useOtherStore();

  const { drawer, basketOverlay } = storeToRefs(uiStore);
  const { updateDisplayedItems } = otherStore;

  // Определяем, является ли устройство мобильным
  const isMobile = computed(() => width.value <= 576);

  // Открытие/закрытие корзины
  const openBasket = () => {
    basketOverlay.value = true;
    drawer.value = !drawer.value;
  };

  // Обработка открытия/закрытия меню
  const onMenuToggle = (isVisible) => {
    if (!isVisible) {
      // Задержка для завершения анимации
      setTimeout(updateDisplayedItems, 300);
    }
  };

  // Обработка нажатия Escape
  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      if (basketOverlay.value) {
        basketOverlay.value = false;
      }
      if (drawer.value) {
        drawer.value = false;
      }
    }
  };

  return {
    isMobile,
    drawer,
    basketOverlay,
    openBasket,
    onMenuToggle,
    handleEscapeKey
  };
} 