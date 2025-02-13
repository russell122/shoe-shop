<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { values, errors, defineField } = useForm({
	validationSchema: yup.object({
		email: yup.string().email('не верное мыло').required('А кто у нас забыл ввести имейл?'),
	})
});

const [email, emailAttrs] = defineField('email', {
	// validateOnModelUpdate: false,
});

const test = () => {
	console.log(errors)
	console.log(errors.value)
}
</script>

<template>
	<p>123</p>
	<input v-model="email" placeholder="введите имейл" v-bind="emailAttrs" @input="test"/>

	<pre>values: {{ values }}</pre>
	<pre>errors: {{ errors }}</pre>
</template>
