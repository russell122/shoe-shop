import { useOtherStore } from '@/stores/other.js';
import { useStorageList } from './useStorageList';

export function useBasket() {
  const store = useOtherStore();
  return useStorageList({
    store,
    dataKey: 'basketsData',
    apiEndpoint: 'https://7402571ecc17c5c9.mokky.dev/baskets',
    localStorageKey: 'baskets',
    getNewItem: (item, user_id) => ({ ...item, user_id: +user_id, quantity: 1 })
  });
}