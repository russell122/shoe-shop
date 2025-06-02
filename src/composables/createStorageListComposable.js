import { useOtherStore } from '@/stores/other.js';
import { useStorageList } from './useStorageList';

export function createStorageListComposable({ dataKey, apiEndpoint, localStorageKey, getNewItem }) {
    return function useCustomStorageList() {
        const store = useOtherStore();
        return useStorageList({
            store,
            dataKey,
            apiEndpoint,
            localStorageKey,
            getNewItem
        });
    };
}
