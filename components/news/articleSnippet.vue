<template>
  <div class="article-snippet">
    <div class="article-snippet__avatar">
      <el-avatar
        class="article-snippet__avatar-image"
        size="large"
        icon="el-icon-user-solid"
        :src="logoUrl"
      />
    </div>
    <div class="article-snippet__content">
      <div class="article-snippet__author-header">
        <nuxt-link :to="`${authorRole}/${article.author.id}`">
          <span class="article-snippet__author-name">{{ article.author.name }}</span>
        </nuxt-link>
        <span>{{ $moment(article.updatedAt).fromNow(true) }} назад</span>
      </div>
      <div class="article-snippet__article-info article-info">
        <nuxt-link :to="`/news/${article.id}`">
          <h2 class="article-info__title">{{ article.title }}</h2>
        </nuxt-link>
        <img class="article-info__main-image" :src="`${serverUrl}/${article.mainImageUrl}`" alt="">
        <div class="article-info__read">
          <nuxt-link :to="`/news/${article.id}`">
            <el-button type="text">Читать далее</el-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
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
  },
  computed: {
    logoUrl() {
      return this.serverUrl + '/' + this.article.author.logoUrl
    },
    authorRole() {
      return this.article.authorRole === 3 ? 'publisher' : 'organization'
    }
  }
}
</script>

<style lang="scss" scoped>
.article-snippet {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 10px;

  ::after {
    content: "";
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #8c939d;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &__avatar {
    margin-right: 10px;
  }

  &__author-header {
    margin-bottom: 10px;
    font-size: 14px;
  }

  &__author-name {
    font-size: 16px;
    margin-right: 10px;
  }
}

.article-info {
  &__title {
    margin-bottom: 10px;
  }

  &__main-image {
    object-fit: cover;
    height: 280px;
    width: 75%;
  }
}
</style>
