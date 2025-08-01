<template>
  <div>
    <div class="auth-layout__container">
      <div class="tw-w-full tw-h-screen tw-overflow-y-auto">
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full">
          <div class="tw-pb-4 md:tw-p-0 tw-text-center tw-mb-4">
            <div class="tw-font-semibold tw-text-4xl md:tw-text-5xl tw-mb-4">Login</div>
            <p class="tw-text-sm md:tw-text-base tw-text-secondary-text">Welcome Back, You’ve been Missed !</p>
          </div>
          <div class="tw-w-full tw-max-w-[30rem] tw-p-4 md:tw-p-0">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
.auth-layout__container {
  @apply tw-relative tw-flex md:tw-flex-row tw-h-screen tw-items-center tw-justify-start;
  &::before {
    background: url('~assets/images/base-background.svg');
    @apply tw-content-['-'] tw-absolute tw-bg-no-repeat md:tw-bg-repeat-x tw-bg-cover tw-text-surface tw-inset-0 tw-top-0;
  }
}
</style>
