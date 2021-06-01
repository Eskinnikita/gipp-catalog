<template>
  <div class="article-page">
    <div class="article__container">
      <div v-if="isUserArticleAuthor" class="article__controls">
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
  head() {
    return {
      title: this.article.title,
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {
          hid: 'description',
          name: 'description',
          content: 'Увлечения современной молодежи, проживающей в городе Москва весьма разнообразны. ' +
            'Проводимые опросы показывают, что большинство респондентов помимо посещения учебных заведений ' +
            'и работы регулярно уделяют время различным хобби.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'ГИПП, Гильдия Издателей, Детские СМИ, Детские журналы'
        }
      ],
      link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
    }
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
    },
    user() {
      return this.$store.state.auth.user
    },
    isUserArticleAuthor() {
      if(this.user) {
        return this.article.authorRole === this.user.role && this.article.authorId === this.user.id || this.user.role === 4
      } else {
        return false
      }
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
