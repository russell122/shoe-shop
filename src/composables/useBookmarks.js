import { useOtherStore } from '@/stores/other.js';
import { useStorageList } from './useStorageList';
import { API_ENDPOINTS } from '@/config';

export function useBookmarks() {
  const store = useOtherStore();
  return useStorageList({
    store,
    dataKey: 'bookmarkedData',
    apiEndpoint: API_ENDPOINTS.bookmarked,
    localStorageKey: 'bookmarked',
    getNewItem: (item, user_id) => ({ ...item, user_id: +user_id })
  });
}