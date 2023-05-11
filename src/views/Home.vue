<template>
  <div class="home-page">
    <form class="search" @submit.prevent="submit">
      <div class="bg-mask"></div>
      <search-bar v-model="model"></search-bar>
    </form>
    <div class="container">
      <div class="image-list">
        <image-card
          v-for="item in photoList"
          :id="item.id"
          :url="item.url"
        ></image-card>
      </div>
      <div ref="spinner" class="spinner">
        <img class="spinner-icon" src="@/assets/spinner.svg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import {
    useElementVisibility,
    useWindowScroll,
    watchThrottled,
  } from '@vueuse/core'
  import unsplashApi from '@/unsplash-api'

  import ImageCard from '@/components/ImageCard.vue'
  import SearchBar from '@/components/SearchBar.vue'

  type photoItem = {
    id: string
    url: string
  }
  const photoList: Ref<Array<photoItem>> = ref([])
  const model = ref('')
  const query = ref('')

  const spinner: Ref<HTMLElement | null> = ref(null)
  const spinnerIsVisible = useElementVisibility(spinner)
  watchThrottled(
    spinnerIsVisible,
    (value) => {
      if (value) fetch()
    },
    { throttle: 1000 }
  )

  const fetch = () => {
    unsplashApi.photos
      .getRandom({
        query: query.value,
        count: 9,
      })
      .then((res) => {
        const results = res.response as Array<{
          id: string
          urls: { regular: string }
        }>

        photoList.value = photoList.value.concat(
          results.map((item) => ({
            id: item.id,
            url: item.urls.regular,
          })) as photoItem[]
        )
      })
  }

  const submit = () => {
    query.value = model.value
    photoList.value = []
  }
</script>

<style scoped lang="scss">
  .search {
    position: relative;

    background-image: url('../assets/search-bg-mobile.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    padding: 80px 20px;

    display: flex;
    justify-content: center;

    @media (min-width: 1025px) {
      padding: 92px 20px;
      background-image: url('../assets/search-bg.png');
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 100%;
      height: 16px;
      width: 100%;

      background: #c4c4c4;
    }
  }

  .bg-mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .image-list {
    margin-top: calc(45px + 16px);
    display: grid;
    grid-template-columns: auto;
    grid-gap: 17px;

    @media (min-width: 1025px) {
      grid-template-columns: auto auto auto;
      grid-gap: 25px;
    }
  }

  .spinner {
    display: flex;
    justify-content: center;

    margin-top: 75px;
    margin-bottom: 44px;

    @media (min-width: 1025px) {
      margin-top: 100px;
      margin-bottom: 75px;
    }
  }
  .spinner-icon {
    height: 22px;
    width: 22px;

    animation-name: spinner;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
