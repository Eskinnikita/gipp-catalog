<template>
  <div class="catalog">
    <div class="catalog__filters">
      <el-button @click="toggleFilters"
                 style="width: 100%"
                 class="catalog__filter-button"
                 type="primary"
                 plain>
        <template v-if="!showFilters">Показать фильтры</template>
        <template v-else>Скрыть фильтры</template>
      </el-button>
      <catalog-filter v-if="showFilters" class="catalog__filter" ref="filters"/>
    </div>
    <div class="catalog__content">
      <div class="catalog__header catalog-header">
        <h3 class="catalog__title">Каталог</h3>
        <el-input class="catalog-header__search" type="text" placeholder="Поиск" prefix-icon="el-icon-search"
                  v-model="search"/>
      </div>
      <div
        v-if="publications.rows && publications.rows.length"
        class="catalog__publications-container"
        :style="{'justify-content': publications.rows.length > 3 ? 'space-between' : 'flex-start'}"
      >
        <cover-snippet
          v-for="(publication, index) in publications.rows"
          :key="index"
          :publication="publication"
          route="/publication"
        />
      </div>
      <template v-else>
        Ничего не найдено!
      </template>
      <div class="catalog__pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="+params.page"
          layout="pager"
          :page-size="publications.limit"
          :total="publications.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import coverSnippet from "@/components/snippets/coverSnippet"
import catalogFilter from "@/components/filters/catalogFilter"

export default {
  layout: 'transparent',
  components: {
    coverSnippet,
    catalogFilter
  },
  created() {
    if (process.browser) {
      this.onResize()
      window.addEventListener('resize', this.onResize)
    }
    if (this.$route.query.page) {
      this.params.page = this.$route.query.page
    }
    if (this.$route.query.types) {
      this.params.types = this.$route.query.types
    }
    if (this.$route.query.age) {
      this.params.age = this.$route.query.age
    }
    if (this.$route.query.search) {
      this.search = this.$route.query.search
      this.params.search = this.$route.query.search
    }
    this.$store.dispatch('publication/getAllPublications', this.params)
  },
  mounted() {
    this.setQueryValues(['types', 'age'])
    this.$watch(
      "$refs.filters.parameters.types",
      (new_value, old_value) => {
        this.params.types = new_value
      },
    );
    this.$watch(
      "$refs.filters.parameters.age",
      (new_value, old_value) => {
        this.params.age = new_value
      },
    );
    this.$watch(
      "$refs.filters.parameters.tags",
      (new_value, old_value) => {
        this.params.tags = new_value
      },
    );
  },
  data() {
    return {
      showFilters: true,
      search: '',
      params: {
        search: '',
        page: '1',
        types: [],
        age: [],
        tags: []
      }
    }
  },
  methods: {
    onResize() {
      this.showFilters = window.innerWidth > 815;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    handleCurrentChange(val) {
      this.params.page = `${val}`
    },
    applyFilters() {
      if (this.params.search) {
        this.params.search = this.params.search.toLocaleLowerCase()
      }
      this.$router.push({path: '/catalog', query: this.params})
      this.$store.dispatch('publication/getAllPublications', this.params)
    },
    setQueryValues(keys) {
      keys.forEach(key => {
        if (this.$route.query[key]) {
          if (Array.isArray(this.$route.query[key])) {
            this.$refs.filters.parameters[key] = this.$route.query[key]
          } else {
            this.$refs.filters.parameters[key] = [this.$route.query[key]]
          }
        }
      })
    },
    sendSearchString() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.params.search = this.search
      }, 800);
    },
  },
  computed: {
    publications() {
      return this.$store.state.publication.publications
    }
  },
  watch: {
    params: {
      handler(val) {
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
      title: `Издания | ${process.env.appName}`,
      meta: [
        {
          hid: 'catalog-description',
          name: 'description',
          content: 'Полный каталог детских изданий СППИ ГИПП с указанием описания, характеристик и тематик.'
        },
        {
          hid: 'catalog-keywords',
          name: 'keywords',
          content: 'каталог изданий, десткие журналы, подписной каталог детских изданий, подписаться на журнал, детские сми'
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

.catalog {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__filter-button {
    display: none;
    margin-bottom: 15px;
  }

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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-gap: 2rem;
    justify-content: space-between;
    margin-bottom: 20px;
    height: auto;
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
}

.catalog-header {
  &__search {
    max-width: 40%;
    min-width: 20%;
  }
}


@media (max-width: 575.98px) {
  .catalog {
    flex-direction: column;

    &__filter {
      width: 100%;
      margin-bottom: 20px;
    }

    &__publications-container {
      grid-gap: 1rem;
      grid-template-columns: repeat(auto-fill, 120px);
    }

    &__filter-button {
      display: block;
    }
  }

  .catalog-header {
    &__search {
      max-width: 100%;
      margin-left: 25px;
    }
  }
}

@media (min-width: 576px) and (max-width: 815px) {
  .catalog {
    flex-direction: column;

    &__filter-button {
      display: block;
    }

    &__filter {
      width: 100%;
      margin-bottom: 20px;
    }

    &__publications-container {
      grid-template-columns: repeat(auto-fill, 130px);
    }
  }
}

@media (min-width: 815px) and (max-width: 1000px) {

}

</style>
