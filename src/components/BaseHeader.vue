<template>
  <header class="base-header">
    <div class="container">
      <img
        class="logo"
        src="@/assets/logo.svg"
        alt="Art Gallery San Francisco Logo"
      />
      <nav class="navigation">
        <router-link v-if="homeLink" class="nav-link" to="/">
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.8596 22.1821L15.8614 15.1838C17.315 13.5699 18.2084 11.442 18.2084 9.10414C18.2083 4.08416 14.1242 0 9.10418 0C4.08416 0 0 4.08416 0 9.10418C0 14.1242 4.08416 18.2084 9.10418 18.2084C11.442 18.2084 13.5699 17.315 15.1839 15.8614L22.1821 22.8596C22.2756 22.9532 22.3983 23 22.5209 23C22.6435 23 22.766 22.9532 22.8597 22.8596C23.0468 22.6724 23.0468 22.3692 22.8596 22.1821ZM9.10418 17.25C4.61294 17.25 0.958363 13.5959 0.958363 9.10418C0.958363 4.61249 4.61294 0.958318 9.10418 0.958318C13.5954 0.958318 17.25 4.61244 17.25 9.10418C17.25 13.5959 13.5954 17.25 9.10418 17.25Z"
              fill="currentColor"
            />
          </svg>
          <span class="nav-link__text">Поиск</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const homeLink = computed(() => route.name !== 'home')
  const favoriteLink = computed(() => route.name !== 'favorite')
</script>

<style scoped lang="scss">
  .base-header {
    padding: 24px 0;
    background: #000000;

    position: sticky;
    top: 0;
    z-index: 9999;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .logo {
    height: 33px;
    @media (min-width: 1025px) {
      height: 44px;
    }
  }

  .navigation {
    display: flex;

    > *:not(:last-child) {
      margin-right: 21px;

      @media (min-width: 1025px) {
        margin-right: 38px;
      }
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: white;
  }

  .nav-link__image {
    height: 23px;
    width: 23px;
  }

  .nav-link__text {
    margin-left: 10px;
    display: none;

    font-weight: 400;
    font-size: 20px;
    line-height: 23px;

    @media (min-width: 1025px) {
      display: inline;
    }
  }
</style>
