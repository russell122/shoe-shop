<script setup>
	import { ref } from 'vue'
	import axios from "axios";

	import { storeToRefs } from "pinia";

	import { useRouter } from "vue-router";

	import InputText from 'primevue/inputtext';
	import Password from 'primevue/password';
	import FloatLabel from 'primevue/floatLabel';
	import Button from 'primevue/button';

	const router = useRouter()

	import { useOtherStore } from '@/stores/other.js'
	import InlineMessage from "primevue/inlinemessage";
	import Message from "primevue/message";

	const otherStore = useOtherStore();

	const { authorised, globalLogin } = storeToRefs(otherStore)

	const loginReg = ref()
	const emailReg = ref()
	const passwordReg = ref()
	const isValidRegistration = ref({
		login: null,
		email: null,
		password: null,
		passwordLength: null
	})

	const registrationError = ref(false)
	const userAlreadyExists = ref(false)


	/**
	 * Регистрация нового пользователя
	 */
	const registration = async () => {
		if (!loginReg.value) {
			isValidRegistration.value.login = false
		} else {
			isValidRegistration.value.login = true
		}
		if (!emailReg.value) {
			isValidRegistration.value.email = false
		} else {
			isValidRegistration.value.email = true
		}
		if (!passwordReg.value) {
			isValidRegistration.value.password = false
		} else {
			isValidRegistration.value.password = true
		}
		if(passwordReg.value && passwordReg.value.length < 6) {
			isValidRegistration.value.passwordLength = false
		} else {
			isValidRegistration.value.passwordLength = true
		}

		try {
			if(isValidRegistration.value.login && isValidRegistration.value.email && isValidRegistration.value.password && isValidRegistration.value.passwordLength) {
				const { data } = await axios.post('https://7402571ecc17c5c9.mokky.dev/register', {
					login : loginReg.value,
					email: emailReg.value,
					password: passwordReg.value
				})

				globalLogin.value = loginReg.value;
				authorised.value = true;
				registrationError.value = false;
				localStorage.setItem('tokenShoe', data.token);
				localStorage.setItem('login', loginReg.value);
				localStorage.setItem('password', passwordReg.value);

				setTimeout(() => {
					const command = () => {
						router.push('/')
					}

					command()
				}, 1000)

				console.log(data)
			} else {
				return false
			}

		} catch (error) {
			console.log('УПАЛ В КЕТЧ при регистрации')
			console.log(error.response)
			if(error.response.status === 401) {
				userAlreadyExists.value = true;
			}
			registrationError.value = true;
		}
	}
</script>

<template>
	<div class="container">
		<form class="login">
			<FloatLabel>
				<InputText id="username2" type="text" v-model="loginReg" required :invalid="isValidRegistration.login === false || registrationError"/>
				<label for="username2">Логин</label>
			</FloatLabel>
			<InlineMessage v-if="isValidRegistration.login === false" class="message message-login">Введите имя</InlineMessage>
			<FloatLabel>
				<InputText id="email2" type="email" v-model="emailReg" required :invalid="isValidRegistration.email === false || registrationError"/>
				<label for="email2">Почта</label>
			</FloatLabel>
			<InlineMessage v-if="isValidRegistration.email === false" class="message message-login">Введите почту</InlineMessage>
			<FloatLabel>
				<Password v-model="passwordReg" inputId="password2" :feedback="false" required toggleMask :invalid="isValidRegistration.password === false || isValidRegistration.passwordLength === false || registrationError"/>
				<label for="password2"  :style="{ color: isValidRegistration.password === false || isValidRegistration.passwordLength === false || registrationError ? '#f87171' : '' }">Пароль</label>
			</FloatLabel>
			<InlineMessage v-if="isValidRegistration.password === false" class="message message-password">Введите пароль</InlineMessage>
			<InlineMessage v-if="isValidRegistration.passwordLength === false" class="message message-password">Минимальная длина пароля 6 символов</InlineMessage>
			<Button label="Войти" @click="registration" />
			<Message severity="success" v-if="authorised" :closable="false">Успешная регистрация</Message>
			<Message severity="error" v-if="userAlreadyExists" :closable="false">Такой пользователь уже существует</Message>
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
