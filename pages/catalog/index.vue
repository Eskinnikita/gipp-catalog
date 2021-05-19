<template>
  <div class="catalog">
    <div class="catalog__filters">
      <catalog-filter ref="filters"/>
    </div>
    <div class="catalog__content">
      <div class="catalog__header catalog-header">
        <h3 class="catalog__title">Каталог</h3>
        <el-input class="catalog-header__search" type="text" placeholder="Поиск" prefix-icon="el-icon-search" v-model="params.search"/>
      </div>
      <div
        class="catalog__publications-container"
        :style="{'justify-content': publications.length > 3 ? 'space-between' : 'flex-start'}"
      >
        <cover-snippet
          v-for="(publication, index) in publications.rows"
          :key="index"
          :publication="publication"
          route="/publication"
        />
      </div>
      <div class="catalog__pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :pager-count="7"
          :current-page="+params.page"
          layout="pager"
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
  },
  data() {
    return {
      params: {
        search: '',
        page: '1',
        types: [],
        age: []
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.params.page = `${val}`
    },
    applyFilters() {
      if(this.params.search) {
        this.params.search = this.params.search.toLocaleLowerCase()
      }
      this.$router.push({path: '/catalog', query: this.params})
      this.$store.dispatch('publication/getAllPublications', this.params)
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
    }
  },
  computed: {
    publications() {
      return this.$store.state.publication.publications
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
    // '$route.params'() {
    //   this.$store.dispatch('publication/getAllPublications', this.params)
    // }
  }
}
</script>

<style lang="scss" scoped>

.catalog {
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-gap: 2rem;
    justify-content: space-between;
    margin-bottom: 20px;
    min-height: calc(100vh - 240px);
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

</style>
