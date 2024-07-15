<script setup>
	import { ref, watch } from 'vue'

	import { RouterLink, useRouter } from 'vue-router'

	import Basket from '@/components/Basket.vue'

	import Menubar from 'primevue/menubar';
	import Sidebar from 'primevue/sidebar';

	import { storeToRefs } from 'pinia'

	import { useOtherStore } from '@/stores/other.js'

	const otherStore = useOtherStore();

	const { authorised, globalLogin } = storeToRefs(otherStore)

	const price = ref(1205)
	const visibleRight = ref(false)
	const drawer = ref(null)
	const overlay = ref(false)
	const items = ref([
		{
			title: 'Вход',
			value: 'Вход',
			route: '/auth',
		},
		{
			title: 'Регистрация',
			value: 'Регистрация',
			route: '/registration',
		},
	])

	const router = useRouter();

	/**
	 * Отслеживание изменения статуса авторизации, в случае изменений перерисовываются пункты меню
	 */
// watch(
// 		() => authorised.value,
// 		() => {
// 				itemsMenubar.value.filter(el => {
// 					if(el.profile){
// 						el.items.map(elem => elem.statusLogin = !elem.statusLogin)
// 					}
// 				})
// 		}
// )

	/**
	 * Выход из аккаунта, удаление данных из localStorage, запуск логики authorised
	 */
	const logout = (e) => {
		if(e.target.getAttribute('data-logout') || e.target.closest('[data-logout]')){
			authorised.value = null
			globalLogin.value = '';
			localStorage.removeItem('tokenShoe')
			localStorage.removeItem('login')
			// localStorage.removeItem('password')
		}
	}


</script>

<template>

	<header class="header">
		<div class="container">

			<v-overlay v-model="overlay"></v-overlay>
			<Basket v-if="overlay"/>

<!--			<v-card-->
<!--					rounded="0"-->
<!--					flat-->
<!--			>-->
<!--				<v-toolbar-->
<!--						extended-->
<!--						prominent-->
<!--						color="#fff"-->
<!--						extension-height="0"-->
<!--				>-->
<!--					<v-img-->
<!--							max-width="40"-->
<!--							height="40"-->
<!--							src="/logo.png"-->
<!--					></v-img>-->

<!--					<v-toolbar-title>-->
<!--						<template #text>-->
<!--							<div class="header__logo-content">-->
<!--								<h4 class="header__logo-title">REACT SNEAKERS</h4>-->
<!--								<p class="header__logo-description">Магазин лучших кроссовок</p>-->
<!--							</div>-->
<!--						</template>-->
<!--					</v-toolbar-title>-->

<!--					<v-spacer></v-spacer>-->


<!--					<v-btn>-->
<!--						<v-icon size="22">mdi-basket-outline</v-icon>-->
<!--					</v-btn>-->

<!--					<v-btn>-->
<!--						<v-icon size="22">mdi-heart-outline</v-icon>-->
<!--					</v-btn>-->

<!--					<v-btn class="c-btn-icon">-->
<!--						<template v-slot:prepend>-->
<!--							<p>{{ globalLogin }}</p>-->
<!--						</template>-->
<!--						<v-icon size="22">mdi-dots-vertical</v-icon>-->
<!--					</v-btn>-->
<!--				</v-toolbar>-->
<!--				-->
<!--			</v-card>-->

			<v-card>
				<v-layout>

					<v-app-bar
							color="#fff"
							prominent
							height="80"
					>

						<router-link to="/" class="header__logo-link">
							<v-img
									max-width="40"
									width="40"
									height="40"
									src="/logo.png"
							></v-img>

							<v-toolbar-title>
								<template #text>
									<div class="header__logo-content">
										<h4 class="header__logo-title">REACT SNEAKERS</h4>
										<p class="header__logo-description">Магазин лучших кроссовок</p>
									</div>
								</template>
							</v-toolbar-title>
						</router-link>

						<v-spacer></v-spacer>

						<v-btn min-width="40" min-height="40" @click="overlay = !overlay">
							<v-icon size="22">mdi-basket-outline</v-icon>
						</v-btn>

						<router-link to="/about" class="header__logo-link">
							<v-btn min-width="40" min-height="40">
								<v-icon size="22">mdi-heart-outline</v-icon>
							</v-btn>
						</router-link>

<!--						<v-btn class="c-btn-icon" min-width="40" min-height="40">-->
<!--							<template v-slot:prepend>-->
<!--								<p>{{ globalLogin }}</p>-->
<!--							</template>-->
<!--							<v-icon size="22">mdi-dots-vertical</v-icon>-->
<!--						</v-btn>-->

						<v-menu>
							<template v-slot:activator="{ props }">
								<v-btn class="c-btn-icon" min-width="40" min-height="40" v-bind="props">
									<template v-slot:prepend>
										<p>{{ globalLogin }}</p>
									</template>
									<v-icon size="22">mdi-dots-vertical</v-icon>
								</v-btn>
<!--								<p>{{ globalLogin }}</p>-->
<!--								<v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>-->
							</template>

							<v-list class="header-list">
								<v-list-item
										v-for="(item, i) in items"
										:key="i"
								>
									<router-link :to="item.route" class="header__logo-link">
										<v-list-item-title>{{ item.title }}</v-list-item-title>
									</router-link>

								</v-list-item>
							</v-list>
						</v-menu>

					</v-app-bar>

				</v-layout>
			</v-card>

		</div>

	</header>
</template>

<style lang="scss">
  .header{
	  position: relative;
	  z-index: 1000;
  }
	header.v-toolbar{
		padding: 0 60px!important;
	}
	.v-toolbar-title{
		line-height: 16px;
		flex: 1 1 auto;
	}
	.c-btn-icon {
		text-transform: none;
	}
	.header__logo-link {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: inherit; /* Убедитесь, что ссылки не меняют цвет текста */
	}
	.header__logo-link .v-img {
		margin-right: 20px;
	}
	.header-list {
		.v-list-item{
			transition: all ease .2s;
			padding: 0!important;
			height: auto;
			min-width: auto;
			min-height: auto;
			&:hover{
				background-color: #E0E0E0;
			}
		}
		.header__logo-link{
			padding: 10px;
		}
	}
</style>
