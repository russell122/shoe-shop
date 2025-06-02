import { API_ENDPOINTS } from '@/config';
import { createStorageListComposable } from './createStorageListComposable';

export const useBookmarks = createStorageListComposable({
  dataKey: 'bookmarkedData',
  apiEndpoint: API_ENDPOINTS.bookmarked,
  localStorageKey: 'bookmarked',
  getNewItem: (item, user_id) => ({ ...item, user_id: +user_id })
});