<script setup>

</script>

<template>
	<v-empty-state
			headline="Упс, 404"
			title="Страница не найдена"
			text="Страница, которую вы искали, не существует"
			image="/NotFound.jpg"
	></v-empty-state>
</template>

<style lang="scss">
  .v-empty-state{
	  min-height: auto;
	  padding: 40px 0;
  }
  .v-empty-state__media .v-responsive{
	  margin-bottom: 20px;
  }
</style>
