<template>
  <div class="profile-news">
    <template v-if="articles.length">
      <article-snippet
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
        :show-author="false"
      />
    </template>
    <template v-else>
      Список пуст
    </template>
  </div>
</template>

<script>
import articleSnippet from "@/components/news/articleSnippet"
export default {
  components: {
    articleSnippet
  },
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-news {
}
</style>
