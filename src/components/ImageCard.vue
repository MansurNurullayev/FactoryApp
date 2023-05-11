<template>
  <router-link
    :to="`/details/${id}`"
    class="image-card"
    :style="{ backgroundImage: `url(${url})` }"
  ></router-link>
</template>

<script setup lang="ts">
  defineProps<{
    id: string
    url: string
  }>()
</script>

<style scoped lang="scss">
  .image-card {
    display: block;
    height: 335px;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #e0e0e0;

    border-radius: 8px;

    @media (min-width: 1025px) {
      height: 453px;
    }
  }
</style>
