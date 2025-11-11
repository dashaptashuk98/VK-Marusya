<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <router-link to="/" class="header__left">
          <img class="header__left-img" src="/src/assets/images/маруся white.png" alt="Маруся" />
        </router-link>
        <div class="header__center">
          <router-link to="/" class="header__center-main" exact-active-class="active">
            Главное
          </router-link>
          <router-link
            to="/genres"
            class="header__center-main"
            :class="{ active: $route.path.includes('/genres') || $route.path.includes('/genre/') }"
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
      <h1 class="title">Жанры фильмов</h1>
      <div class="containerGenre">
        <GanreCard
          v-for="(genreName, index) in genres"
          :key="index"
          :cardName="getGenreName(genreName)"
          :url="getImageUrl(genreName)"
          :genreKey="genreName"
        />

        <div v-if="loading" class="loading">Загрузка жанров...</div>

        <div v-if="error" class="error">Ошибка загрузки жанров: {{ error }}</div>

        <div v-if="!loading && genres.length === 0" class="empty">Жанры не найдены</div>
      </div>
    </div>
  </main>
  <footer class="footer">
    <div class="container">
      <div class="footer__wrapper">
        <a href="#" class="footer__nav">
          <img src="/src/assets/images/vk.svg" alt="ВКонтакте" class="footer__img" />
        </a>
        <a href="#" class="footer__nav">
          <img src="/src/assets/images/ok.svg" alt="Одноклассники" class="footer__img" />
        </a>
        <a href="#" class="footer__nav">
          <img src="/src/assets/images/telegram.svg" alt="Telegram" class="footer__img" />
        </a>
        <a href="#" class="footer__nav">
          <img src="/src/assets/images/youtube.svg" alt="YouTube" class="footer__img" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import GanreCard from '@/components/GanreCard.vue'
import { apiService } from '@/services/api'
import { ref, onMounted } from 'vue'

const genres = ref<string[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Заглушки для картинок жанров (на английском)
const defaultGenreImages: { [key: string]: string } = {
  history:
    'https://s9.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2022/04/veshhij-oleg.jpg',
  horror:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSiKyQM91t_62UmEX3zqg-gZM3EQKo7KKR4Q&s',
  scifi:
    'https://habrastorage.org/getpro/geektimes/post_images/e2a/4aa/f68/e2a4aaf68dfda5b22a653da7ae636c4a.jpg',
  'stand-up': 'https://meridiancentre.ru/upload/iblock/680/bwb0niir3ekymuo70duvnf11wzvngvzs.png',
  fantasy:
    'https://s7.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2021/02/dom-strannyh-detej-miss-peregrin.jpg',
  drama:
    'https://irecommend.ru/sites/default/files/imagecache/copyright1/user-images/158404/AB26vwj2L7HACvPwppEOLw.jpeg?s=mBm5I',
  mystery: 'https://cs14.pikabu.ru/post_img/big/2022/06/07/11/1654626592134071793.jpg',
  family:
    'https://s5.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2023/02/kruiz-po-dzhunglyam.jpg',
  comedy:
    'https://media.istockphoto.com/id/2150168341/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B2%D0%B5%D1%81%D0%B5%D0%BB%D0%B0%D1%8F-%D0%BF%D0%B0%D1%80%D0%B0-%D1%81%D0%BC%D0%B5%D0%B5%D1%82%D1%81%D1%8F-%D0%B2%D0%BE-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F-%D0%BA%D0%B8%D0%BD%D0%BE%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0-%D0%B2-%D0%BA%D0%B8%D0%BD%D0%BE%D1%82%D0%B5%D0%B0%D1%82%D1%80%D0%B5.jpg?s=612x612&w=0&k=20&c=5cG3haqessVl3miGVSHIcvcoQNY5XDMCqJ8kXyScCAw=',
  romance:
    'https://afisha.bigmir.net/i/62/37/39/9/6237399/gallery/0b9b00e36a683d75cb96d7cbca894ef5-quality_75Xresize_1Xallow_enlarge_0Xw_800Xh_0.jpg',
  music: 'https://samesound.ru/wp-content/uploads/2017/10/20-movies-about-music-whiplash.jpg',
  crime:
    'https://s7.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2023/02/odinnadczat-druzej-oushena.jpg',
  'tv-movie':
    'https://prostotv.com/wp-content/uploads/2024/10/filmy-posmotret-s-detmi-1024x640.jpg',
  documentary:
    'https://s3.eu-central-1.amazonaws.com/life4me.plus/uploads/photos/1496068221_592c307d3a7c4.jpeg',
  action: 'https://s9.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2020/10/26.jpg',
  thriller:
    'https://avatars.mds.yandex.net/i?id=4ce629bb155aadf7b6625d2cd5be5a95008359f7-16281568-images-thumbs&n=13',
  western: 'https://s4.afisha.ru/mediastorage/76/26/fbf3a0ef6ad3458baa8144b92676.jpg',
  animation: 'https://www.film.ru/sites/default/files/images/Toy%20Story%203.jpg',
  war: 'https://avatars.mds.yandex.net/get-kinopoisk-post-img/1374145/46c883450857753c844cb7433eb5068d/960x540',
  adventure:
    'https://pw.artfile.me/wallpaper/05-03-2013/650x407/jack-the-giant-slayer-kino-filmy-priklyu-705302.jpg',
}

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

const getImageUrl = (genre: string) => {
  return defaultGenreImages[genre] || 'https://picsum.photos/300/200'
}

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    genres.value = await apiService.getGenres()
    console.log('Загружено жанров:', genres.value)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
    console.error('Ошибка загрузки жанров:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';
.loading,
.error,
.empty {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
}

.error {
  color: #ff4444;
}

.containerGenre {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
