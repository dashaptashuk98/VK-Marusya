<template>
  <div class="home">
    <header class="header">
      <div class="container">
        <div class="header__wrapper">
          <router-link to="/" class="header__left">
            <img class="header__left-img" src="/src/assets/images/маруся white.png" alt="Маруся" />
          </router-link>
          <div class="header__center">
            <router-link to="/" class="header__center-main" exact-active-class="active">
              Главная
            </router-link>
            <router-link
              to="/genres"
              class="header__center-main"
              :class="{
                active: $route.path.includes('/genres') || $route.path.includes('/genre/'),
              }"
            >
              Журнал
            </router-link>
            <div class="form__search">
              <img class="header__center-img" src="/src/assets/images/Vector.svg" alt="Поиск" />
              <input type="text" class="header__center-search" placeholder="Поиск" />
            </div>
          </div>
          <button class="header__right">Войти</button>
        </div>
      </div>
    </header>

    <main>
      <div class="container">
        <router-link to="/genres" class="title"> {{ getGenreName(genre) }}</router-link>

        <div class="movies-grid">
          <router-link
            :to="`/movie/${movie.id}`"
            v-for="movie in movies"
            :key="movie.id"
            class="movie-card"
          >
            <img :src="movie.posterUrl" :alt="movie.title" class="movie-poster" />
          </router-link>
        </div>
      </div>
    </main>

    <footer-comp />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Movie } from '@/services/api'
import footerComp from '@/components/footerComp.vue'

const route = useRoute()
const movies = ref<Movie[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const genre = computed(() => route.params.genre as string)

const getGenreName = (genre: string): string => {
  const genreTranslations: { [key: string]: string } = {
    history: 'История',
    horror: 'Ужасы',
    scifi: 'Научная фантастика',
    'stand-up': 'Стендап',
    fantasy: 'Фэнтези',
    drama: 'Драма',
    mystery: 'Мистика',
    family: 'Семейный',
    comedy: 'Комедия',
    romance: 'Романтика',
    music: 'Музыка',
    crime: 'Криминал',
    'tv-movie': 'ТВ фильм',
    documentary: 'Документальный',
    action: 'Боевик',
    thriller: 'Триллер',
    western: 'Вестерн',
    animation: 'Анимация',
    war: 'Военный',
    adventure: 'Приключения',
  }
  return genreTranslations[genre] || genre
}

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch(`https://cinemaguide.skillbox.cc/movie?genre=${genre.value}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    movies.value = await response.json()
    console.log(`Загружено ${movies.value.length} фильмов жанра ${genre.value}`)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
    console.error('Ошибка загрузки фильмов:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 64px 40px;
  margin-top: 20px;
}

.movie-card {
  display: flex;
  width: 100%;
  aspect-ratio: 2 / 3; // Сохраняем пропорции 2:3
  box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
  background-color: rgba(60, 60, 60, 1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
}

.movie-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: white;
}

.error {
  color: #ff4444;
}
</style>
