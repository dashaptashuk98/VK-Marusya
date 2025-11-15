<!-- headerComp.vue -->
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
            <!-- Десктопная версия поиска -->
            <img
              v-if="!isMobile"
              class="header__center-img"
              src="/src/assets/images/Vector.svg"
              alt="Поиск"
            />
            <input
              v-if="!isMobile"
              type="text"
              class="header__center-search"
              placeholder="Поиск"
              v-model="searchQuery"
              @input="handleSearch"
              @focus="showResults = true"
              @blur="onBlur"
            />

            <!-- Мобильная версия - иконка поиска -->
            <img
              v-if="isMobile"
              class="header__center-img mobile-search-icon"
              src="/src/assets/images/mobile3.svg"
              alt="Поиск"
              @click="openMobileSearch"
            />

            <!-- Результаты поиска (общие для обеих версий) -->
            <div v-if="showResults && searchResults.length > 0" class="search-results">
              <div class="search-results__list">
                <router-link
                  v-for="movie in searchResults"
                  :key="movie.id"
                  :to="`/movie/${movie.id}`"
                  class="search-result-item"
                  @mousedown.prevent="selectMovie(movie)"
                >
                  <img :src="movie.posterUrl" :alt="movie.title" class="result-poster" />
                  <div class="result-info">
                    <h4>{{ movie.title }}</h4>
                    <p>{{ movie.year }}</p>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- Состояния загрузки -->
            <div v-if="showResults && loading" class="search-loading">Поиск...</div>
            <div v-if="showResults && error" class="search-error">{{ error }}</div>
            <div
              v-if="showResults && searchQuery && !loading && searchResults.length === 0"
              class="search-empty"
            >
              Ничего не найдено
            </div>
          </div>
        </div>
        <button class="header__right">
          <span class="text">Войти</span>
          <img class="icon" src="/src/assets/images/mobile1.svg" alt="Войти" />
        </button>
      </div>
    </div>

    <!-- Мобильное поле поиска (появляется поверх header) -->
    <div v-if="isMobile && showMobileSearch" class="mobile-search-overlay">
      <div class="mobile-search-container">
        <div class="mobile-search-header">
          <button class="mobile-search-back" @click="closeMobileSearch">
            <img src="/src/assets/images/close.svg" alt="Назад" />
          </button>
          <div class="mobile-search-input-wrapper">
            <img class="search-icon" src="/src/assets/images/Vector.svg" alt="Поиск" />
            <input
              type="text"
              class="mobile-search-input"
              placeholder="Поиск фильмов..."
              v-model="searchQuery"
              @input="handleSearch"
              ref="mobileSearchInput"
              autofocus
            />
            <button v-if="searchQuery" class="mobile-search-clear" @click="clearSearch">×</button>
          </div>
        </div>

        <!-- Результаты поиска для мобильной версии -->
        <div class="mobile-search-results">
          <div v-if="loading" class="mobile-search-loading">Поиск...</div>
          <div v-else-if="error" class="mobile-search-error">{{ error }}</div>
          <div
            v-else-if="searchQuery && !loading && searchResults.length === 0"
            class="mobile-search-empty"
          >
            Ничего не найдено для "{{ searchQuery }}"
          </div>
          <div v-else-if="searchResults.length > 0" class="mobile-search-results-list">
            <router-link
              v-for="movie in searchResults"
              :key="movie.id"
              :to="`/movie/${movie.id}`"
              class="mobile-search-result-item"
              @click="closeMobileSearch"
            >
              <img :src="movie.posterUrl" :alt="movie.title" class="mobile-result-poster" />
              <div class="mobile-result-info">
                <h4>{{ movie.title }}</h4>
                <p>{{ movie.year }} • {{ getGenresText(movie.genres) }}</p>
              </div>
            </router-link>
          </div>
          <div v-else class="mobile-search-placeholder">Начните вводить название фильма...</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { apiService, type Movie } from '@/services/api'

const router = useRouter()
const isMobile = ref(false)
const searchQuery = ref('')
const searchResults = ref<Movie[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const showResults = ref(false)
const showMobileSearch = ref(false)
const mobileSearchInput = ref<HTMLInputElement>()

// Поиск с задержкой
let searchTimeout: number | null = null

const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (searchQuery.value.trim().length >= 2) {
    console.log(searchQuery.value.trim())

    loading.value = true
    error.value = null
    searchTimeout = setTimeout(performSearch, 500)
  } else {
    searchResults.value = []
    loading.value = false
  }
}
const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    loading.value = false
    return
  }

  try {
    const results = await apiService.searchMovies(searchQuery.value)
    searchResults.value = results
  } catch (err) {
    error.value = 'Ошибка при поиске'
    searchResults.value = []
  } finally {
    loading.value = false
  }
}

const selectMovie = (movie: Movie) => {
  searchQuery.value = ''
  searchResults.value = []
  showResults.value = false
  showMobileSearch.value = false
  router.push(`/movie/${movie.id}`)
}

const onBlur = () => {
  setTimeout(() => {
    showResults.value = false
  }, 200)
}

const openMobileSearch = () => {
  showMobileSearch.value = true
  nextTick(() => {
    mobileSearchInput.value?.focus()
  })
}

const closeMobileSearch = () => {
  showMobileSearch.value = false
  searchQuery.value = ''
  searchResults.value = []
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  mobileSearchInput.value?.focus()
}

const getGenresText = (genres: string[] | undefined) => {
  if (!genres || genres.length === 0) return ''
  return genres.slice(0, 2).join(', ')
}

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 1023
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.form__search {
  position: relative;
}

.mobile-search-icon {
  cursor: pointer;
}

.mobile-search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 10000;
  animation: slideIn 0.3s ease;
}

.mobile-search-container {
  background: #1a1a1a;
  min-height: 100vh;
  padding-top: 20px;
}

.mobile-search-header {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: #2a2a2a;
  border-bottom: 1px solid #333;
}

.mobile-search-back {
  background: none;
  border: none;
  padding: 8px;
  margin-right: 12px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    filter: invert(1);
  }
}

.mobile-search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: #3a3a3a;
  border-radius: 20px;
  padding: 8px 16px;
  position: relative;
}

.mobile-search-input {
  flex: 1;
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  padding: 0 12px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
}

.search-icon {
  width: 18px;
  height: 18px;
}

.mobile-search-clear {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: white;
  }
}

.mobile-search-results {
  padding: 20px 16px;
}

.mobile-search-results-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-search-result-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #2a2a2a;
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: background 0.2s;

  &:active {
    background: #3a3a3a;
  }
}

.mobile-result-poster {
  width: 50px;
  height: 75px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 16px;
}

.mobile-result-info {
  flex: 1;

  h4 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }
}

.mobile-search-loading,
.mobile-search-error,
.mobile-search-empty,
.mobile-search-placeholder {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
}

.mobile-search-error {
  color: #ff4444;
}

/* Анимация */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin-top: 8px;
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.search-results__list {
  padding: 8px 0;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  color: white;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }
}

.result-poster {
  width: 40px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
}

.result-info {
  flex: 1;

  h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
}

.search-loading,
.search-error,
.search-empty {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin-top: 8px;
  z-index: 1000;
  font-size: 14px;
}

.search-loading,
.search-empty {
  color: rgba(255, 255, 255, 0.7);
}

.search-error {
  color: #ff4444;
}
</style>
