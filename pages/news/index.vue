<template>
  <div class="news">
    <div class="news__filters">
      <news-filter/>
    </div>
    <div class="news__content">
      <div class="news__header news-header">
        <h3 class="news__title">Новости</h3>
        <el-input class="news-header__search" type="text" placeholder="Поиск" prefix-icon="el-icon-search"
                  v-model="search"/>
      </div>
      <div
        class="news__publications-container"
      >
        <template v-if="articles.rows && articles.rows.length">
          <article-snippet
            v-for="(article, index) in articles.rows"
            :key="index"
            :article="article"
            :show-author="true"
          />
        </template>
      </div>
      <div class="news__pagination">
        <!--        <el-pagination-->
        <!--          @current-change="handleCurrentChange"-->
        <!--          :pager-count="7"-->
        <!--          :current-page="+params.page"-->
        <!--          layout="pager"-->
        <!--          :total="publications.count">-->
        <!--        </el-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
import newsFilter from '@/components/filters/newsFilter'
import articleSnippet from "@/components/news/articleSnippet"

export default {
  layout: 'transparent',
  components: {
    newsFilter,
    articleSnippet
  },
  created() {
    this.$store.dispatch('article/getAllArticles', this.params)
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    articles() {
      return this.$store.state.article.articles
    }
  }
}
</script>

<style lang="scss" scoped>
.news {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__title {
    margin-bottom: 10px;
    font-weight: normal;
  }

  &__content {
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px 30px 30px 30px;
  }

  &__publications-container {

  }

  &__pagination {
    display: flex;
    justify-content: center;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__article {
    margin-bottom: 20px;
  }
}

.news-header {
  &__search {
    max-width: 40%;
    min-width: 20%;
  }
}
</style>
