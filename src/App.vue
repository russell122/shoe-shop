<script setup>

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import { RouterView } from 'vue-router';

import { useOtherStore } from '@/stores/other.js';

import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const otherStore = useOtherStore();

const {
  globalLogin,
  authorised,
  dataRetrievalError,
  transitionDataRetrievalError,
  overlay,
  basketOverlay,
  basketsData,
  bookmarkedData
} = storeToRefs(otherStore);
const { updateDisplayedItems } = otherStore;

import { useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import Basket from '@/components/Basket.vue';

const router = useRouter();

/**
 * Проверяем при заходе на сайт авторизован ли уже пользователь, если да то запускается логика authorised
 */
onMounted(async () => {
  globalLogin.value = localStorage.getItem('login');
  if (globalLogin.value) {
    authorised.value = true;
    console.log('Сделали авторизацию');
  }

  console.log(888);
  await otherStore.getSliderData();
  await otherStore.getProductsData();
  if (authorised.value) {
    await otherStore.getBasketsData();
    localStorage.setItem('baskets', JSON.stringify(basketsData.value));

    await otherStore.getBookmarkedData();
    localStorage.setItem('bookmarked', JSON.stringify(bookmarkedData.value));

    console.log(666);
  } else {
    basketsData.value = JSON.parse(localStorage.getItem('baskets')) ?? [];
    bookmarkedData.value = JSON.parse(localStorage.getItem('bookmarked') ?? []);
  }
  console.log(999);

  updateDisplayedItems();

  if (dataRetrievalError.value) {
    transitionDataRetrievalError.value = true;
    localStorage.setItem('transitionDataRetrievalError', transitionDataRetrievalError.value);
    await router.replace({ name: 'dataRetrievalError' });
  } else {
    transitionDataRetrievalError.value = false;
    localStorage.setItem('transitionDataRetrievalError', transitionDataRetrievalError.value);
  }
});

window.addEventListener('storage', async (event) => {
  if (event.key === 'baskets' || event.key === 'bookmarked') {
    basketsData.value = JSON.parse(localStorage.getItem('baskets')) ?? [];
    bookmarkedData.value = JSON.parse(localStorage.getItem('bookmarked')) ?? [];
  }
});

</script>

<template>
  <v-app>
    <!-- Полноэкранный лоадер -->
    <Loader v-if="overlay" fullscreen />

    <!-- Основной контент -->
    <template v-else>
      <!--      <div class="content">-->
      <!-- Header ДОЛЖЕН быть вне v-main -->
      <Header />

      <v-layout class="layout">

        <v-main>

          <!-- Корзина с оверлеем -->
          <v-overlay
            v-model="basketOverlay"
            class="basket-overlay"
          >
            <Basket v-if="basketOverlay" />
          </v-overlay>


          <!-- Основной контент -->
          <RouterView />
          <Footer />
        </v-main>
      </v-layout>


      <!--      </div>-->
    </template>
  </v-app>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  //position: relative;
  //height: 100%;
  //display: flex;
  //flex-direction: column;
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

.v-main {
  padding-top: 0;
}

.layout {
  padding-top: 80px;
  overflow: auto !important;
  //z-index: 1007 !important;
}

.basket-overlay .v-overlay__content {
  contain: none;
}

.home {
  //flex: 1 1 auto;
}

.v-main {
  display: flex;
  flex-direction: column;
}

.sect {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}
</style>
