<script setup>
import { useMobileNavigation } from '@/composables/useMobileNavigation';
import { storeToRefs } from 'pinia';
import { useOtherStore } from '@/stores/other';

const { 
  drawer, 
  openBasket, 
  onMenuToggle 
} = useMobileNavigation();

const otherStore = useOtherStore();
const { globalLogin, displayedItems } = storeToRefs(otherStore);
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
  >
    <!-- Кнопка корзины -->
    <v-btn min-width="40" min-height="40" @click="openBasket" ref="basketButton">
      <v-icon size="22">mdi-basket-outline</v-icon>
    </v-btn>

    <!-- Кнопка избранного -->
    <router-link to="/about" class="text-decoration-none">
      <v-btn min-width="40" min-height="40">
        <v-icon size="22">mdi-heart-outline</v-icon>
      </v-btn>
    </router-link>

    <!-- Выпадающее меню пользователя -->
    <v-menu @update:modelValue="onMenuToggle" :open-delay="300">
      <template v-slot:activator="{ props }">
        <v-btn class="c-btn-icon" min-width="40" min-height="40" v-bind="props">
          <template v-slot:prepend>
            <p>{{ globalLogin }}</p>
          </template>
          <v-icon size="22">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list class="header-list">
        <v-list-item
          v-for="(item, i) in displayedItems"
          :key="i"
        >
          <router-link 
            :to="item.route" 
            @click="item.type === 'exit' ? $emit('logout') : ''"
            class="header__logo-link text-decoration-none"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.c-btn-icon {
  text-transform: none;
}

.header__logo-link {
  display: flex;
  align-items: center;
}

.text-decoration-none {
  text-decoration: none;
  color: inherit;
}
</style> 