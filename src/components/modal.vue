<template>
  <div class="modal modal--active">
    <div class="modal__wrapper">
      <div class="modal__content">
        <img src="../assets/images/марусяWhite.svg" alt="" class="modal__logo" />
        <div class="modal__form">
          <div class="modal__wrap">
            <div class="modal-input">
              <input class="modal-input__field" type="text" placeholder="Электронная почта" />
              <img
                class="modal-input__logo"
                src="../assets/images/mail.svg"
                alt=""
                height="24"
                width="24"
              />
            </div>
            <div class="modal-input">
              <input class="modal-input__field" type="text" placeholder="Пароль" />
              <img
                class="modal-input__logo"
                src="../assets/images/key.svg"
                alt=""
                height="24"
                width="24"
              />
            </div>
          </div>
        </div>
        <form class="modal__inner">
          <FirstButton variant="primary" size="medium">Вход</FirstButton>
          <a href="" class="modal-inner__link">Регистрация</a>
        </form>
      </div>
      <button class="modal__close" aria-label="Закрыть форму">
        <img
          src="../assets/images/close.svg"
          alt="Закрыть"
          class="modal__close-icon"
          width="24"
          height="24"
        />
      </button>
    </div>
    <div class="modal__all"></div>
    <div class="modal__success">
      <div class="modal__content">
        <div class="modal__inside">
          <div class="modal__all">
            <span class="modal__thanks">Спасибо!</span>
            <p class="modal__text">Мы получили ваш запрос и скоро свяжемся с вами.</p>
            <button class="modal__btn btn modal__btn--small">Хорошо</button>
          </div>
        </div>
        <button class="modal__close-btn" aria-label="Закрыть форму"></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FirstButton from './FirstButton.vue'
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  z-index: 3;

  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }

  &__close {
    position: absolute;
    top: calc(50% - 222px);
    left: calc(50% + 230px);
    width: 48px;
    height: 48px;
    background: #ffffff;
    border-radius: 24px;
    padding: 12px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;

    @include vp-1023 {
      /* На планшетах позиционируем относительно viewport */
      top: 40px;
      left: auto;
      right: 40px;
    }

    @include vp-767 {
      top: 20px;
      right: 20px;
      width: 32px;
      height: 32px;
      padding: 8px;
    }
  }

  &__close-icon {
    width: 24px;
    height: 24px;

    @include vp-767 {
      width: 16px;
      height: 16px;
    }
  }

  &__logo {
    margin: auto auto 40px;
  }

  &__title {
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    text-align: center;
    margin: 0 0 83px;
    color: black;

    @include vp-1023 {
      font-size: 26px;
      line-height: 32px;
      margin: 0 0 53px;
    }

    @include vp-767 {
      font-size: 20px;
      line-height: 20px;
      margin: 0 auto;
      margin-bottom: 43px;
      width: 180px;
    }
  }

  &__add {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: grey;

    @include vp-767 {
      font-size: 10px;
      line-height: 12px;
      text-align: center;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__icon {
    display: block;
    position: absolute;
    bottom: 80px;
    left: 130px;
    opacity: 50%;

    @include vp-1023 {
      opacity: 1;
      bottom: 110px;
      left: 20px;
    }

    @include vp-767 {
      display: none;
    }
  }

  &-inner__link {
    margin: auto;
    font-family: 'Play';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
  }

  &__plane {
    position: absolute;
    display: block;
    right: 160px;
    bottom: 40px;
    opacity: 50%;

    @include vp-1023 {
      opacity: 1;
      right: 40px;
      bottom: 0px;
    }

    @include vp-767 {
      display: none;
    }
  }

  &-input {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }

  &__icon3 {
    position: absolute;
    top: 149px;
    left: -34px;
    width: 100%;

    @include vp-1023 {
      top: 231px;
      left: -50px;
    }

    @include vp-767 {
      top: 192px;
      left: -31px;
    }
  }

  &__icon2 {
    position: absolute;
    top: 174px;
    right: -37px;
    width: 100%;

    @include vp-1023 {
      top: 257px;
      right: -21px;
    }

    @include vp-767 {
      top: 217px;
      right: -38px;
    }
  }

  &__thanks {
    font-weight: 600;
    font-size: 32px;
    line-height: 36px;
    color: $color-nero;
    text-align: center;
    display: block;
    margin: 0;

    @include vp-1023 {
      font-size: 26px;
      line-height: 32px;
    }

    @include vp-767 {
      font-size: 20px;
      line-height: 20px;
    }
  }

  &__all {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;

    @include vp-767 {
      gap: 15px;
      padding-top: 10px;
    }
  }

  &__inside {
    width: 100%;
    padding: 244px 0 90px 0;

    @include vp-1023 {
      padding: 324px 0 168px 0;
    }

    @include vp-767 {
      padding: 277px 0 122px 0;
    }
  }

  &__photos {
    display: flex;
  }

  &__text {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: $color-nero;
    margin: 0 0 20px;
    text-align: center;

    @include vp-767 {
      font-size: 13px;
      line-height: 16px;
      width: 160px;
      margin: 0 0 15px;
    }
  }

  &-input__field {
    border: 1px solid var(--content-placeholder, rgba(0, 0, 0, 0.4));
    width: 100%;
    position: relative;
    padding: 16px 16px 16px 56px;
    height: 52px;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: var(--content-placeholder, rgba(0, 0, 0, 0.4));
    border-radius: 8px;
    user-select: none;

    @include vp-1023 {
      width: 100%;
    }
  }

  &-input__field::placeholder {
    color: grey;
  }

  &-input__field:hover {
    border: 1px solid purple;
  }

  &-input__field:focus {
    border: 1px solid purple;
    outline: none;
  }

  &-input__logo {
    position: absolute;
    pointer-events: none;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }

  &__wrap {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 12px;

    @include vp-1023 {
      flex-direction: column;
      gap: 43px;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0 0 24px;

    @include vp-1023 {
      margin: 0 0 30px;
      gap: 43px;
    }
  }

  &-input__place {
    border: 1px solid blue;
    width: 100%;
    border-radius: 8px;
    resize: none;
    height: 160px;
    padding: 16px;
  }

  &-input__place::placeholder {
    color: grey;
  }

  &-input__place:hover {
    border: 1px solid purple;
  }

  &-input__place:focus {
    border: 1px solid purple;
    outline: none;
  }

  &__wrapper {
    position: relative;
    display: flex;
    overflow-y: auto;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 40px;
    display: none;

    @include vp-1023 {
      padding: 0px;
      align-items: flex-start;
      padding-top: 80px; /* Добавляем отступ сверху для крестика */
    }

    @include vp-767 {
      padding-top: 60px;
    }
  }

  &__content {
    position: relative;
    width: 100%;
    border-radius: 40px;
    max-width: 420px;
    max-height: 445px;
    margin: auto;
    padding: 64px 40px;
    background-color: white;

    @include vp-1023 {
      height: auto;
      border-radius: 20px;
      max-height: none;
      margin: 0 40px;
    }

    @include vp-767 {
      padding: 40px 20px;
      border-radius: 16px;
      margin: 0 20px;
    }
  }

  &__close-btn {
    position: absolute;
    top: 12px;
    right: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    padding: 0;
    background-color: whitesmoke;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
    }

    @include vp-1023 {
      top: 20px;
      right: 20px;
      width: 48px;
      height: 48px;
    }

    @include vp-767 {
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
    }
  }

  &-input__error {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: red;
  }

  &-input--error .modal-input__field:hover {
    border: 1px solid red;
  }

  &-input--error .modal-input__field:focus {
    border: 1px solid red;
  }

  &__close-btn:hover {
    background-color: lightsalmon;
  }

  &__close-btn:focus {
    background-color: chartreuse;
  }

  &__btn {
    margin: 0 auto;

    @include vp-1023 {
      width: 300px;
      font-size: 14px;
      line-height: 18px;
    }

    @include vp-767 {
      width: 100%;
    }

    @include vp-767 {
      font-size: 12px;
      line-height: 16px;
    }
  }

  &__btn--small {
    width: 200px;

    @include vp-767 {
      width: 160px;
    }
  }

  &__success {
    position: relative;
    display: flex;
    overflow-y: auto;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 40px;
    display: none;

    @include vp-1023 {
      padding: 0px;
      align-items: flex-start;
      padding-top: 80px;
    }

    @include vp-767 {
      padding-top: 60px;
    }
  }

  &--active {
    display: block;
  }

  &--active .modal__wrapper {
    display: flex;
  }

  &--success {
    display: block;
  }

  &--success .modal__success {
    display: block;
  }

  &__btn.btn.modal__btn--small:hover {
    background-color: white;
    color: purple;
  }

  &__btn.btn.modal__btn--small:focus {
    background-color: wheat;
  }
}

.modal-input__field:disabled {
  background: wheat;
}

.modal-input__field:disabled:hover {
  border: 1px solid blue;
  outline: none;
}

.modal-input__field:disabled + .decoration-input__label {
  color: white;
}

.modal-input__place:disabled + .decoration-input__label {
  color: white;
}

.modal-input--error .modal-input__field {
  border: 1px solid red;
}
</style>
