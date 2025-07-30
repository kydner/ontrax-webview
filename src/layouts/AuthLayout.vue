<template>
  <div>
    <div class="auth-layout__container">
      <!-- right side -->
      <div class="right-side tw-w-full tw-h-screen tw-overflow-y-auto">
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full">
          <div class="tw-p-4 md:tw-p-0 tw-text-center tw-my-4">
            <h1 class="tw-font-semibold tw-text-4xl md:tw-text-5xl tw-my-4">Login</h1>
            <p class="tw-text-sm md:tw-text-base tw-text-secondary-text">Welcome Back, You’ve been Missed !</p>
          </div>
          <div class="tw-w-full tw-max-w-[30rem] tw-p-4 md:tw-p-0">
            <router-view />
          </div>

          <div class="tw-p-4 md:tw-p-0 md:tw-max-w-[30rem] tw-text-center"></div>
        </div>
      </div>
      <!-- end right side -->
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
$top-position: 35vh;

.auth-layout__container {
  @apply tw-relative tw-flex md:tw-flex-row tw-h-screen tw-items-center tw-justify-start;
  &::before {
    content: '';
    position: absolute;
    background: url('~assets/images/base-background.svg');
    background-repeat: no-repeat;
    background-size: cover;
    color: rgb(var(--color-surface));
    inset: 0;
    top: 0;
  }
}

.left-side {
  position: relative;
  background: linear-gradient(133deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-secondary)) 100%);
  @apply tw-hidden md:tw-block tw-h-screen tw-grow;
}
.left-side__content {
  .content-title {
    position: absolute;
    top: $top-position;
    font-size: 2.25rem;
    font-weight: 500;
  }
  &::before {
    content: '';
    position: absolute;
    // background: url('~assets/images/logo-login-background.svg');
    background-repeat: no-repeat;
    background-size: cover;
    color: rgb(var(--color-primary));
    inset: 0;
    top: $top-position;
  }
}
</style>
