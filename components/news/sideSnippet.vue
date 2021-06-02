<template>
  <nuxt-link :to="`/news/${article.id}`">
    <div class="article-side">
      <img class="article-side__image" v-if="article.mainImageUrl" :src="`${serverUrl}/${article.mainImageUrl}`"
           alt="Обложка новости">
      <h3 class="article-side__title">{{ article.title }}</h3>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  created() {
    this.serverUrl = process.env.serverUrl
  },
  data() {
    return {
      serverUrl: ''
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.article-side {
  &__image {
    width: 100%;
  }
}
</style>
