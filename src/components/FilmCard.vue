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
        <FirstButton variant="secondary" size="small" @click="goToMoviePage">О фильме</FirstButton>
        <button class="base-class" @click="toggleFavorite">
          <img
            v-if="!localIsActive"
            src="../assets/images/loveend.svg"
            alt="Добавить в избранное"
          />
          <img v-else src="../assets/images/lovewithbg.svg" alt="Удалить из избранного" />
        </button>
        <button class="base-class" @click="updateFilm">
          <img src="/src/assets/images/Vectorhu.svg" alt="Обновить" />
        </button>
      </div>
    </div>
    <img :src="props.movie.posterUrl" :alt="props.movie.title" class="rightPhoto" />
  </div>
  <div class="wrapper" v-else>
    <div class="wrapperLeft">
      <div class="loading">Загрузка фильма...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import FirstButton from './FirstButton.vue'
import type { Movie } from '@/services/api'
import { useRouter } from 'vue-router'

interface Props {
  movie?: Movie
  isFavorite?: boolean
}

const emit = defineEmits<{
  updateFilm: []
  toggleFavorite: []
}>()

const props = defineProps<Props>()
const router = useRouter()
const localIsActive = ref(false)

const toggleFavorite = () => {
  localIsActive.value = !localIsActive.value
  emit('toggleFavorite')
}

const goToMoviePage = () => {
  if (props.movie?.id) {
    router.push(`/movie/${props.movie.id}`)
  }
}

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

// Функция для обновления фильма
const updateFilm = () => {
  localIsActive.value = false
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
@import '@/assets/scss/main.scss';
.wrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  gap: 40px;
  align-items: flex-start;
  width: 100%;

  @include vp-1023 {
    flex-direction: column-reverse;
  }

  @include vp-767 {
    margin-bottom: 0px;
  }
}

.wrapperLeft {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin: 74px 0 122px 0;
  flex: 1;
  min-width: 0;

  @include vp-1023 {
    margin: 0 0 122px 0;
  }

  @include vp-767 {
    gap: 12px;
    margin-bottom: 56px;
  }
}

.rightPhoto {
  flex: 0 0 auto;
  width: 40%; // или нужный процент
  max-width: 680px;
  height: auto;
  max-height: 552px;
  object-fit: cover;
  border-radius: 8px;

  @include vp-1023 {
    width: 100%;
    max-width: none;
  }

  @include vp-767 {
    max-height: 234px;
  }
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

  @include vp-767 {
    font-size: 24px;
    line-height: 32px;
  }
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

.text {
  font-family: 'Play';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 44px;

  @include vp-767 {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 32px;
  }
}

.base-class {
  background-color: rgba(51, 51, 51, 1);
  border: 1px solid var(--content-placeholder, rgba(0, 0, 0, 0.4));
  border-radius: 28px;
  padding: 16px 22px;
  cursor: pointer;
}

.wrapperInner {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  align-items: center;
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

  @include vp-767 {
    padding: 4px 12px;
  }
}

.ratingNumber {
  font-family: 'Play';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
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

  @include vp-767 {
    font-size: 14px;
    line-height: 20px;
  }
}

.buttomWrapper {
  display: flex;
  flex-direction: row;
  gap: 16px;

  @media (max-width: 1130px) {
    flex-wrap: wrap;

    :nth-child(1),
    :nth-child(2) {
      flex: 1;
      min-width: calc(50% - 8px);
    }

    :nth-child(n + 3) {
      flex: 0 0 auto;
    }

    &::after {
      content: '';
      width: 100%;
      order: 1;
    }

    :nth-child(n + 3) {
      order: 2;
    }

    // Центрируем вторую строку
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @include vp-1023 {
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 5px;
  }

  // Новые стили для 767px и ниже
  @media (max-width: 767px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 12px;

    // Только первая кнопка (Трейлер) в первой строке
    :nth-child(1) {
      width: 100%;
      order: 1;
      flex: none;
    }

    :nth-child(n + 2) {
      order: 2;
    }

    &::after {
      display: none;
    }
  }
}
.loading {
  color: white;
  font-size: 18px;
  padding: 20px;
}
</style>
