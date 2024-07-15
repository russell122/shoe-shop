
<script setup>
	import { ref, computed } from 'vue';
	import MenuLinkItem from "@/components/MenuLinkItem.vue";

	const props = defineProps({
		item: {
			type: Object,
			required: true
		}
	});

	const isOpen = ref(false); // флаг открытия/закрытия меню
	const toggle = () => { isOpen.value = !isOpen.value; }; // при клике на элемент меняет значение флага

	const hasChildren = computed(() => Array.isArray(props.item.children) && props.item.children.length > 0); // если есть у элемента children, то отрисуем стрелочки
	const isLink = computed(() => typeof props.item.link === 'string'); // если есть у элемента link, то отрисуем ссылку
</script>

<template>
	<div v-auto-animate="{ duration: 200 }">
		<div @click="toggle" class="menu__list">
      <div v-if="isLink">
        <router-link class="menu__list-link" :to="item.link">
	        <MenuLinkItem :item="item"/>
        </router-link>
      </div>
			<div class="menu__list-top" v-else>
				<MenuLinkItem :item="item"/>

				<div v-if="hasChildren" class="menu__list-icon">
					<v-icon size="22" :class="isOpen ? 'active' : ''">mdi-chevron-right</v-icon>
				</div>
      </div>
		</div>
		<div class="submenu" v-if="isOpen && hasChildren">
			<MenuItem v-for="(child) in item.children" :key="child.id" :item="child" />
		</div>
	</div>

</template>

<style scoped lang="scss">
	.menu__list-top {
		display: flex;
		align-items: center;
	}
	.menu__list{
		padding: 10px;
		background: #fff;
		margin-bottom: 10px;
		border-radius: 5px;
		cursor: pointer;
		transition: all .2s ease;
		&:hover {
			background: #e5b05d;
			transition: all .2s ease;
			.menu__list-link-icon {
				transition: all .2s ease;
				filter: invert(82%) sepia(17%) saturate(209%) hue-rotate(166deg) brightness(89%) contrast(82%);
			}
		}
	}
	.menu__list-link{
		display: flex;
		align-items: center;
		text-decoration: none;
		color: #000;
	}
	.menu__list-icon{
		margin-left: auto;
	}
	.menu__list-icon i.active{
		transform: rotate(90deg);
	}

</style>
