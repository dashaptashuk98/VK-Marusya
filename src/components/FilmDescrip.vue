<template>
  <div class="containerAll">
    <div class="containerSpecial">
      <div class="block-1">Язык оригинала</div>
      <span class="dotted-line"></span>
      <div class="block-2">{{ originalLanguage || 'Не указан' }}</div>
    </div>
    <div class="containerSpecial">
      <div class="block-1">Бюджет</div>
      <span class="dotted-line"></span>
      <div class="block-2">{{ formattedBudget }}</div>
    </div>
    <div class="containerSpecial">
      <div class="block-1">Выручка</div>
      <span class="dotted-line"></span>
      <div class="block-2">{{ formattedRevenue }}</div>
    </div>
    <div class="containerSpecial">
      <div class="block-1">Режиссёр</div>
      <span class="dotted-line"></span>
      <div class="block-2">{{ director || 'Не указан' }}</div>
    </div>
    <div class="containerSpecial">
      <div class="block-1">Продакшен</div>
      <span class="dotted-line"></span>
      <div class="block-2">{{ production || 'Не указано' }}</div>
    </div>
    <div class="containerSpecial">
      <div class="block-1">Награды</div>
      <span class="dotted-line"></span>
      <div class="block-2">{{ awards || 'Нет наград' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  originalLanguage: String,
  budget: Number,
  revenue: Number,
  director: String,
  production: String,
  awards: String,
})

const formattedBudget = computed(() => {
  if (!props.budget) return 'Нет данных'
  return `$${props.budget.toLocaleString()}`
})

const formattedRevenue = computed(() => {
  if (!props.revenue) return 'Нет данных'
  return `$${props.revenue.toLocaleString()}`
})
</script>

<style scoped lang="scss">
.containerAll {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  gap: 24px;
}

.containerSpecial {
  display: flex;
  align-items: center;
  width: 100%;
}

.block-1 {
  max-width: 500px;
  width: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Play';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  flex-shrink: 0;
}

.block-2 {
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: auto;
  font-family: 'Play';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
}

.dotted-line {
  flex-grow: 1;
  margin: 12px 10px 0;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
  height: 1px;
  min-width: 20px;
  flex-shrink: 1;
}
</style>
