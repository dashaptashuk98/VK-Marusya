<template>
  <button
    :class="[
      'app-button',
      `app-button--${variant}`,
      `app-button--${size}`,
      { 'app-button--disabled': disabled },
    ]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

export interface Props {
  variant: 'primary' | 'secondary'
  type?: 'button' | 'submit'
  disabled?: boolean
  size?: 'small' | 'medium'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  size: 'small',
})

// defineEmits<{
//   click: [event: MouseEvent]
// }>()
</script>

<style scoped lang="scss">
.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 48px;
  border: 1px solid var(--content-placeholder, rgba(0, 0, 0, 0.4));
  border-radius: 28px;
  cursor: pointer;
  font-family: 'Play', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;

  color: #ffffff;
  box-sizing: border-box;
  transition: all 0.3s ease;
  text-decoration: none;

  &--small {
    padding: 16px 48px;
    font-size: 18px;
  }

  &--medium {
    padding: 16px 48px;
    font-size: 18px;
    width: 100%;
    max-width: 340px;
  }

  // Варианты стилей
  &--secondary {
    background-color: rgba(57, 59, 60, 1);
    color: white;

    &:hover:not(.app-button--disabled) {
      background-color: rgba(116, 116, 116, 1);
    }
    &.app-button--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      color: rgba(255, 255, 255, 0.5);
      background-color: rgba(116, 116, 116, 1);
    }
  }

  &--primary {
    background-color: rgba(103, 165, 235, 1);
    color: white;
    transition: all 1s ease;
    &:hover:not(.app-button--disabled) {
      background-color: rgba(255, 255, 255, 1);
      color: #000;
    }
    &.app-button--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      color: rgba(255, 255, 255, 0.5);
      background-color: rgba(69, 82, 110, 1);
    }
  }
}
</style>
