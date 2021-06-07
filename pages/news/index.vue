<template>
  <div class="news">
    <div class="news__filters">
      <news-filter class="news__filter" ref="filters"/>
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
        <template v-else>
          Ничего не найдено!
        </template>
      </div>
      <div class="news__pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="+params.page"
          layout="pager"
          :page-size="articles.limit"
          :total="articles.count"
        >
        </el-pagination>
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
    const obj = this.$route.query
    if (obj && Object.keys(obj).length === 0 && obj.constructor === Object) {
      this.$router.push({path: `/news`, query: {page: '1'}});
    } else {
      if (this.$route.query.page) {
        this.params.page = this.$route.query.page
      }
      if (this.$route.query.search) {
        this.search = this.$route.query.search
        this.params.search = this.$route.query.search
      }
      if (this.$route.query.types) {
        this.params.types = this.$route.query.types
      }
    }
    this.$store.dispatch('article/getAllArticles', this.params)
  },
  mounted() {
    this.setQueryValues(['types'])
    this.$watch(
      "$refs.filters.parameters.types",
      (new_value, old_value) => {
        this.params.types = new_value
      },
    );
  },
  data() {
    return {
      search: '',
      params: {
        page: '1',
        search: '',
        types: []
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.params.page = `${val}`
    },
    applyFilters() {
      this.$router.push({path: '/news', query: this.params})
      this.$store.dispatch('article/getAllArticles', this.params)
    },
    sendSearchString() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.params.search = this.search.trim().toLowerCase()
      }, 800);
    },
    setQueryValues(keys) {
      keys.forEach(key => {
        if (this.$route.query[key]) {
          if(Array.isArray(this.$route.query[key])) {
            this.$refs.filters.parameters[key] = this.$route.query[key]
          } else {
            this.$refs.filters.parameters[key] = [this.$route.query[key]]
          }
        }
      })
    },
  },
  computed: {
    articles() {
      return this.$store.state.article.articles
    }
  },
  watch: {
    params: {
      handler(val) {
        console.log(val)
        this.applyFilters()
      },
      deep: true
    },
    search() {
      this.sendSearchString()
    }
  },
  head() {
    return {
      title: `Новости | ${process.env.appName}`
    }
  },
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

@media (max-width: 575.98px) {
  .news {
    flex-direction: column;

    &__filter {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  .news-header {
    &__search {
      max-width: 100%;
      margin-left: 25px;
    }
  }
}
</style>
