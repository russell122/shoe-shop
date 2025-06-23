<script setup>

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import MobileNavigation from '@/components/MobileNavigation.vue';

import { RouterView } from 'vue-router';

import { useOtherStore } from '@/stores/other.js';
import { useUiStore } from '@/stores/uiStore.js';
import { useMobileNavigation } from '@/composables/useMobileNavigation';

import { computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

const otherStore = useOtherStore();
const uiStore = useUiStore();

const {
  globalLogin,
  authorised,
  dataRetrievalError,
  transitionDataRetrievalError,
  productsData,
  basketsData,
  bookmarkedData,
  sliderData
} = storeToRefs(otherStore);
const { updateDisplayedItems } = otherStore;

const { overlay } = storeToRefs(uiStore);
const { isMobile, basketOverlay } = useMobileNavigation();

import { useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import Basket from '@/components/Basket.vue';

const router = useRouter();

import { useDisplay } from 'vuetify';

const { width } = useDisplay();

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

/**
 * Проверяем при заходе на сайт авторизован ли уже пользователь, если да то запускается логика authorised
 */
onMounted(async () => {
  globalLogin.value = getLocalStorage('login');
  if (globalLogin.value) {
    authorised.value = true;
    console.log('Сделали авторизацию');
  }

  console.log(888);

  overlay.value = true;

  try {
    await Promise.all([
      otherStore.getSliderData(),
      otherStore.getProductsData()
    ]);

    if (authorised.value) {
      await Promise.all([
        otherStore.getBasketsData(),
        otherStore.getBookmarkedData()
      ]);
      console.log(666);
    }
    console.log(999);

    updateDisplayedItems();

    if (dataRetrievalError.value) {
      transitionDataRetrievalError.value = true;
      setLocalStorage('transitionDataRetrievalError', transitionDataRetrievalError.value);
      await router.replace({ name: 'dataRetrievalError' });
    } else {
      transitionDataRetrievalError.value = false;
      setLocalStorage('transitionDataRetrievalError', transitionDataRetrievalError.value);
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  } finally {
    overlay.value = false;
  }

});

window.addEventListener('storage', async (event) => {
  if (event.key === 'baskets' || event.key === 'bookmarked') {
    basketsData.value = getLocalStorage('baskets', []);
    bookmarkedData.value = getLocalStorage('bookmarked', []);
  }
});

/**
 * Выход из аккаунта
 */
const logout = async () => {
  authorised.value = null;
  globalLogin.value = '';

  localStorage.clear();
  basketsData.value = [];
  bookmarkedData.value = [];

  basketOverlay.value = false;

  await router.push('/');
};

</script>

<template>
  <v-app>

    <Loader v-if="overlay" fullscreen />

    <template v-else>
      <v-layout class="layout">

        <Header />

        <!-- Мобильное меню -->
        <MobileNavigation v-if="isMobile" @logout="logout" />

        <Basket v-if="basketOverlay" />

        <v-main>
          <RouterView />
        </v-main>

        <Footer />

      </v-layout>
    </template>

  </v-app>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

.layout {
  flex-direction: column;
}

.container {
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1560px;
  width: 100%;
  @media screen and (max-width: 1199px) {
    max-width: 970px;
  }
  @media screen and (max-width: 992px) {
    max-width: 750px;
  }
  @media screen and (max-width: 768px) {
    max-width: none;
  }
}

.img {
  display: block;
  max-width: 100%;
  height: auto;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 0 auto;
  padding: 45px 0;
}

.login input, button {
  margin: 15px 0;
}

.login input, .p-password {
  width: 100%;
}

.login button, .p-float-label {
  width: 50%;
}

.p-float-label label {
  transform: translate(0, -50%);
}

.p-float-label:has(input:focus) label, .p-float-label:has(input.p-filled) label, .p-float-label:has(input:-webkit-autofill) label, .p-float-label:has(textarea:focus) label, .p-float-label:has(textarea.p-filled) label, .p-float-label:has(.p-inputwrapper-focus) label, .p-float-label:has(.p-inputwrapper-filled) label {
  top: -0.01rem;
  font-size: 12px;
}
</style>
