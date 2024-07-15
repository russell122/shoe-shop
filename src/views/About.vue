<script setup>
	import Menu from "@/components/Menu.vue";

</script>

<template>
	<h1>About</h1>

	<div class="about">
		<div class="container">
			<div class="about__wrap">

				<Menu/>

			</div>
		</div>
	</div>


</template>

<style lang="scss">
	.about {
		padding-top: 50px;
		&__wrap{
			display: flex;
			background-color: #F3F4F6;
			padding: 20px;
		}
	}
</style>
