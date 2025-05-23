import { useOtherStore } from '@/stores/other.js';
import { useStorageList } from './useStorageList';

export function useBookmarks() {
  const store = useOtherStore();
  return useStorageList({
    store,
    dataKey: 'bookmarkedData',
    apiEndpoint: 'https://7402571ecc17c5c9.mokky.dev/bookmarked',
    localStorageKey: 'bookmarked',
    getNewItem: (item, user_id) => ({ ...item, user_id: +user_id })
  });
}