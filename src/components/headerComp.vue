<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <router-link to="/" class="header__left">
          <img
            v-if="!isMobile"
            class="header__left-img"
            src="/src/assets/images/маруся white.png"
            alt="Маруся"
          />
          <img
            v-if="isMobile"
            class="header__left-img"
            src="/src/assets/images/маруся whiteMobile.png"
            alt="Маруся"
          />
        </router-link>
        <div class="header__center">
          <router-link to="/" class="header__center-main" exact-active-class="active">
            <span class="text">Главная</span>
          </router-link>
          <router-link to="/genres" class="header__center-main" exact-active-class="active">
            <span class="text">Журнал</span>
            <img class="icon" src="/src/assets/images/mobile2.svg" alt="Журнал" />
          </router-link>
          <div class="form__search">
            <img
              v-if="!isMobile"
              class="header__center-img"
              src="/src/assets/images/Vector.svg"
              alt="Поиск"
            />
            <img
              v-if="isMobile"
              class="header__center-img"
              src="/src/assets/images/mobile3.svg"
              alt="Поиск"
            />
            <input
              type="text"
              class="header__center-search"
              placeholder="Поиск"
              v-show="!isMobile"
            />
          </div>
        </div>
        <button class="header__right">
          <span class="text">Войти</span>
          <img class="icon" src="/src/assets/images/mobile1.svg" alt="Войти" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 1023
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';
</style>
