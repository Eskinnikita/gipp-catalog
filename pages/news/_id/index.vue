<template>
  <div class="article">
    <div class="article__container">
      <div v-if="isUserArticleAuthor" class="article__controls">
        <el-button type="primary" @click="goToArticleEditor">Редактировать</el-button>
        <el-button @click="$refs.confirmModal.opened = true" type="text">Удалить</el-button>
      </div>
      <article-view v-if="article" :preview="false" :article="article"/>
      <el-divider></el-divider>
      <comment-section :comment-info="commentInfo" v-if="user"/>
      <template v-else>
        <p style="text-align: center">Войдите, чтобы оставить комментарий!</p>
      </template>
      <el-divider></el-divider>
      <div class="article__comments">
        <template   v-if="article.Comments && article.Comments.length">
          <comment-snippet class="article__comment" v-for="(comment, index) in article.Comments.slice().reverse()" :key="index" :comment-info="comment"/>
        </template>
      </div>
    </div>
    <confirm-dialog ref="confirmModal" :on-confirm="deleteArticle" title="Подтверждение">
      Вы уверены, что хотите удалить новость?
    </confirm-dialog>
  </div>
</template>

<script>
import articleView from "@/components/news/articleView"
import commentSection from "@/components/news/commentSection"
import commentSnippet from "@/components/news/commentSnippet"
import confirmDialog from "@/components/modals/confirmDialog"

export default {
  components: {
    articleView,
    commentSection,
    commentSnippet,
    confirmDialog
  },
  created() {
    this.articleId = this.$route.params.id
    this.$store.dispatch('article/getArticle', this.articleId)
  },
  data() {
    return {
      articleId: null,
    }
  },
  methods: {
    goToArticleEditor() {
      this.$router.push({path: `/editor/${this.article.id}`})
    },
    deleteArticle() {
      this.$store.dispatch('article/deleteArticle', this.article.id).then(() => {
        this.$router.push({path: `/news`});
      })
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
      if (this.user) {
        return this.article.authorRole === this.user.role && this.article.authorId === this.user.id || this.user.role === 4
      } else {
        return false
      }
    },
    commentInfo() {
      return {
        articleId: +this.articleId,
        authorId: this.user.id,
        authorRole: this.user.role
      }
    }
  },
  beforeDestroy() {
    this.$store.commit('article/SET_EMPTY_ARTICLE')
  },
  head() {
    if(this.article.title) {
      return {
        title: `${this.article.title} | ${process.env.appName}`,
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.article {
  &__container {
    padding: 30px 20px 60px 20px;
  }

  &__controls {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  &__comments {
    width: 100%;
    max-width: 650px;
    margin: 20px auto;
  }

  &__comment {
    margin-bottom: 25px;
  }

  &__comment-textarea {
    textarea {
      min-height: 100px !important;
      font-size: 14px !important;
    }
  }
}

@media (max-width: 575.98px) {
  .article {
    &__title {
      margin-top: 10px;
      font-size: 22px;
    }

    &__subtitle {
      font-size: 20px;
      line-height: 25px;
    }

    &__paragraph {
      font-size: 18px;
      line-height: 24px;
    }
  }
}
</style>
