<template>
  <div class="article">
    <h1 class="article__title">
      {{ article.title }}
    </h1>
    <div class="article__meta" v-if="article.author">
      <span>
        {{ $moment(article.updatedAt).format(" h:mm, D MMMM YYYY") }}
        • <nuxt-link :to="`/${authorRole}/${article.author.id}`">{{ article.author.name }}</nuxt-link>
      </span>
    </div>
    <img
      v-if="article.mainImageUrl"
      class="article__image_main"
      :src="mainImageUrl"
      :alt="article.title">
    <template v-if="article.blocks && article.blocks.blocks.length">
      <div v-for="(block, index) in article.blocks.blocks" :key="index">
        <div v-if="block.type === 'header'">
          <h2 class="article__subtitle">{{ block.data.text }}</h2>
        </div>
        <div v-else-if="block.type === 'paragraph'">
          <p class="article__paragraph" v-html="block.data.text"></p>
        </div>
        <div v-else-if="block.type === 'image'">
          <div class="article__image">
            <img :src="block.data.file.url" alt="Картинка статьи"/>
            <div class="article__image-caption" v-if="block.data.caption">{{ block.data.caption }}</div>
          </div>
        </div>
        <div v-else-if="block.type === 'list'">
          <ul class="article__list" v-if="block.data.items">
            <li v-for="(item, index) in block.data.items" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div v-else-if="block.type === 'quote'">
          <div class="article__quote">
            <p>{{ block.data.text }}</p>
            <div>- <i>{{ block.data.caption }}</i></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    },
    preview: {
      type: Boolean
    }
  },
  created() {
    this.serverUrl = process.env.serverUrl
    this.initArticle()
  },
  mounted() {
  },
  data() {
    return {
      serverUrl: '',
      mainImageUrl: ''
    }
  },
  methods: {
    initArticle() {
      if (this.preview) {
        this.parseArticleToPreview()
      } else {
        this.mainImageUrl = this.serverUrl + '/' + this.article.mainImageUrl
      }
    },
    parseArticleToPreview() {
      this.article.blocks = {}
      this.article.blocks.blocks = this.article.editorContent.blocks
      this.mainImageUrl = this.article.mainImage
    }
  },
  computed: {
    authorRole() {
      return this.article.authorRole === 3 ? 'publisher' : 'organization'
    },
    user() {
      return this.$store.state.auth.user
    }
  },
  watch: {
    article: {
      handler(val) {
        this.initArticle()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  color: #303133;
  padding-bottom: 20px;

  &__title {
    color: #000;
    text-align: center;
    margin-bottom: 15px;
  }

  &__meta {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }

  &__subtitle {
    margin-top: 40px;
    margin-bottom: 13px;
    font-size: 25px;
    line-height: 34px;
  }

  &__paragraph {
    margin: 0 0 20px;
    font-size: 21px;
    line-height: 28px;
    font-family: 'EB Garamond', serif;

    a {
      text-decoration: underline !important;
    }
  }

  &__image {
    margin-bottom: 20px;
    width: 100%;

    img {
      width: 100%;
      margin-bottom: 5px;
      object-fit: cover;
    }

    &_main {
      width: 100%;
      border-radius: 4px;
    }
  }

  &__image-caption {
    font-family: 'EB Garamond', serif;
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
  }

  &__list {
    margin: 0 0 20px;
    font-family: 'EB Garamond', serif;
    font-size: 20px;
    line-height: 28px;
    padding-left: 25px;

    li {
      margin-bottom: 5px;
    }
  }

  &__quote {
    font-family: 'EB Garamond', serif;
    margin: 0 0 20px;
    padding-left: 38px;
    font-size: 20px;
    line-height: 28px;
    position: relative;

    ::before {
      position: absolute;
      top: 5px;
      bottom: 7px;
      left: 0;
      width: 4px;
      content: "";
      border-radius: 2px;
      background-color: #ebebeb;
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
