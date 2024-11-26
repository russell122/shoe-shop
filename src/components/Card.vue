<script setup>
	const props = defineProps({
		item: {
			required: true,
			type: Object
		}
	})

	import { storeToRefs } from 'pinia'

	import { useOtherStore } from '@/stores/other.js'

	const otherStore = useOtherStore();

	const { updateProductsData } = otherStore;

</script>

<template>
	<div class="card">
		<div class="card__wrap">
			<div class="card__heart-wrap">
				<div class="card__heart" :class="item.bookmarked ? 'active' : ''">
					<v-icon :icon="item.bookmarked ? 'mdi-heart' : 'mdi-heart-outline'" a />
				</div>
			</div>
			<div class="card__img">
				<img :src="item.img" :alt="item.title" class="img">
			</div>
			<div class="card__content">
				<h3 class="card__content-title">{{item.title}}</h3>
				<div class="card__content-wrap">
					<div class="card__content-price">
						<p class="card__content-price-text">ЦЕНА:</p>
						<p class="card__content-price-value">{{item.price}} <span class="ruble-icon">₽</span></p>
					</div>
					<div class="card__content-add" :class="item.addedToBasket ? 'active' : ''" @click="updateProductsData(item.id, item.addedToBasket)">
						<v-icon :icon="item.addedToBasket ? 'mdi-check' : 'mdi-plus'" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.card{
		position: relative;
		border: 1px solid #F3F3F3;
		border-radius: 10px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		transition: all ease .2s;
		&:hover{
			transition: all ease .2s;
			border: 1px solid #F8F8F8;
			box-shadow: 0px 14px 30px 0px #0000000D;
		}
		&__wrap{
			display: flex;
			flex-direction: column;
			height: 100%;
		}
		&__heart-wrap{
			position: absolute;
			top: 20px;
			left: 20px;
		}
		&__heart{
			border: 1px solid #F2F2F2;
			border-radius: 8px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 6.5px;
			transition: all .2s ease;
			cursor: pointer;
			&:hover{
				border: 1px solid #D3D3D3;
				transition: all .2s ease;
				.v-icon{
					color: #D3D3D3;
					transition: all .2s ease;
				}
			}
			.v-icon{
				font-size: 20px;
				color: #F2F2F2;
				transition: all .2s ease;
			}
		}
		&__heart.active{
			background-color: #FEF0F0;
			border: 1px solid #FEF0F0;
			.v-icon{
				color: #FF8585;
			}
		}
		&__img{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 14px;
			flex: 1 0 auto;
			img{
				width: 133px;
			}
		}
		&__content-price{
			&-text{
				text-transform: uppercase;
				font-size: 12px;
				color: #BDBDBD;
				margin-bottom: 5px;
			}
			&-value{
				font-weight: 700;
				font-size: 14px;
				.ruble-icon {
					font-family: "Helvetica Neue", sans-serif;
				}
			}
		}
		&__content-title{
			margin-bottom: 14px;
			font-weight: 600;
		}
		&__content-wrap{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&__content-add{
			border: 1px solid #F2F2F2;
			border-radius: 8px;
			padding: 6px;
			cursor: pointer;
			transition: all .2s ease;
			&:hover{
				border: 1px solid #D3D3D3;
        transition: all .2s ease;
				.v-icon{
					color: #D3D3D3;
					transition: all .2s ease;
				}
			}
			.v-icon{
				font-size: 21px;
				color: #F2F2F2;
				transition: all .2s ease;
			}
		}
		&__content-add.active{
			background: linear-gradient(180deg, #89F09C 0%, #3CC755 100%);
			border: 1px solid #89F09C;
			.v-icon{
				color: #FFFFFF;
			}
		}
	}
</style>
