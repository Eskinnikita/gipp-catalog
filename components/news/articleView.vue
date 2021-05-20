<template>
  <div class="article" >
    <h1 class="article__title">
      {{article.title}}
    </h1>
    <div class="article__meta">
      <span>
        {{$moment(article.updatedAt).format(" h:mm, D MMMM YYYY")}} • {{article.author.name}}
      </span>
    </div>
    <img
      v-if="article.mainImageUrl"
      class="article__main-image"
      :src="getImageUrl(article.mainImageUrl)"
      :alt="article.title">
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object
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
  methods: {
    getImageUrl(url) {
      return this.serverUrl + '/' + url
    }
  }
}
</script>

<style lang="scss" scoped>
  .article {
    &__title {
      color: #000;
      text-align: center;
      margin-bottom: 15px;
    }

    &__main-image {
      width: 100%;
    }

    &__meta {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }
  }
</style>
