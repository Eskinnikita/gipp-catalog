<template>
  <div class="article-page">
    <div class="article__container">
      <div class="article__controls">
        <el-button type="primary" @click="goToArticleEditor">Редактировать</el-button>
        <el-button type="text">Удалить</el-button>
      </div>
      <article-view v-if="article" :preview="false" :article="article"/>
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
  methods: {
    goToArticleEditor() {
      this.$router.push({path: `/editor/${this.article.id}`})
    }
  },
  computed: {
    article() {
      return JSON.parse(JSON.stringify(this.$store.state.article.article))
    }
  },
  beforeDestroy() {
    this.$store.commit('article/SET_EMPTY_ARTICLE')
  }
}
</script>

<style lang="scss" scoped>
.article {
  &__container {
    padding: 30px 20px 40px 20px;
  }

  &__controls {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
}
</style>
