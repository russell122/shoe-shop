
<script setup>
	const props = defineProps({
		item: {
			type: Object,
			required: true
		}
	});

</script>

<template>
	<div class="menu__list-link-item">
		<img v-if="item.icon" :src="item.icon" alt="" class="menu__list-link-icon">
		<span v-if="item.message" class="circle">{{ item.message }}</span>
	</div>
	<p class="menu__list-link-text">{{ item.label }}</p>
</template>

<style scoped lang="scss">
	.menu__list-link-item{
		display: flex;
		margin: 0 15px 0 0;
		position: relative;
	}
	.menu__list-link-icon{
		transition: all ease .2s;
		width: 16px;
		height: 16px;
	}
	.menu__list .circle{
		position: absolute;
		top: -4px;
		right: -8px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		width: 14px;
		height: 14px;
		background-color: red;
		color: #fff;
		font-size: 12px;
	}
	.menu__list-link-text{
		margin-right: 10px;
	}
</style>
