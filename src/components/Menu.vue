<template>
	<div class="menu">
		<div class="menu__wrap">
			<MenuItem v-for="(item) in menuItems" :key="item.id" :item="item" />
		</div>
	</div>
</template>

<script setup>
import MenuItem from './MenuItem.vue';

const menuItems = [
	{
		id: 1,
		label: 'Home',
		link: '/',
		message: '4',
		icon: '/cart.svg'
	},
	{
		id: 2,
		label: 'About',
		link: '/about',
		icon: '/cart.svg'
	},
	{
		id: 3,
		label: 'Products',
		message: '2',
		icon: '/cart.svg',
		children: [
			{
				id: 4,
				label: 'Shoes',
				link: '/products/shoes',
				message: '3',
				icon: '/cart.svg',
			},
			{
				id: 5,
				label: 'Apparel',
				link: '/products/apparel',
				icon: '/cart.svg',
			},
			{
				id: 6,
				label: 'Accessories',
				message: '4',
				icon: '/cart.svg',
				children: [
					{
						id: 7,
						label: 'Bags',
						link: '/products/accessories/bags',
						icon: '/cart.svg',
					},
					{
						id: 8,
						label: 'Jewelry',
						link: '/products/accessories/jewelry',
						icon: '/cart.svg',
					},
					{
						id: 9,
						label: 'Gadgets',
						message: '6',
						icon: '/cart.svg',
						children: [
							{
								id: 10,
								label: 'Smartwatches',
								link: '/products/accessories/gadgets/smartwatches',
								icon: '/cart.svg',
							},
							{
								id: 11,
								label: 'VR Headsets',
								link: '/products/accessories/gadgets/vr-headsets',
								icon: '/cart.svg',
							}
						]
					}
				]
			}
		]
	},
	{
		id: 12,
		label: 'Contact',
		link: '/contact',
		icon: '/cart.svg',
	},
	{
		id: 13,
		label: 'Products 222',
		icon: '/cart.svg',
		children: [
			{
				id: 14,
				label: 'Shoes 222',
				link: '/products/shoes',
				icon: '/cart.svg',
			},
			{
				id: 15,
				label: 'Apparel 222',
				link: '/products/apparel',
				icon: '/cart.svg',
			},
			{
				id: 16,
				label: 'Accessories 222',
				icon: '/cart.svg',
				children: [
					{
						id: 17,
						label: 'Bags 222',
						link: '/products/accessories/bags',
						icon: '/cart.svg',
					},
					{
						id: 18,
						label: 'Jewelry 222',
						link: '/products/accessories/jewelry',
						icon: '/cart.svg',
					},
					{
						id: 19,
						label: 'Gadgets 222',
						icon: '/cart.svg',
						children: [
							{
								id: 20,
								label: 'Smartwatches 222',
								link: '/products/accessories/gadgets/smartwatches',
								icon: '/cart.svg',
							},
							{
								id: 21,
								label: 'VR Headsets 222',
								link: '/products/accessories/gadgets/vr-headsets',
								icon: '/cart.svg',
							}
						]
					}
				]
			}
		]
	},
];
</script>

<style scoped>
	.menu {
		flex: 0 1 250px;
	}
</style>
