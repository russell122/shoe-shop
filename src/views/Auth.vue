<script setup>
	import { ref } from "vue";
	import axios from "axios";

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

	const login = ref()
	const password = ref()
	const isValidAuth = ref({
		login: null,
		password: null,
		passwordLength: null
	})
	const authorisedError = ref(false)

	/**
	 * Авторизация пользователя, запись в localStorage, запуск логики authorised
	 */

	const autorization = async () => {
			if (!login.value) {
				isValidAuth.value.login = false
			} else {
				isValidAuth.value.login = true
			}
			if(!password.value) {
				isValidAuth.value.password = false
			} else {
				isValidAuth.value.password = true
			}
			if(password.value && password.value.length < 6) {
				isValidAuth.value.passwordLength = false
			} else {
				isValidAuth.value.passwordLength = true
			}

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
				<InputText id="username" type="text" v-model="login" required :invalid="isValidAuth.login === false || authorisedError"/>
				<label for="username">Логин</label>
			</FloatLabel>
			<InlineMessage v-if="isValidAuth.login === false" class="message message-login">Введите имя</InlineMessage>
			<FloatLabel>
				<Password v-model="password" inputId="password" :feedback="false" required toggleMask :invalid="isValidAuth.password === false || isValidAuth.passwordLength === false || authorisedError" />
				<label for="password" :style="{ color: isValidAuth.password === false || isValidAuth.passwordLength === false || authorisedError ? '#f87171' : '' }">Пароль</label>
			</FloatLabel>
			<InlineMessage v-if="isValidAuth.password === false" class="message message-password">Введите пароль</InlineMessage>
			<InlineMessage v-if="isValidAuth.passwordLength === false" class="message message-password">Минимальная длина пароля 6 символов</InlineMessage>
			<Button label="Войти" @click="autorization" />
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
