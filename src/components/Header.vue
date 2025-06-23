<script setup>

import { RouterLink, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useOtherStore } from '@/stores/other.js';
import { useMobileNavigation } from '@/composables/useMobileNavigation';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const otherStore = useOtherStore();

const {
  authorised,
  globalLogin,
  displayedItems,
  basketsData,
  bookmarkedData
} = storeToRefs(otherStore);

const {
  isMobile,
  drawer,
  basketOverlay,
  onMenuToggle,
  handleEscapeKey
} = useMobileNavigation();

const router = useRouter();
const basketButton = ref(null);
const drawerButton = ref(null);

/**
 * Выход из аккаунта, удаление данных из localStorage, запуск логики authorised
 */
const logout = async (e) => {
  authorised.value = null;
  globalLogin.value = '';

  localStorage.clear();
  basketsData.value = [];
  bookmarkedData.value = [];

  basketOverlay.value = false;
  drawer.value = false;

  await router.push('/');
};

onMounted(async () => {
  window.addEventListener('keyup', handleEscapeKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleEscapeKey);
});

</script>

<template>

  <v-app-bar
    color="#fff"
    prominent
    height="80"
    scroll-threshold="80"
    style="position: fixed;"
  >

    <div class="container header__wrap">
      <router-link to="/" class="header__logo-link text-decoration-none">
        <v-img
          max-width="40"
          width="40"
          height="40"
          src="/logo.png"
        ></v-img>
        <v-toolbar-title>
          <div class="header__logo-content">
            <h4 class="header__logo-title">REACT SNEAKERS</h4>
            <p class="header__logo-description">Магазин лучших кроссовок</p>
          </div>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <template v-if="isMobile">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" ref="drawerButton"></v-app-bar-nav-icon>
      </template>
      <template v-else>
        <v-btn min-width="40" min-height="40" @click="basketOverlay = !basketOverlay" ref="basketButton">
          <v-icon size="22">mdi-basket-outline</v-icon>
        </v-btn>

        <router-link to="/about" class="text-decoration-none">
          <v-btn min-width="40" min-height="40">
            <v-icon size="22">mdi-heart-outline</v-icon>
          </v-btn>
        </router-link>

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
              <router-link :to="item.route" @click="item.type === 'exit' ? logout() : '' "
                           class="header__logo-link text-decoration-none">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </router-link>

            </v-list-item>
          </v-list>
        </v-menu>
      </template>

    </div>

  </v-app-bar>

</template>

<style lang="scss">

.header__wrap {
  height: 100%;
  display: flex;
}

.v-toolbar-title {
  line-height: 21px;
  flex: 1 1 auto;
}

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

.header__logo-link .v-img {
  margin-right: 20px;
}

.header-list {
  .v-list-item {
    transition: all ease .2s;
    padding: 0 !important;
    height: auto;
    min-width: auto;
    min-height: auto;

    &:hover {
      background-color: #E0E0E0;
    }
  }

  .header__logo-link {
    padding: 10px;
  }
}

@media screen and (max-width: 576px) {
  .header__logo-title, .header__logo-description {
    font-size: 18px;
  }
  .header__logo-link .v-img {
    margin-right: 10px;
  }
}

@media screen and (max-width: 400px) {
  .header__logo-title, .header__logo-description {
    font-size: 16px;
  }
  .header__logo-link .v-img {
    margin-right: 5px;
  }
}
</style>
