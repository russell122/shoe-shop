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

	const router = useRouter();

	const itemsMenubar = ref([
		{
			label: price.value + ' руб.',
			icon: '/cart.svg',
			alt: 'logo',
			priceClass: true,
		},
		{
			label: 'Закладки',
			icon: '/heart.svg',
			alt: 'heart',
			route: '/about',
		},
		{
			label: 'Профиль',
			icon: '/profile.svg',
			alt: 'profile',
			profile: true,
			items: [
				{
					label: 'Вход',
					icon: '/profile.svg',
					alt: 'auth',
					route: '/auth',
					authAction: true,
					statusLogin: true,
					command: () => {
						router.push('/auth');
					}
				},
				{
					label: 'Регистрация',
					icon: '/profile.svg',
					alt: 'registration',
					route: '/registration',
					authAction: true,
					statusLogin: true,
					command: () => {
						router.push('/registration');
					}
				},
				{
					label: 'История покупок',
					icon: '/profile.svg',
					alt: 'history',
					authAction: true,
					statusLogin: false,
					command: () => {
						router.push('/history');
					}
				},
				{
					label: 'Выход',
					icon: '/profile.svg',
					alt: 'logout',
					logout: true,
					authAction: true,
					statusLogin: false,
					command: () => {
						router.push('/');
					}
				},
			]
		}
	])

	/**
	 * Отслеживание изменения статуса авторизации, в случае изменений перерисовываются пункты меню
	 */
watch(
		() => authorised.value,
		() => {
				itemsMenubar.value.filter(el => {
					if(el.profile){
						el.items.map(elem => elem.statusLogin = !elem.statusLogin)
					}
				})
		}
)

	/**
	 * Выход из аккаунта, удаление данных из localStorage, запуск логики authorised
	 */
	const logout = (e) => {
		if(e.target.getAttribute('data-logout') || e.target.closest('[data-logout]')){
			authorised.value = null
			globalLogin.value = '';
			localStorage.removeItem('tokenShoe')
			localStorage.removeItem('login')
			localStorage.removeItem('password')
		}
	}


</script>

<template>

	<header class="header">
		<div class="container">
			<div class="header__wrap">

				<div class="header__content">

					<Menubar :model="itemsMenubar">
						<template #start>
							<div class="header__link">
								<router-link to="/">
									<div class="header__logo">
										<div class="header__logo-img">
											<img src="/logo.png" alt="logo">
										</div>
										<div class="header__logo-content">
											<h4 class="header__logo-title">REACT SNEAKERS</h4>
											<p class="header__logo-description">Магазин лучших кроссовок</p>
										</div>
									</div>
								</router-link>
							</div>
						</template>
						<template #item="{ item, props, hasSubmenu }">
							<router-link v-if="item.route && !item.authAction" v-slot="{ href, navigate }" :to="item.route" custom>
								<a v-ripple :href="href" v-bind="props.action" @click="navigate">
									<img :src="item.icon" :alt="item.alt">
									<span class="ml-2">{{ item.label }}</span>
								</a>
							</router-link>
							<a v-else-if="item.priceClass" v-ripple :href="item.url" :target="item.target" v-bind="props.action"  @click="visibleRight = true">
								<img :src="item.icon" :alt="item.alt">
								<span class="ml-2" :class="item.priceClass ? 'price-class' : ''">{{ item.label }}</span>
								<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
							</a>
							<a v-else-if="item.authAction && item.statusLogin" v-ripple :href="item.url" :target="item.target" v-bind="props.action" @click="logout" :data-logout="item.logout">
								<p>555</p>
									<img :src="item.icon" :alt="item.alt">
									<span class="ml-2" >{{ item.label }}</span>
									<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
							</a>
							<a v-else-if="!item.authAction && !item.statusLogin" v-ripple :href="item.url" :target="item.target" v-bind="props.action">
									<img :src="item.icon" :alt="item.alt">
									<span class="ml-2">{{ globalLogin || item.label }}</span>
									<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
							</a>
						</template>

					</Menubar>

				</div>

				<Sidebar v-model:visible="visibleRight" header="Right Sidebar" position="right">
					<Basket/>
				</Sidebar>

			</div>
		</div>

	</header>
</template>

<style lang="scss">
	.header{
		padding: 43px 0;
		border-bottom: 1px solid #EAEAEA;
		@media screen and (max-width: 1199px) {
			padding: 30px 0;
		}
		@media screen and (max-width: 576px) {
			padding: 20px 0;
		}
		&__content{
			width: 100%;
		}
		&__link a{
			text-decoration: none;
			display: inline-block;
		}
		&__wrap{
			display: flex;
			align-items: center;
		}
		&__logo{
			display: flex;
			align-items: center;
		}
		&__logo-img{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			margin-right: 16px;
			@media screen and (max-width: 576px) {
				margin-right: 10px;
			}
		}
		&__logo-img img{
			width: 40px;
			height: 40px;
		}
		&__logo-title {
			color: #000;
			font-size: 20px;
			font-weight: bold;
			text-decoration: none;
			margin-bottom: 7px;
			@media screen and (max-width: 576px) {
				font-size: 18px;
			}
		}
		&__logo-description{
			color: #9D9D9D;
			font-size: 14px;
		}
		&__link{
			@media screen and (max-width: 576px) {
				margin-right: 10px;
			}
		}
		&__content .p-menubar{
			display: flex;
			width: 100%;
			justify-content: space-between;
		}
		&__content .p-menuitem{
			margin-right: 20px;
			z-index: 1000;
			@media screen and (max-width: 1199px) {
				margin-right: 10px;
			}
			@media screen and (max-width: 960px) {
				margin-right: 0;
			}
			&:last-child{
				margin-right: 0;
			}
		}
		&__content .p-menuitem .p-menuitem-link {
			padding: 10px 5px;
		}
		&__content .p-menuitem .p-menuitem-link img{
			margin-right: 8px;
			width: 20px;
			height: 20px;
		}
		&__content .p-menuitem .p-menuitem-link  span {
			color: #5C5C5C;
			font-size: 14px;
			transition: all ease .2s;
		}
		&__content .p-menuitem .p-menuitem-link .price-class {
			color: #5C5C5C;
			font-weight: 600;
		}
	}
</style>
