import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { resolve } from 'chart.js/helpers';
import { API_ENDPOINTS } from '@/config';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

import { useUiStore } from '@/stores/uiStore.js';

const uiStore = useUiStore();

const { overlay } = storeToRefs(uiStore);

export const useOtherStore = defineStore('other', () => {

  const sliderData = ref([]);
  const productsData = ref([]);
  const basketsData = ref(getLocalStorage('baskets', []));
  const bookmarkedData = ref(getLocalStorage('bookmarked', []));
  const authorised = ref(null);
  const globalLogin = ref();
  const user_id = ref();
  const dataRetrievalError = ref(false);
  const transitionDataRetrievalError = ref(false);
  const headerMenuItems = ref([
    {
      title: 'Вход',
      value: 'Вход',
      type: 'inlet',
      isDisplayedOnAuth: false,
      route: '/auth'
    },
    {
      title: 'Регистрация',
      value: 'Регистрация',
      type: 'registration',
      isDisplayedOnAuth: false,
      route: '/registration'
    },
    {
      title: 'Выход',
      value: 'Выход',
      isDisplayedOnAuth: true,
      type: 'exit',
      route: '/'
    }
  ]);

  /**
   * Отслеживание изменения статуса авторизации, в случае изменений перерисовываются пункты меню
   * Метод updateDisplayedItems и переменная displayedItems нужны из-за анимации в меню, данные успевают подменится мгновенно до завершения анимации
   * по этому в компонент Header.vue после закрытия меню вызывается updateDisplayedItems который после завершения анимации перерисует меню
   */

  const itemsMenubar = computed(() => authorised.value ? headerMenuItems.value.filter(el => el.isDisplayedOnAuth === true) : headerMenuItems.value.filter(el => el.isDisplayedOnAuth === false));
  const displayedItems = ref([...itemsMenubar.value]);

  const updateDisplayedItems = () => {
    console.log('Обновили меню');
    displayedItems.value = [...itemsMenubar.value];
    console.log(itemsMenubar.value);
    console.log(authorised.value);
  };

  const getSliderData = async () => {
    return new Promise((resolve) => { // из-за setTimeout, без промиса код ждать не будет
      setTimeout(async () => { // что бы было видно прелоадер
        try {
          console.log('Запрос на данные слайдера начался');
          const { data } = await axios.get(API_ENDPOINTS.slider);
          sliderData.value = data;
          dataRetrievalError.value = false;
          console.log('Запрос на данные слайдера завершен');
        } catch (error) {
          dataRetrievalError.value = true;
          console.log(error);
        } finally {
          resolve(); // Уведомляем, что выполнение завершено
        }
      }, 100);
    });
  };

  const getProductsData = async () => {
    return new Promise((resolve) => { // из-за setTimeout, без промиса код ждать не будет
      setTimeout(async () => { // что бы было видно прелоадер
        try {
          console.log('Запрос на данные продуктов начался');
          const { data } = await axios.get(API_ENDPOINTS.products);
          productsData.value = data;
          dataRetrievalError.value = false;
          console.log('Запрос на данные продуктов завершен');
        } catch (error) {
          dataRetrievalError.value = true;
          console.log(error);
        } finally {
          overlay.value = false;
          resolve();  // Уведомляем, что выполнение завершено
        }
      }, 100);
    });
  };

  const getBasketsData = async (anonimBaskets = []) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          console.log('Запрос за корзиной начался');
          user_id.value = getLocalStorage('user_id');
          const { data } = await axios.get(`${API_ENDPOINTS.baskets}?user_id=${user_id.value}`);
          console.log('Абоба');
          console.log(data);

          if (anonimBaskets.length) {

            const anonimBasketsWithUserId = anonimBaskets.reduce((acc, item) => {
              acc.push({ ...item, user_id: +user_id.value, quantity: 1 });
              return acc;
            }, []);

            const concatData = [...data, ...anonimBasketsWithUserId];

            basketsData.value = concatData.reduce((acc, item) => {
              if (!acc.find(existingItem => existingItem.uniqueId === item.uniqueId)) {
                acc.push(item);
              }
              return acc;
            }, []);

            await axios.patch(API_ENDPOINTS.baskets, basketsData.value);

          } else {
            basketsData.value = data;
          }

          setLocalStorage('baskets', basketsData.value )

          console.log('ДЕБАГЕР');
          console.log(basketsData);
          // console.log(basketsData.value)
          dataRetrievalError.value = false;
        } catch (error) {
          dataRetrievalError.value = true;
          console.log(error);
        } finally {
          overlay.value = false;
          resolve();
        }
      }, 100);
    });
  };

  const getBookmarkedData = async (anonymBookmarked = []) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          console.log(anonymBookmarked);
          console.log('Запрос за избранными товарами начался');
          user_id.value = getLocalStorage('user_id');
          const { data } = await axios.get(`${API_ENDPOINTS.bookmarked}?user_id=${user_id.value}`);

          console.log('Избранные товары');
          console.log(data);

          if (anonymBookmarked.length) {
            const anonymBookmarledWithUserId = anonymBookmarked.reduce((acc, item) => {
              acc.push({ ...item, user_id: +user_id.value });
              return acc;
            }, []);

            const concatData = [...data, ...anonymBookmarledWithUserId];

            bookmarkedData.value = concatData.reduce((acc, item) => {
              if (!acc.find(existingItem => existingItem.uniqueId === item.uniqueId)) {
                acc.push(item);
              }
              return acc;
            }, []);

            await axios.patch(API_ENDPOINTS.bookmarked, bookmarkedData.value);

          } else {
            bookmarkedData.value = data;
          }

          setLocalStorage('bookmarked', bookmarkedData.value);

          console.log(bookmarkedData.value);
          dataRetrievalError.value = false;
        } catch (error) {
          dataRetrievalError.value = true;
          console.log(error);
          console.log('Я че в кетч');
          console.log(9090);
        } finally {
          overlay.value = false;
          resolve();
        }
      });
    });
  };

  return {
    sliderData,
    productsData,
    basketsData,
    bookmarkedData,
    dataRetrievalError,
    transitionDataRetrievalError,
    authorised,
    globalLogin,
    user_id,
    displayedItems,
    getSliderData,
    getProductsData,
    getBasketsData,
    getBookmarkedData,
    updateDisplayedItems
  };

});
