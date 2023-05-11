<template>
  <div class="details-page">
    <div class="bg-pic" :style="{ backgroundImage: `url(${pic})` }"></div>
    <div class="container">
      <div class="header">
        <div class="author">
          <img class="author__image" :src="authorImage" />
          <div class="author__name">
            <div class="name__primary">
              {{ authorName }}
            </div>
            <div class="name__secondary">
              {{ authorTwitterLabel }}
            </div>
          </div>
        </div>
        <div class="actions">
          <a
            :href="pic"
            class="details-button download-button"
            target="_blank"
            download
          >
            <svg
              width="21"
              height="19"
              viewBox="0 0 21 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 8.70508C20.2242 8.70602 20.0008 8.92914 20 9.20508V15.5151C19.9977 16.3424 19.3273 17.0126 18.5 17.0151H2.5C1.67266 17.0126 1.00234 16.3424 1 15.5151V9.20508C1 8.92898 0.77625 8.70508 0.5 8.70508C0.22375 8.70508 0 8.92898 0 9.20508V15.5151C0.000625 16.8955 1.11953 18.0145 2.5 18.0151H18.5C19.8805 18.0145 20.9994 16.8955 21 15.5151V9.20508C20.9992 8.92914 20.7758 8.70602 20.5 8.70508Z"
                fill="currentColor"
              />
              <path
                d="M6.84013 11.56L10.0201 14.285C10.0229 14.285 10.0251 14.2873 10.0251 14.29L10.0401 14.305C10.0451 14.31 10.0551 14.315 10.0601 14.32C10.065 14.3263 10.0722 14.3298 10.0801 14.33C10.0851 14.335 10.0951 14.34 10.1001 14.345C10.1051 14.35 10.1151 14.35 10.1201 14.355C10.1251 14.36 10.1351 14.36 10.1451 14.365C10.1501 14.37 10.1601 14.37 10.1651 14.375C10.1751 14.38 10.1801 14.38 10.1901 14.385C10.1951 14.385 10.2051 14.39 10.2101 14.39C10.2201 14.39 10.2251 14.395 10.2351 14.395C10.2401 14.395 10.2501 14.4 10.2551 14.4C10.2651 14.4 10.2751 14.405 10.2851 14.405H10.4151C10.4251 14.405 10.4351 14.4 10.4451 14.4C10.4501 14.4 10.4601 14.395 10.4651 14.395C10.4751 14.395 10.4801 14.39 10.4901 14.39C10.4951 14.39 10.5051 14.385 10.5101 14.385C10.5201 14.38 10.5251 14.38 10.5351 14.375C10.5401 14.37 10.5501 14.37 10.5551 14.365C10.5651 14.36 10.5701 14.36 10.5801 14.355C10.5851 14.35 10.5951 14.35 10.6001 14.345C10.6051 14.34 10.6151 14.335 10.6201 14.33C10.6251 14.325 10.6301 14.325 10.6401 14.32C10.6451 14.315 10.6551 14.31 10.6601 14.305L10.6751 14.29C10.6779 14.29 10.6801 14.2877 10.6801 14.285L13.8601 11.56C14.0701 11.3805 14.0947 11.0648 13.9151 10.855C13.7358 10.6452 13.4201 10.6205 13.2101 10.8L10.8501 12.82V0.5C10.8501 0.22375 10.6264 0 10.3501 0C10.0739 0 9.85013 0.22375 9.85013 0.5V12.82L7.49013 10.8C7.28013 10.6205 6.96451 10.6452 6.78513 10.855C6.6056 11.0648 6.63013 11.3805 6.84013 11.56Z"
                fill="currentColor"
              />
            </svg>
            <span class="details-button__text">Download</span>
          </a>
        </div>
      </div>
      <div class="pic-wrapper">
        <img class="pic" :src="pic" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'

  import unsplashApi from '@/unsplash-api'

  const route = useRoute()

  const authorImage = ref('')
  const authorName = ref('')

  const authorTwitter = ref('')
  const authorTwitterLabel = computed(() => {
    if (!authorTwitter.value) return ''
    return '@' + authorTwitter.value
  })

  const pic = ref('')

  onMounted(() => {
    unsplashApi.photos.get({ photoId: String(route.params.id) }).then((res) => {
      const { user } = res.response || {}
      authorImage.value = user?.profile_image.medium || ''
      authorName.value = user?.username || ''
      authorTwitter.value = user?.twitter_username || ''

      const { urls } = res.response || {}
      pic.value = urls?.full || ''
    })
  })
</script>

<style scoped lang="scss">
  .details-page {
    padding-top: 40px;
    padding-bottom: 102px;

    position: relative;
  }

  .bg-pic {
    display: none;
    height: 774px;
    width: 100%;

    position: absolute;
    top: 0;

    filter: grayscale(100%);
    z-index: -1;

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &::after {
      content: '';

      position: absolute;
      width: 100%;
      height: 100%;

      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
    }

    @media (min-width: 1025px) {
      display: block;
    }
  }

  .header {
    display: flex;
    align-items: center;

    margin-bottom: 32px;
  }

  .author {
    display: flex;
    align-items: center;
  }

  .author__image {
    height: 48px;
    width: 48px;
    border-radius: 8px;

    @media (min-width: 1025px) {
      height: 55px;
      width: 55px;

      border: 1px solid white;
    }
  }

  .author__name {
    margin-left: 11px;
  }

  .name__primary {
    font-size: 18px;
    line-height: 21px;

    @media (min-width: 1025px) {
      font-size: 30px;
      line-height: 36px;

      color: white;
    }
  }

  .name__secondary {
    color: #bdbdbd;
    font-size: 14px;
    line-height: 17px;

    @media (min-width: 1025px) {
      font-size: 18px;
      line-height: 21px;

      color: white;
    }
  }

  .actions {
    margin-left: auto;

    display: flex;
    align-items: center;

    > *:not(:last-child) {
      margin-right: 17px;
    }
  }

  .details-button {
    padding: 11px;

    height: 41px;
    min-width: 41px;

    border-radius: 8px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: white;

    cursor: pointer;
  }

  .download-button {
    background: #fff200;

    @media (min-width: 1025px) {
      padding: 11px 22px;
    }
  }

  .details-button__text {
    display: none;

    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    margin-left: 16px;

    @media (min-width: 1025px) {
      display: inline;
    }
  }

  .pic-wrapper {
    display: flex;
    justify-content: center;
  }
  .pic {
    width: 100%;
    border-radius: 8px;

    @media (min-width: 1025px) {
      width: auto;
      height: 744px;
    }
  }
</style>
