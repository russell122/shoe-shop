import {ref, computed, onMounted} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useOtherStore = defineStore('other', () => {

  const sliderData = ref([])
  const authorised = ref(null)
  const globalLogin = ref()

  onMounted(async () => {
    await getSliderData();
  })

  const getSliderData = async () => {
    try {
      const { data } =  await axios.get('https://7402571ecc17c5c9.mokky.dev/shoe-slider');
      sliderData.value = data;
    } catch (error){
      console.log(error)
    }
  }

  return { sliderData, authorised, globalLogin }
})
