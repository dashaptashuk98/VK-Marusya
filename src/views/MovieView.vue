<template>
  <div class="movie-page">
    <header-comp />
    <main class="main">
      <div class="container">
        <FilmCardSpecial v-if="movie" :movie="movie" />
        <div v-if="loading" class="loading">Загрузка фильма...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else-if="movie" class="movie-content">
          <h1 class="movie-title">О фильме</h1>

          <FilmDescrip
            :original-language="movie.language"
            :budget="parseNumber(movie.budget)"
            :revenue="parseNumber(movie.revenue)"
            :director="movie.director"
            :production="getProduction(movie)"
            :awards="movie.awards || 'Нет наград'"
          />
        </div>
        <div v-else class="empty">Фильм не найден</div>
      </div>
    </main>
    <footer-comp />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { apiService, type Movie } from '../services/api'
import FilmCardSpecial from '@/components/FilmCardSpecial.vue'
import FilmDescrip from '@/components/FilmDescrip.vue'
import headerComp from '@/components/headerComp.vue'
import footerComp from '@/components/footerComp.vue'
const isActive = ref(false)
const route = useRoute()
const movie = ref<Movie | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Функция для преобразования строк в числа
const parseNumber = (value: string | number | null | undefined): number | null => {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'number') return value
  const parsed = Number(value)
  return isNaN(parsed) ? null : parsed
}

// Функция для получения информации о продакшене
const getProduction = (movie: Movie) => {
  if (movie.production_companies && movie.production_companies.length > 0) {
    return movie.production_companies[0].name
  }
  if (movie.production_countries && movie.production_countries.length > 0) {
    return movie.production_countries[0].name
  }
  return 'Не указано'
}

onMounted(async () => {
  try {
    loading.value = true
    const movieId = Number(route.params.id)

    if (!movieId) {
      throw new Error('ID фильма не указан')
    }

    movie.value = await apiService.getMovieById(movieId)
  } catch (err) {
    error.value = 'Ошибка загрузки фильма'
    console.error('Ошибка:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped lang="scss">
.movie-page {
  color: white;
}

.movie-title {
  font-family: 'Play';
  font-size: 48px;
  margin-bottom: 30px;
}

.movie-content {
  margin-top: 40px;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {
  color: #ff4444;
}
</style>
