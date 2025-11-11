<template>
  <div class="home">
    <header-comp />
    <main class="main">
      <div class="container">
        <!-- <ModalReg /> -->
        <FilmCard v-if="randomMovie" :movie="randomMovie" @update-film="updateRandomFilm" />
        <div v-else class="error">Случайный фильм не найден</div>

        <h1 class="title">Топ 10 фильмов</h1>

        <div class="wrapperForCard">
          <router-link
            v-for="(movie, index) in topMovies"
            :key="movie.id"
            :to="`/movie/${movie.id}`"
            class="card-link"
          >
            <CardOnce :cardNumber="index + 1" :url="movie.posterUrl" :cardName="movie.title" />
          </router-link>
        </div>
      </div>
    </main>
    <footer-comp />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GanreCard from '@/components/GanreCard.vue'
import FirstButton from '../components/FirstButton.vue'
import CardOnce from '@/components/CardOnce.vue'
import FilmCard from '@/components/FilmCard.vue'
import { apiService, type Movie } from '@/services/api'
import { useRoute, useRouter } from 'vue-router'
import ModalReg from '@/components/modalReg.vue'
import headerComp from '@/components/headerComp.vue'
import footerComp from '@/components/footerComp.vue'
const route = useRoute()
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
const topMovies = ref<Movie[]>([])
const randomMovie = ref<Movie | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const isFavorite = ref(false) // Управляем состоянием из родителя

const updateRandomFilm = async () => {
  try {
    // Сбрасываем состояние избранного при обновлении фильма
    isFavorite.value = false
    randomMovie.value = await apiService.getMovieRandom()
  } catch (error) {
    console.error('Ошибка загрузки фильма:', error)
    randomMovie.value = null
  }
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

onMounted(async () => {
  try {
    topMovies.value = await apiService.getTopMovies()
    randomMovie.value = await apiService.getMovieRandom()
  } catch (err) {
    error.value = 'Ошибка загрузки данных'
    console.error('Ошибка загрузки:', err)
    randomMovie.value = null
  } finally {
    loading.value = false
    console.log('=== ЗАВЕРШЕНИЕ ЗАГРУЗКИ ===')
  }
})
</script>
<style scoped lang="scss">
@import '@/assets/scss/main.scss';
.wrapperForCard {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  // Новые стили для горизонтального скролла на 767px и ниже
  @media (max-width: 767px) {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    gap: 16px;
    padding: 10px 10px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .card-link {
      flex: 0 0 auto;
      width: 200px;

      // Убираем фон и тень у карточек в мобильной версии
      :deep(.wrapper) {
        width: 100%;
        height: 300px;
        background-color: transparent; // Убираем серый фон
        box-shadow: none; // Убираем тень
        border: none; // Убираем границу если есть
      }
    }
  }

  @media (max-width: 480px) {
    .card-link {
      width: 180px;

      :deep(.wrapper) {
        height: 270px;
      }
    }
  }

  @media (max-width: 360px) {
    .card-link {
      width: 160px;

      :deep(.wrapper) {
        height: 240px;
      }
    }
  }
}

.title {
  @include vp-767 {
    font-size: 24px;
    line-height: 32px;
    margin: 0;
  }
}

.loading,
.error {
  color: white;
  text-align: center;
  font-size: 18px;
  padding: 40px;
}
</style>
