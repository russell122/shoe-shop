<script setup>
	import { ref } from "vue";
	import axios from "axios";
	import { useForm } from 'vee-validate';
	import * as yup from 'yup';

	import { storeToRefs } from 'pinia'

	import { useRouter } from "vue-router";

	import InputText from 'primevue/inputtext';
	import Password from 'primevue/password';
	import FloatLabel from 'primevue/floatLabel';
	import Button from 'primevue/button';
	import InlineMessage from 'primevue/inlinemessage';
	import Message from 'primevue/message';

	const router = useRouter();

	import { useOtherStore } from '@/stores/other.js'

	const otherStore = useOtherStore();

	const { authorised, globalLogin } = storeToRefs(otherStore)

	// const login = ref()
	// const password = ref()
	// const isValidAuth = ref({
	// 	login: null,
	// 	password: null,
	// 	passwordLength: null
	// })
	const authorisedError = ref(false)

	const {values, errors, defineField, validate } = useForm({
		validationSchema: yup.object({
			login: yup.string().min(3, 'Логин должен минимум 3 символа').max(20, 'Слишком длинный логин').required('Введите логин'),
			password: yup.string().min(6, 'Пароль должен быть минимум 6 символов').max(20, 'Слишком длинный пароль').required('Введите Пароль'),
		})
	});

	const [login, loginAttrs] = defineField('login', state => {
		console.log('он')
		console.log(state)
		return {
			validateOnModelUpdate: false,
		}
	});

	const [password, passwordAttrs] = defineField('password', state => {
		console.log('он')
		console.log(state)
		return {
			validateOnModelUpdate: false,
		}
	});

	// Метод для проверки формы
	const validateForm = async () => {
		const result = await validate();
		if (result.valid) {
			console.log('Форма валидна');
			try {
					const { data } = await axios.post('https://7402571ecc17c5c9.mokky.dev/auth', {
						login: login.value,
						password: password.value
					})

					console.log('Мы в трай')
					console.log(data)



			} catch (error) {
				console.log('УПАЛ В КЕТЧ при входе')
				console.log(error)
				authorisedError.value = true
			}
		} else {
			console.log('Форма содержит ошибки');
			console.log(result)
		}
	};

	/**
	 * Авторизация пользователя, запись в localStorage, запуск логики authorised
	 */

	const autorization = async () => {
			// if (!login.value) {
			// 	isValidAuth.value.login = false
			// } else {
			// 	isValidAuth.value.login = true
			// }
			// if(!password.value) {
			// 	isValidAuth.value.password = false
			// } else {
			// 	isValidAuth.value.password = true
			// }
			// if(password.value && password.value.length < 6) {
			// 	isValidAuth.value.passwordLength = false
			// } else {
			// 	isValidAuth.value.passwordLength = true
			// }

		try {
				if(isValidAuth.value.login && isValidAuth.value.password && isValidAuth.value.passwordLength) {
					const { data } = await axios.post('https://7402571ecc17c5c9.mokky.dev/auth', {
						login: login.value,
						password: password.value
					})

					globalLogin.value = login.value;
					authorised.value = true;
					authorisedError.value = false;
					localStorage.setItem('tokenShoe', data.token)
					localStorage.setItem('login', login.value)
					localStorage.setItem('password', password.value)

					setTimeout(() => {
						const command = () => {
							router.push('/')
						}

						command()
					}, 1000)

				}  else {
					return false
				}

		} catch (error) {
			console.log('УПАЛ В КЕТЧ при входе')
			console.log(error)
			authorisedError.value = true
		}
		finally {

		}
	}

</script>

<template>
	<div class="container">

		<form class="login">

			<FloatLabel>
				<InputText id="username" type="text" v-model="login" v-bind="loginAttrs" required :invalid="!!errors.login"/>
				<label for="username">Логин</label>
			</FloatLabel>
			<InlineMessage v-if="errors.login" class="message message-login">{{ errors.login }}</InlineMessage>

			<p>{{login}}</p>
			<p>{{loginAttrs}}</p>

<!--			<FloatLabel>-->
<!--				<InputText id="passwordname" type="text" v-model="password" v-bind="passwordAttrs" required :invalid="!!errors.password"/>-->
<!--				<label for="username">Парольььь</label>-->
<!--			</FloatLabel>-->
<!--			<InlineMessage v-if="errors.password" class="message message-login">{{ errors.password }}</InlineMessage>-->

			<FloatLabel>
				<Password id="passwordname" v-model="password" v-bind="passwordAttrs" required :feedback="false" :invalid="!!errors.password" />
				<label for="passwordname">Пароль</label>
			</FloatLabel>
			<InlineMessage v-if="errors.password" class="message message-password">{{ errors.password }}</InlineMessage>

			<Button label="Войти" @click="validateForm" />

			<Message severity="success" v-if="authorised" :closable="false">Успешный вход</Message>
			<Message severity="error" v-if="authorisedError" :closable="false">Неверный логин или пароль</Message>

		</form>

	</div>
</template>

<style lang="scss">
	.message  {
		width: 50%;
		display: flex;
		justify-content: flex-start;
		padding: 10px;
	}
	.login{
		.p-message{
			width: 50%;
			padding: 10px;
		}
	}
</style>
