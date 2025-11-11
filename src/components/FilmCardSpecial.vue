<template>
  <div class="wrapper" v-if="props.movie">
    <div class="wrapperLeft">
      <div class="wrapperInner">
        <div class="ratingFilm" :class="ratingClass">
          <img src="../assets/images/star.svg" alt="" />
          <span class="ratingNumber">{{ props.movie.tmdbRating }}</span>
        </div>
        <span class="yearFilm">{{ props.movie.relaseYear }}</span>
        <span class="ganreFilm">{{ formattedGenres }}</span>
        <div class="filmTime">{{ formattedRuntime }}</div>
      </div>
      <p class="description">{{ props.movie.title }}</p>
      <span class="text">{{ props.movie.plot }}</span>
      <div class="buttomWrapper">
        <FirstButton variant="primary" size="small">Трейлер</FirstButton>
        <button class="base-class" @click="isActive = !isActive">
          <img v-if="!isActive" src="../assets/images/loveend.svg" alt="Добавить в избранное" />
          <img v-else src="../assets/images/lovewithbg.svg" alt="Удалить из избранного" />
        </button>
      </div>
    </div>
    <img
      :src="props.movie.posterUrl"
      :alt="props.movie.title"
      class="rightPhoto"
      width="680"
      height="552"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import FirstButton from './FirstButton.vue'
import type { Movie } from '@/services/api'
import { useRouter } from 'vue-router'

// Определение пропсов
interface Props {
  movie?: Movie
}

// Определение эмитов
const emit = defineEmits<{
  updateFilm: []
}>()

const props = defineProps<Props>()
const router = useRouter()
const isActive = ref(false)
const goToMoviePage = () => {
  if (props.movie?.id) {
    router.push(`/movie/${props.movie.id}`) // напрямую навигация
  }
}
// Вычисляемые свойства для форматирования данных
const formattedGenres = computed(() => {
  if (!props.movie?.genres) return 'Не указано'
  return Array.isArray(props.movie.genres) ? props.movie.genres.join(', ') : props.movie.genres
})

const formattedRuntime = computed(() => {
  if (!props.movie?.runtime) return 'Не указано'
  const hours = Math.floor(props.movie.runtime / 60)
  const minutes = props.movie.runtime % 60
  return hours > 0 ? `${hours}ч ${minutes}мин` : `${minutes}мин`
})

// Функция для обновления фильма - теперь просто эмитит событие
const updateFilm = () => {
  emit('updateFilm')
}

const ratingClass = computed(() => {
  const rating = props.movie?.tmdbRating || 0
  if (rating >= 8) return 'rating-high'
  if (rating >= 6) return 'rating-medium'
  if (rating >= 5) return 'rating-Toomedium'
  return 'rating-low'
})
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
}

.wrapperLeft {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin: 74px 0 122px 0;
  flex: 1;
}

.rightPhoto {
  width: 100%;
  height: auto;
  max-height: 552px;
  max-width: 680px;
}

.description {
  font-family: 'Play';
  font-style: normal;
  font-weight: 700;
  max-width: 600px;
  font-size: 48px;
  line-height: 56px;
  color: #ffffff;
  margin: 0;
}

button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  outline: none;
}

.ratingFilm {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 16px;

  background-color: rgba(51, 51, 51, 1); // цвет по умолчанию

  &.rating-high {
    background-color: rgba(165, 148, 0, 1);
  }

  &.rating-medium {
    background-color: rgba(48, 142, 33, 1);
  }

  &.rating-Toomedium {
    background-color: rgba(119, 119, 119, 1);
  }

  &.rating-low {
    background-color: rgba(200, 32, 32, 1);
  }
}

.text {
  font-family: 'Play';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 44px;
}

.base-class {
  background-color: rgba(51, 51, 51, 1);
  border: 1px solid var(--content-placeholder, rgba(0, 0, 0, 0.4));
  border-radius: 28px;
  padding: 16px 22px;
  cursor: pointer;

  &__icon {
    fill: none;
    stroke: white;
    stroke-width: 1;
  }

  &--active &__icon {
    fill: #9e5fc4;
    stroke: #9e5fc4;
    stroke-width: 2;
  }
}
.wrapperInner {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  align-items: center;
}

.ratingFilm {
  width: auto;
  height: auto;
  max-width: 100px;
}

.yearFilm,
.ganreFilm,
.filmTime {
  font-family: 'Play';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.7);
}

.buttomWrapper {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.loading {
  color: white;
  font-size: 18px;
  padding: 20px;
}
</style>
