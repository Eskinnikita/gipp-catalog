<template>
  <div class="main-news">
    <div class="main-news__left">
      <img class="main-news__main-image" :src="`${serverUrl}/${articles[0].mainImageUrl}`" alt="Главная обложка">
      <h4 class="main-news__title">{{ articles[0].title }}</h4>
      <nuxt-link :to="`/news/${articles[0].id}`">
        <el-button type="text" class="main-news__read-more">Читать далее</el-button>
      </nuxt-link>
    </div>
    <div class="main-news__right">
      <div class="main-news__side" v-if="index !== 0" v-for="(article, index) in articles" :key="index">
        <h4 class="main-news__title">{{ article.title }}</h4>
        <nuxt-link :to="`/news/${article.id}`">
          <el-button type="text" class="main-news__read-more">Читать далее</el-button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  created() {
    this.serverUrl = process.env.serverUrl
  },
  data() {
    return {
      serverUrl: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.main-news {
  display: flex;
  justify-content: space-between;

  &__left {

  }

  &__right {
    max-width: 250px;
    min-width: 230px;
    margin-left: 30px;
  }

  &__main-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    margin-bottom: 5px;
  }

  &__title {
    font-weight: normal;
  }
}
</style>
