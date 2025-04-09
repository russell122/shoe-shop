<script setup>
import Menu from '@/components/Menu.vue';

</script>

<template>
  <h1>About</h1>

  <div class="about sect">
    <div class="container">
      <div class="about__wrap">

        <Menu />

      </div>

      <!--			<div class="control">-->
      <!--				<div class="control__body">-->
      <!--					<h2>Открытый диалог бизнеса и органов контроля</h2>-->
      <!--					<p>Больше возможностей в цифровом профиле</p>-->
      <!--				</div>-->
      <!--				<div class="control__circle-1"></div>-->
      <!--				<div class="control__circle-2"></div>-->
      <!--&lt;!&ndash;				<div class="ttt"></div>&ndash;&gt;-->
      <!--&lt;!&ndash;				<div class="kk"></div>&ndash;&gt;-->
      <!--			</div>-->

    </div>
  </div>


</template>

<style lang="scss">
.about {
  padding-top: 50px;

  &__wrap {
    display: flex;
    background-color: #F3F4F6;
    padding: 20px;
    margin-bottom: 40px;
  }
}

.control {
  width: 300px;
  height: 400px;
  background-color: silver;
  position: relative;
  overflow: hidden;

  &__body {
    padding: 40px 20px 20px 20px;
    position: relative;
    z-index: 100;

    h2 {
      font-size: 24px;
      margin-bottom: 30px;
    }
  }

  &__circle-1 {
    position: absolute;
    top: -40px;
    left: -20px;
    width: 150px;
    height: 150px;
    background-color: orange;
    border-radius: 50%;
  }

  &__circle-2 {
    width: 100px;
    height: 100px;
    background-color: orange; /* Основной цвет круга */
    border-radius: 50%;
    position: relative;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.8); /* Легкое внутреннее свечение */
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: inset 0 0 30px 20px rgba(255, 255, 255, 0.5);
    }
  }
}

.kk {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 100px;
  height: 100px;
  background-color: orange;
  border-radius: 50%;
}

.ttt {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.41);
  box-shadow: 0 4px 30px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3.3px);
  -webkit-backdrop-filter: blur(3.3px);
  //border: 1px solid rgba(255, 248, 248, 0.41);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
}
</style>
