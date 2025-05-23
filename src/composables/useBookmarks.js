import { ref } from 'vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useOtherStore } from '@/stores/other.js';

export function useBookmarks() {
  const otherStore = useOtherStore();
  const { user_id, authorised, bookmarkedData } = storeToRefs(otherStore);
  const requestError = ref(false);

  const addToBookmarks = async (item) => {
    if (!authorised.value) {
      handleLocalBookmarks(item);
      return;
    }

    try {
      const findElem = await axios.get(`https://7402571ecc17c5c9.mokky.dev/bookmarked?user_id=${user_id.value}&uniqueId=${item.uniqueId}`);

      if (findElem.data.length) {
        await removeFromBookmarks(findElem.data[0]);
      } else {
        await addNewBookmark(item);
      }
      
      requestError.value = false;
    } catch (error) {
      console.error('Bookmark operation failed:', error);
      requestError.value = true;
    } finally {
      if (!requestError.value) {
        localStorage.setItem('bookmarked', JSON.stringify(bookmarkedData.value));
      }
      setTimeout(() => {
        requestError.value = false;
      }, 1000);
    }
  };

  const handleLocalBookmarks = (item) => {
    const findElem = bookmarkedData.value?.find(elem => elem.uniqueId === item.uniqueId);
    
    if (findElem) {
      bookmarkedData.value = bookmarkedData.value.filter(elem => elem.uniqueId !== findElem.uniqueId);
    } else {
      bookmarkedData.value.push({ ...item });
    }
    
    localStorage.setItem('bookmarked', JSON.stringify(bookmarkedData.value));
  };

  const removeFromBookmarks = async (item) => {
    bookmarkedData.value = bookmarkedData.value.filter(elem => elem.uniqueId !== item.uniqueId);
    await axios.delete(`https://7402571ecc17c5c9.mokky.dev/bookmarked/${item.id}`);
  };

  const addNewBookmark = async (item) => {
    const newItem = { ...item, 'user_id': +user_id.value };
    bookmarkedData.value.push(newItem);
    await axios.post(`https://7402571ecc17c5c9.mokky.dev/bookmarked`, newItem);
  };

  return {
    addToBookmarks,
    requestError
  };
}