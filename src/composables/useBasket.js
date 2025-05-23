import { useOtherStore } from '@/stores/other.js';
import { useStorageList } from './useStorageList';
import { API_ENDPOINTS } from '@/config';

export function useBasket() {
  const store = useOtherStore();
  return useStorageList({
    store,
    dataKey: 'basketsData',
    apiEndpoint: API_ENDPOINTS.baskets,
    localStorageKey: 'baskets',
    getNewItem: (item, user_id) => ({ ...item, user_id: +user_id, quantity: 1 })
  });
}