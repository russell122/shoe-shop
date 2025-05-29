import { ref } from 'vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';

import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

export function useStorageList({ 
  store, 
  dataKey, 
  apiEndpoint, 
  localStorageKey, 
  getNewItem 
}) {
  const { user_id, authorised } = storeToRefs(store);
  const data = storeToRefs(store)[dataKey];
  const requestError = ref(false);

  const addOrRemove = async (item) => {
    if (!authorised.value) {
      handleLocal(item);
      return;
    }
    try {
      const findElem = await axios.get(`${apiEndpoint}?user_id=${user_id.value}&uniqueId=${item.uniqueId}`);
      if (findElem.data.length) {
        await removeRemote(findElem.data[0]);
      } else {
        await addRemote(item);
      }
      requestError.value = false;
    } catch (error) {
      requestError.value = true;
    } finally {
      if (!requestError.value) {
        setLocalStorage(localStorageKey, data.value);
      }
      setTimeout(() => { requestError.value = false; }, 1000);
    }
  };

  const handleLocal = (item) => {
    const findElem = data.value?.find(elem => elem.uniqueId === item.uniqueId);
    if (findElem) {
      data.value = data.value.filter(elem => elem.uniqueId !== findElem.uniqueId);
    } else {
      data.value.push(getNewItem(item, user_id.value));
    }
    setLocalStorage(localStorageKey, data.value);
  };

  const removeRemote = async (item) => {
    data.value = data.value.filter(elem => elem.uniqueId !== item.uniqueId);
    await axios.delete(`${apiEndpoint}/${item.id}`);
  };

  const addRemote = async (item) => {
    const newItem = getNewItem(item, user_id.value);
    data.value.push(newItem);
    await axios.post(apiEndpoint, newItem);
  };

  return {
    addOrRemove,
    requestError
  };
} 