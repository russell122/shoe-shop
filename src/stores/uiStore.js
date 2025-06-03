import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUiStore = defineStore('uiStore', () => {
    const drawer = ref(false);
    const overlay = ref(false);
    const basketOverlay = ref(false);

    return {
        drawer,
        overlay,
        basketOverlay,
    }
})