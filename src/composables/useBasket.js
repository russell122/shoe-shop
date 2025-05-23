import { ref } from 'vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useOtherStore } from '@/stores/other.js';

export function useBasket() {
  const otherStore = useOtherStore();
  const { user_id, authorised, basketsData } = storeToRefs(otherStore);
  const requestError = ref(false);

  const addToBasket = async (item) => {
    if (!authorised.value) {
      handleLocalBasket(item);
      return;
    }

    try {
      const findElem = await axios.get(`https://7402571ecc17c5c9.mokky.dev/baskets?user_id=${user_id.value}&uniqueId=${item.uniqueId}`);

      if (findElem.data.length) {
        await removeFromBasket(findElem.data[0]);
      } else {
        await addNewItem(item);
      }
      
      requestError.value = false;
    } catch (error) {
      console.error('Basket operation failed:', error);
      requestError.value = true;
    } finally {
      if (!requestError.value) {
        localStorage.setItem('baskets', JSON.stringify(basketsData.value));
      }
      setTimeout(() => {
        requestError.value = false;
      }, 1000);
    }
  };

  const handleLocalBasket = (item) => {
    const findElem = basketsData.value?.find(elem => elem.uniqueId === item.uniqueId);
    
    if (findElem) {
      basketsData.value = basketsData.value.filter(elem => elem.uniqueId !== findElem.uniqueId);
    } else {
      basketsData.value.push({ ...item, 'quantity': 1 });
    }
    
    localStorage.setItem('baskets', JSON.stringify(basketsData.value));
  };

  const removeFromBasket = async (item) => {
    basketsData.value = basketsData.value.filter(elem => elem.uniqueId !== item.uniqueId);
    await axios.delete(`https://7402571ecc17c5c9.mokky.dev/baskets/${item.id}`);
  };

  const addNewItem = async (item) => {
    const newItem = { ...item, 'user_id': +user_id.value, 'quantity': 1 };
    basketsData.value.push(newItem);
    await axios.post(`https://7402571ecc17c5c9.mokky.dev/baskets`, newItem);
  };

  return {
    addToBasket,
    requestError
  };
}