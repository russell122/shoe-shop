<script setup>
import { ref } from 'vue';
import axios from "axios";
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import Loader from '@/components/Loader.vue';

import { storeToRefs } from 'pinia'

import { useRouter } from "vue-router";

const router = useRouter();

import { useOtherStore } from '@/stores/other.js'

const otherStore = useOtherStore();

const { authorised, globalLogin, overlay } = storeToRefs(otherStore)

const show1 = ref(false);
const loading = ref(false);
const registrationError = ref(false)
const userAlreadyExists = ref(false)

const {values, errors, defineField, validate, handleSubmit, handleReset } = useForm({
	validationSchema: yup.object({
		login: yup.string().min(1, 'Логин должен минимум 3 символа').max(20, 'Слишком длинный логин').required('Введите логин'),
		password: yup.string().min(1, 'Пароль должен быть минимум 6 символов').max(20, 'Слишком длинный пароль').required('Введите пароль'),
		email: yup.string().email('Некорректная почта').required('Введите почту'),
	})
});

const [login, loginAttrs] = defineField('login', {
	validateOnModelUpdate: false,
});

const [email, emailAttrs] = defineField('email', {
	validateOnModelUpdate: false,
});

const [password, passwordAttrs] = defineField('password', {
	validateOnModelUpdate: false,
});


/**
 * Регистрация пользователя, запись в localStorage, запуск логики authorised
 */
const registration = handleSubmit(async values => {

	authorised.value = null
	registrationError.value = false
	overlay.value = true

	setTimeout(async () => {
		try {
			const { data } = await axios.post('https://7402571ecc17c5c9.mokky.dev/register', {
				login: values.login,
				email: values.email,
				password: values.password
			})

			if(data.token){
				globalLogin.value = login.value;
				authorised.value = true;

				localStorage.setItem('tokenShoe', data.token)
				localStorage.setItem('login', login.value)
				// localStorage.setItem('password', password.value)

				setTimeout(() => {
					const command = () => {
						router.push('/')
					}

					command()
				}, 2000)

				console.log("Успешный вход")
				console.log(data)
			} else {
				console.log('Шляяяяяяпа')
				registrationError.value = true
			}
		} catch (error) {
			console.log('Упали в кетч')
			console.log(error)
			if(error.response.status === 401) {
				userAlreadyExists.value = true;
			} else {
				registrationError.value = true
			}
		} finally {
			overlay.value = false
		}
	}, 2000)


});

const clearAuth = () => {
	registrationError.value = false
	handleReset();
}
</script>

<template>
	<v-sheet class="mx-auto custom-form" width="600">
		<form @submit.prevent="registration">
			<v-text-field
					label="Логин"
					type="text"
					hint="Введите логин"
					persist-placeholder
					clearable
					v-model="login"
					v-bind="loginAttrs"
					:counter="20"
					:error-messages="errors.login"
			></v-text-field>

			<v-text-field
					label="Адресс электронной почты"
					placeholder="aboba@gmail.com"
					type="email"
					hint="Введите почту"
					persist-placeholder
					clearable
					v-model="email"
					v-bind="emailAttrs"
					:error-messages="errors.email"
			></v-text-field>

			<v-text-field
					label="Пароль"
					:type="show1 ? 'text' : 'password'"
					hint="Введите пароль"
					persist-placeholder
					clearable
					v-model="password"
					v-bind="passwordAttrs"
					:error-messages="errors.password"
					:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
					name="input-10-1"
					counter
					@click:append="show1 = !show1"
			></v-text-field>

			<v-btn
					class="me-4"
					type="submit"
					size="large"
					elevation="4"
					color="#334155"
					:loading="loading"
			>
				Зарегистрироваться
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
				<v-alert
						v-if="authorised"
						text="Успешная регистрация"
						title=""
						type="success"
						icon="mdi-balloon"
				></v-alert>
			</div>
			<div v-auto-animate>
				<v-alert
						v-if="userAlreadyExists"
						text="Такой пользователь уже существует"
						title="Ошибка!"
						type="error"
				></v-alert>
			</div>
			<div v-auto-animate>
				<v-alert
						v-if="registrationError"
						text="Попробуйте ещё раз немного позже"
						title="Ошибка!"
						type="error"
				></v-alert>
			</div>


		</form>
	</v-sheet>


	<Loader/>
</template>

<style lang="scss">
.custom-form{
	padding: 50px 0;
}
</style>
