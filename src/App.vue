<template>
  <div class="zr-layout">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/scss/index';

body {
  font-family: 'Monserrat';
}

.zr-layout {
  @include mobile-layout;
  background-color: $woodsmoke;
}
</style>
