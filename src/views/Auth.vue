<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import Loader from '@/components/Loader.vue';

import { storeToRefs } from 'pinia';

import { useRouter } from 'vue-router';

const router = useRouter();

import { useOtherStore } from '@/stores/other.js';

const otherStore = useOtherStore();

const { authorised, globalLogin, overlay, basketsData, bookmarkedData } = storeToRefs(otherStore);
const { updateDisplayedItems } = otherStore;

const showPassword = ref(false);
const loading = ref(false);
const authorisedError = ref(false);
const noSuchUser = ref(false);

const { values, errors, defineField, validate, handleSubmit, handleReset } = useForm({
  validationSchema: yup.object({
    login: yup.string().min(1, 'Логин должен минимум 3 символа').max(20, 'Слишком длинный логин').required('Введите логин'),
    password: yup.string().min(1, 'Пароль должен быть минимум 6 символов').max(20, 'Слишком длинный пароль').required('Введите пароль')
  })
});

const [login, loginAttrs] = defineField('login', {
  validateOnModelUpdate: false
});

const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: false
});


/**
 * Авторизация пользователя, запись в localStorage, запуск логики authorised
 */
const autorization = handleSubmit(async values => {

  authorised.value = null;
  authorisedError.value = false;
  overlay.value = true;

  return new Promise((resolve) => { // из-за setTimeout, без промиса код ждать не будет
    setTimeout(async () => { // что бы было видно прелоадер (из-за быстрого ответа от сервера он не успевается отработать)
      try {
        const { data } = await axios.post('https://7402571ecc17c5c9.mokky.dev/auth', {
          login: values.login,
          password: values.password
        });

        if (data.token) {
          globalLogin.value = login.value;
          authorised.value = true;

          localStorage.setItem('tokenShoe', data.token);
          localStorage.setItem('login', login.value);
          localStorage.setItem('user_id', data.data.id);

          await router.push('/'); // дождемся пока перейдет на главную страницу иначе будет подергивание
          // после прелоадера вновь отобразится страница auth и резко главная, промис выше и await это фиксят

          console.log('Успешный вход');
          console.log(data);

          const anonimBaskets = JSON.parse(localStorage.getItem('baskets')) ?? [];
          const anonimBookmarked = JSON.parse(localStorage.getItem('bookmarked')) ?? [];

          updateDisplayedItems();
          await otherStore.getBasketsData(anonimBaskets);
          localStorage.setItem('baskets', JSON.stringify(basketsData.value));

          await otherStore.getBookmarkedData(anonimBookmarked);
          localStorage.setItem('bookmarked', JSON.stringify(bookmarkedData.value));

        } else {
          console.log('Шляяяяяяпа');
          authorisedError.value = true;
        }
      } catch (error) {
        console.log('Упали в кетч');
        console.log(error);
        if (error.response.status === 401) {
          noSuchUser.value = true;
        } else {
          authorisedError.value = true;
        }

      } finally {
        overlay.value = false;
        resolve(); // Уведомляем, что выполнение завершено
      }
    }, 100);

  });

});

const clearAuth = () => {
  authorisedError.value = false;
  handleReset();
};

</script>

<template>
  <v-sheet class="mx-auto custom-form" width="400">
    <form @submit.prevent="autorization">
      <v-text-field
        label="Логин"
        type="text"
        hint="Введите ваш логин"
        persist-placeholder
        clearable
        v-model="login"
        v-bind="loginAttrs"
        :counter="20"
        :error-messages="errors.login"
      ></v-text-field>

      <v-text-field
        label="Пароль"
        :type="showPassword ? 'text' : 'password'"
        hint="Введите ваш пароль"
        persist-placeholder
        clearable
        v-model="password"
        v-bind="passwordAttrs"
        :error-messages="errors.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        name="input-10-1"
        counter
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn
        class="me-4"
        type="submit"
        size="large"
        elevation="4"
        color="#334155"
        :loading="loading"
      >
        Войти
      </v-btn>

      <v-btn
        size="large"
        elevation="4"
        color="#334155"
        @click="clearAuth"
      >
        Очистить
      </v-btn>

      <div v-auto-animate>
        <!--				<v-alert-->
        <!--						v-if="authorised"-->
        <!--						text="Успешный вход"-->
        <!--						title=""-->
        <!--						type="success"-->
        <!--						icon="mdi-balloon"-->
        <!--				></v-alert>-->
      </div>
      <div v-auto-animate>
        <v-alert
          v-if="noSuchUser"
          text="Не верный логин или пароль"
          title="Ошибка!"
          type="error"
        ></v-alert>
      </div>
      <div v-auto-animate>
        <v-alert
          v-if="authorisedError"
          text="Попробуйте ещё раз немного позже"
          title="Ошибка!"
          type="error"
        ></v-alert>
      </div>


    </form>
  </v-sheet>


  <Loader />
</template>

<style lang="scss">
.custom-form {
  padding: 50px 0;
}
</style>
