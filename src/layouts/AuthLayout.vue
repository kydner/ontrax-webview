<template>
  <div class="auth-layout__container">
    <div class="auth-layout__inner">
      <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full">
        <!-- Title -->
        <div class="auth-layout__title">
          <h1 class="tw-font-semibold tw-text-4xl tw-text-white md:tw-text-5xl tw-mb-8">Login</h1>
          <p class="tw-text-sm md:tw-text-secondary-text">Welcome Back, You’ve been Missed !</p>
        </div>

        <!-- Form -->
        <div class="auth-layout__form">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.auth-layout__container {
  max-width: $max-page-width !important;
  @apply tw-relative tw-container tw-mx-auto tw-w-full tw-min-h-screen tw-px-6;

  &::before {
    content: '';
    background: url('~assets/images/home-background.svg');
    @apply tw-absolute tw-inset-0 tw-bg-no-repeat md:tw-bg-repeat-x tw-bg-contain;
    z-index: -1;
  }

  &::after {
    content: '';
    background: linear-gradient(180deg, #2d2d33 0%, #0c0c0f 100%);
    @apply tw-absolute tw-inset-0;
    z-index: -2;
  }
}

.auth-layout__inner {
  @apply tw-w-full tw-h-screen tw-overflow-y-auto;
}

.auth-layout__title {
  @apply tw-text-center tw-mb-6 tw-text-secondary-text;
}

.auth-layout__form {
  @apply tw-w-full tw-my-8;
}
</style>
