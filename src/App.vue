<script setup>

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import MobileNavigation from '@/components/MobileNavigation.vue';

import { RouterView } from 'vue-router';

import { useOtherStore } from '@/stores/other.js';
import { useUiStore } from '@/stores/uiStore.js';
import { useMobileNavigation } from '@/composables/useMobileNavigation';
import { useDataSync } from '@/composables/useDataSync.js';

import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

const otherStore = useOtherStore();
const uiStore = useUiStore();

const {
  globalLogin,
  authorised,
  dataRetrievalError,
  transitionDataRetrievalError,
  basketsData,
  bookmarkedData
} = storeToRefs(otherStore);
const { updateDisplayedItems } = otherStore;

const { overlay } = storeToRefs(uiStore);
const { isMobile, basketOverlay } = useMobileNavigation();
const { isMobile, overlay, basketsData, bookmarkedData } = useDataSync;

import { useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import Basket from '@/components/Basket.vue';

const router = useRouter();


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
