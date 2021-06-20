<template>
  <nuxt-link :to="`/news/${article.id}`">
    <div class="article-side">
      <img class="article-side__image" v-if="article.mainImageUrl" :src="`${serverUrl}/${article.mainImageUrl}`"
           alt="Обложка новости">
      <span class="article-side__title">{{ article.title }}</span>
    </div>
    <el-divider></el-divider>
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
  margin-bottom: 15px;
  &__image {
    height: 130px;
    object-fit: cover;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 5px;
  }

  &__title {
    font-size: 14px;
    color: #303133;
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    -ms-line-clamp: 2;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    display: -webkit-box;
    display: box;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    box-orient: vertical;
  }
}
</style>
