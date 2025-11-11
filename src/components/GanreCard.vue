<template>
  <div @click="goToGenreMovies" class="wrapper">
    <img :src="url" alt="" />
    <div class="cardName">{{ cardName }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  cardName: string
  url: string
  genreKey?: string
}

const props = defineProps<Props>()
const router = useRouter()

const goToGenreMovies = () => {
  if (props.genreKey) {
    router.push(`/genre/${props.genreKey}`)
  }
}
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  max-width: 328px;
  min-height: 304px;
  box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
  flex-direction: column;
  background-color: rgba(60, 60, 60, 1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px;
}
.cardName {
  padding: 22px 24px 30px;
  background-color: #000;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  display: flex;

  justify-content: center;
  color: rgba(255, 255, 255, 1);
  font-family: 'Play';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
}
img {
  border-radius: 24px;
  height: 220px;
}
</style>
