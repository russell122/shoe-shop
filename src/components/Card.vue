<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';

import { useOtherStore } from '@/stores/other.js';

const props = defineProps({
  item: {
    required: true,
    type: Object
  },
  basketItem: {
    required: false,
    type: Object
  },
  bookmarkedItem: {
    required: false,
    type: Object
  }
});


const otherStore = useOtherStore();

const { user_id, authorised, basketsData, bookmarkedData } = storeToRefs(otherStore);

const requestError = ref();

/**
 * Обертка как пример для кейсов когда нужно выполнить несколько методов, ведь несколько методов при клике повесить нельзя
 */
const handleClickAddToBasket = async (item) => {
  await addToBasket(item);
};

const addToBasket = async (item) => {
  console.log(authorised);
  if (authorised.value) {
    requestError.value = false;
    try {
      const findElem = await axios.get(`https://7402571ecc17c5c9.mokky.dev/baskets?user_id=${user_id.value}&uniqueId=${item.uniqueId}`);

      if (findElem.data.length) {
        basketsData.value = basketsData.value.filter(elem => elem.uniqueId !== findElem.data[0].uniqueId);
        await axios.delete(`https://7402571ecc17c5c9.mokky.dev/baskets/${findElem.data[0].id}`);
      } else {
        basketsData.value.push({ ...item, 'user_id': +user_id.value, 'quantity': 1 });
        await axios.post(`https://7402571ecc17c5c9.mokky.dev/baskets`, {
          ...item,
          'user_id': +user_id.value,
          'quantity': 1
        });
      }
      requestError.value = false;
    } catch (error) {
      console.log(error);
      requestError.value = true;
    } finally {
      if (!requestError.value) {
        localStorage.setItem('baskets', JSON.stringify(basketsData.value));
      } else {
        console.log('ошибка');
      }
      setTimeout(() => {
        requestError.value = '';
      }, 1000);
    }
  } else {
    console.log('А НУ НАХУЙ ПОШЕЛ');
    console.log(item);
    console.log(basketsData.value);

    const findElem = basketsData.value?.find(elem => elem.uniqueId === item.uniqueId);

    if (findElem) {
      console.log('Нашли абобу');
      basketsData.value = basketsData.value.filter(elem => elem.uniqueId !== findElem.uniqueId);
    } else {
      console.log('Абобы нет');
      console.log(basketsData);
      // basketsData.value = [];
      console.log(basketsData.value);
      basketsData.value.push({ ...item, 'quantity': 1 });
    }
    localStorage.setItem('baskets', JSON.stringify(basketsData.value));
  }

};

const addToBookmarked = async (item) => {
  if (authorised.value) {
    requestError.value = false;
    try {
      const findElem = await axios.get(`https://7402571ecc17c5c9.mokky.dev/bookmarked?user_id=${user_id.value}&uniqueId=${item.uniqueId}`);

      if (findElem.data.length) {
        bookmarkedData.value = bookmarkedData.value.filter(elem => elem.uniqueId !== findElem.data[0].uniqueId);
        await axios.delete(`https://7402571ecc17c5c9.mokky.dev/bookmarked/${findElem.data[0].id}`);
      } else {
        bookmarkedData.value.push({ ...item, 'user_id': +user_id.value });
        await axios.post(`https://7402571ecc17c5c9.mokky.dev/bookmarked`, {
          ...item,
          'user_id': +user_id.value
        });
      }
      requestError.value = false;
    } catch (error) {
      console.log(error);
      requestError.value = true;
    } finally {
      if (!requestError.value) {
        localStorage.setItem('bookmarked', JSON.stringify(bookmarkedData.value));
      } else {
        console.log('ошибка');
      }
      setTimeout(() => {
        requestError.value = '';
      }, 1000);
    }
  } else {
    const findElem = bookmarkedData.value?.find(elem => elem.uniqueId === item.uniqueId);

    if (findElem) {
      console.log('Нашли абобу');
      bookmarkedData.value = bookmarkedData.value.filter(elem => elem.uniqueId !== findElem.uniqueId);
    } else {
      console.log('Абобы нет');
      console.log(bookmarkedData);
      console.log(bookmarkedData.value);
      bookmarkedData.value.push({ ...item });
    }
    localStorage.setItem('bookmarked', JSON.stringify(bookmarkedData.value));
  }
};

</script>

<template>
  <div class="card">
    <div class="card__wrap">
      <div class="card__wrap-error" v-auto-animate>
        <v-alert
          v-if="requestError"
          title="Ошибка"
          text="Сервис не доступен. Попробуйте позже."
          type="error"
          elevation="0"
          density="compact"
        ></v-alert>
      </div>
      <div class="card__heart-wrap">
        <!--        !!! Тут вместо basketItem нужно будет прокидывать себе bookmarkedItem-->
        <div class="card__heart" :class="bookmarkedItem?.uniqueId ? 'active' : ''"
             @click="addToBookmarked(item)">
          <v-icon :icon="bookmarkedItem?.uniqueId ? 'mdi-heart' : 'mdi-heart-outline'" />
        </div>
      </div>
      <div class="card__img">
        <img :src="item.img" :alt="item.title" class="img">
      </div>
      <div class="card__content">
        <h3 class="card__content-title">{{ item.title }}</h3>
        <div class="card__content-wrap">
          <div class="card__content-price">
            <p class="card__content-price-text">ЦЕНА:</p>
            <p class="card__content-price-value">{{ item.price }} <span class="ruble-icon">₽</span></p>
          </div>
          <div class="card__content-add" :class="basketItem?.uniqueId ? 'active' : ''"
               @click="handleClickAddToBasket(item)">
            <v-icon :icon="basketItem?.uniqueId ? 'mdi-check' : 'mdi-plus'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  border: 1px solid #F3F3F3;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: all ease .2s;

  &:hover {
    transition: all ease .2s;
    border: 1px solid #F8F8F8;
    box-shadow: 0px 14px 30px 0px #0000000D;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__heart-wrap {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  &__heart {
    border: 1px solid #F2F2F2;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6.5px;
    transition: all .2s ease;
    cursor: pointer;

    &:hover {
      border: 1px solid #D3D3D3;
      transition: all .2s ease;

      .v-icon {
        color: #D3D3D3;
        transition: all .2s ease;
      }
    }

    .v-icon {
      font-size: 20px;
      color: #F2F2F2;
      transition: all .2s ease;
    }
  }

  &__heart.active {
    background-color: #FEF0F0;
    border: 1px solid #FEF0F0;

    .v-icon {
      color: #FF8585;
    }
  }

  &__img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 14px;
    flex: 1 0 auto;

    img {
      width: 133px;
    }
  }

  &__content-price {
    &-text {
      text-transform: uppercase;
      font-size: 12px;
      color: #BDBDBD;
      margin-bottom: 5px;
    }

    &-value {
      font-weight: 700;
      font-size: 14px;

      .ruble-icon {
        font-family: "Helvetica Neue", sans-serif;
      }
    }
  }

  &__content-title {
    margin-bottom: 14px;
    font-weight: 600;
  }

  &__content-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content-add {
    border: 1px solid #F2F2F2;
    border-radius: 8px;
    padding: 6px;
    cursor: pointer;
    transition: all .2s ease;

    &:hover {
      border: 1px solid #D3D3D3;
      transition: all .2s ease;

      .v-icon {
        color: #D3D3D3;
        transition: all .2s ease;
      }
    }

    .v-icon {
      font-size: 21px;
      color: #F2F2F2;
      transition: all .2s ease;
    }
  }

  &__content-add.active {
    background: linear-gradient(180deg, #89F09C 0%, #3CC755 100%);
    border: 1px solid #89F09C;

    .v-icon {
      color: #FFFFFF;
    }
  }

  &__wrap-error {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;

    .v-alert {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
    }
  }
}
</style>
