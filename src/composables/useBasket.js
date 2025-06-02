import { API_ENDPOINTS } from '@/config';
import { createStorageListComposable } from './createStorageListComposable';

export const useBasket = createStorageListComposable({
  dataKey: 'basketsData',
  apiEndpoint: API_ENDPOINTS.baskets,
  localStorageKey: 'baskets',
  getNewItem: (item, user_id) => ({ ...item, user_id: +user_id, quantity: 1 })
});