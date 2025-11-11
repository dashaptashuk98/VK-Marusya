<template>
  <div class="wrapper">
    <div class="cardNumber">{{ cardNumber }}</div>
    <img :src="url" alt="" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  cardName: String,
  url: String,
  cardNumber: Number,
  movieId: Number,
})
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  display: flex;
  width: 100%;
  aspect-ratio: 2 / 3;
  box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
  background-color: rgba(60, 60, 60, 1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
}

.cardNumber {
  padding: 8px 24px;
  background-color: rgba(255, 255, 255, 1);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Play';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #6a5dc2;
  border-radius: 50px;
  position: absolute;
  top: -12px;
  left: -12px;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 6px 18px;
    height: 40px;
    font-size: 20px;
    line-height: 28px;
    top: -10px;
    left: -10px;
  }

  @media (max-width: 480px) {
    padding: 4px 12px;
    height: 32px;
    font-size: 16px;
    line-height: 24px;
    top: -8px;
    left: -8px;
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}
</style>
