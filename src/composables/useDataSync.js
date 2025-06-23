import { computed, watch, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
import { useMobileNavigation } from '@/composables/useMobileNavigation.js';
import { storeToRefs } from 'pinia';
import { useOtherStore } from '@/stores/other.js';
import { useUiStore } from '@/stores/uiStore.js';
import { getLocalStorage } from '@/utils/localStorage.js';

export function useDataSync() {
  const { width } = useDisplay();
  const { isMobile } = useMobileNavigation();
  const otherStore = useOtherStore();
  const uiStore = useUiStore();
  const { productsData, sliderData, basketsData, bookmarkedData } = storeToRefs(otherStore);
  const { overlay } = storeToRefs(uiStore);

  /* Общий наблюдатель за всеми данными необходимыми для приложения, если все загружены офнем оверлей */

  const allDataReady = computed(() => {
    return productsData.value && productsData.value.length > 0 &&
      sliderData.value && sliderData.value.length > 0;
  });

  watch(width, (newValue) => {
    isMobile.value = newValue;
  }, {
    immediate: true
  });

  watch(allDataReady, (ready) => {
    if (ready) {
      setTimeout(() => {
        overlay.value = false;
      }, 300);
    }
  }, { immediate: true });


  onMounted(async () => {
    window.addEventListener('storage', async (event) => {
      if (event.key === 'baskets' || event.key === 'bookmarked') {
        basketsData.value = getLocalStorage('baskets', []);
        bookmarkedData.value = getLocalStorage('bookmarked', []);
      }
    });
  });

  return {
    isMobile,
    overlay,
    basketsData,
    bookmarkedData
  };

}