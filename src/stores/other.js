import {ref, computed, onMounted} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useOtherStore = defineStore('other', () => {

  const sliderData = ref([])
  const productsData = ref([])
  const authorised = ref(null)
  const globalLogin = ref()
  const overlay = ref(true)
  const dataRetrievalError = ref(false)
  const transitionDataRetrievalError = ref(false)
  const updateProductsDataError = ref(false)
  const headerMenuItems = ref([
    {
      title: 'Вход',
      value: 'Вход',
      type: 'inlet',
      isDisplayedOnAuth: false,
      route: '/auth',
    },
    {
      title: 'Регистрация',
      value: 'Регистрация',
      type: 'registration',
      isDisplayedOnAuth: false,
      route: '/registration',
    },
    {
      title: 'Выход',
      value: 'Выход',
      isDisplayedOnAuth: true,
      type: 'exit',
      route: '/',
    },
  ])

  /**
   * Отслеживание изменения статуса авторизации, в случае изменений перерисовываются пункты меню
   * Метод updateDisplayedItems и переменная displayedItems нужны из-за анимации в меню, данные успевают подменится мгновенно до завершения анимации
   * по этому в компонент Header.vue после закрытия меню вызывается updateDisplayedItems который после завершения анимации перерисует меню
   */

  const itemsMenubar = computed(() => authorised.value ? headerMenuItems.value.filter(el => el.isDisplayedOnAuth === true) : headerMenuItems.value.filter(el => el.isDisplayedOnAuth === false))
  const displayedItems = ref([...itemsMenubar.value]);

  const updateDisplayedItems = () => {
    console.log('Обновили меню')
    displayedItems.value = [...itemsMenubar.value];
    console.log(itemsMenubar.value)
    console.log(authorised.value)
  };

  const getSliderData = async () => {
    return new Promise((resolve) => { // из-за setTimeout, без промиса код ждать не будет
      setTimeout( async () => { // что бы было видно прелоадер
        try {
          console.log("Запрос на данные слайдера начался");
          const {data} = await axios.get('https://7402571ecc17c5c9.mokky.dev/shoe-slider');
          sliderData.value = data;
          dataRetrievalError.value = false;
          console.log("Запрос на данные слайдера завершен");
        } catch (error) {
          dataRetrievalError.value = true;
          console.log(error)
        } finally {
          resolve(); // Уведомляем, что выполнение завершено
        }
      }, 100)
    });
  }

  const getProductsData = async () => {
    return new Promise((resolve) => { // из-за setTimeout, без промиса код ждать не будет
      setTimeout(async () => { // что бы было видно прелоадер
        try{
          console.log("Запрос на данные продуктов начался");
          const { data } = await axios.get('https://7402571ecc17c5c9.mokky.dev/products');
          productsData.value = data;
          dataRetrievalError.value = false;
          console.log("Запрос на данные продуктов завершен");
        } catch(error){
          dataRetrievalError.value = true;
          console.log(error)
        } finally {
          overlay.value = false
          resolve();  // Уведомляем, что выполнение завершено
        }
      }, 100)
    });
  }

  const updateProductsData = async (id, addedToBasket) => {
    try{
      const params = {
        addedToBasket: !addedToBasket
      };
      const { data } = await axios.patch(`https://7402571ecc17c5c9.mokky.dev/products/${id}`, params);
      const findElem = productsData.value.findIndex(item => item.id === data.id);
      productsData.value[findElem] = data;
      updateProductsDataError.value = false;
    } catch(error){
      updateProductsDataError.value = true;
      console.log(error)
    }
  }

  return {
    sliderData, productsData, dataRetrievalError, transitionDataRetrievalError, authorised, globalLogin, overlay, displayedItems,
    getSliderData, getProductsData,updateProductsData,
    updateDisplayedItems,
  }

})
