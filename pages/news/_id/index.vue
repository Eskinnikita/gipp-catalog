<template>
  <div class="article-page">
    <div class="article__container">
      <article-view v-if="article" :article="article"/>
    </div>
  </div>
</template>

<script>
import articleView from "@/components/news/articleView"

export default {
  components: {
    articleView
  },
  created() {
    this.articleId = this.$route.params.id
    this.$store.dispatch('article/getArticle', this.articleId)
  },
  data() {
    return {
      articleId: null
    }
  },
  computed: {
    article() {
      return this.$store.state.article.article
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  &__container {
    padding: 30px 20px 40px 20px;
  }
}
</style>
