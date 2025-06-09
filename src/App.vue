<script setup>

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import { RouterLink, RouterView } from 'vue-router';

import { useOtherStore } from '@/stores/other.js';
import { useUiStore } from '@/stores/uiStore.js';

import { computed, onMounted, ref, watch } from 'vue';
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
  bookmarkedData,
  displayedItems
} = storeToRefs(otherStore);
const { updateDisplayedItems } = otherStore;

const { drawer, overlay, basketOverlay } = storeToRefs(uiStore);

import { useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import Basket from '@/components/Basket.vue';

const router = useRouter();

import { useDisplay } from 'vuetify';

const { width } = useDisplay();

const isMobile = ref();

watch(width, (newValue) => {
  isMobile.value = newValue;

  // if (newValue <= 576) {
  //   isMobile.value = true;
  //   if (basketOverlay.value) {
  //     drawer.value = true;
  //   }
  //   basketOverlay.value = false;
  //
  //
  // } else {
  //   isMobile.value = false;
  //   if (drawer.value) {
  //     basketOverlay.value = true;
  //   }
  //   drawer.value = false;
  // }
}, {
  immediate: true
});

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

    if(authorised.value) {
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
  } catch(error) {
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

const items = ref([
  {
    title: 'Foo',
    value: 'foo'
  },
  {
    title: 'Bar',
    value: 'bar'
  },
  {
    title: 'Fizz',
    value: 'fizz'
  },
  {
    title: 'Buzz',
    value: 'buzz'
  }
]);

const openBasket = () => {
  basketOverlay.value = true;
  drawer.value = !drawer.value;
};

/**
 * Открытие/закрытие меню
 */
const onMenuToggle = (isVisible) => {
  if (!isVisible) {
    setTimeout(updateDisplayedItems, 300); // Задержка столько же сколько и время анимации(open-delay)
  }
};

</script>

<template>
  <v-app>

    <Loader v-if="overlay" fullscreen />

    <template v-else>
      <v-layout class="layout">

        <Header />

        <template v-if="isMobile">
          <v-navigation-drawer
            v-model="drawer"
            temporary
            location="right"
          >
            <!--            <v-list-item>-->
            <!--            </v-list-item>-->

            <!--            <v-list-->
            <!--              :items="items"-->
            <!--            ></v-list>-->

            <v-btn min-width="40" min-height="40" @click="openBasket" ref="basketButton">
              <v-icon size="22">mdi-basket-outline</v-icon>
            </v-btn>

            <router-link to="/about" class="text-decoration-none">
              <v-btn min-width="40" min-height="40">
                <v-icon size="22">mdi-heart-outline</v-icon>
              </v-btn>
            </router-link>

            <v-menu @update:modelValue="onMenuToggle" :open-delay="300">
              <template v-slot:activator="{ props }">
                <v-btn class="c-btn-icon" min-width="40" min-height="40" v-bind="props">
                  <template v-slot:prepend>
                    <p>{{ globalLogin }}</p>
                  </template>
                  <v-icon size="22">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list class="header-list">
                <v-list-item
                  v-for="(item, i) in displayedItems"
                  :key="i"
                >
                  <router-link :to="item.route" @click="item.type === 'exit' ? logout() : '' "
                               class="header__logo-link text-decoration-none">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </router-link>

                </v-list-item>
              </v-list>
            </v-menu>


          </v-navigation-drawer>
        </template>

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
