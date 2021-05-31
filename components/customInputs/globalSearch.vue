<template>
  <div class="global-search">
    <el-input
      class="global-search__input"
      placeholder="Поиск"
      prefix-icon="el-icon-search"
      v-model="search"
      @blur="resetSearch(200)"
    >
    </el-input>
    <el-card class="global-search__results results" v-if="searchNotEmpty" v-loading="loading">
      <div class="results__pubs">
        <h3 class="results__title">Издания</h3>
        <template v-if="searchResults.publications && searchResults.publications.length">
          <div
            class="results__pub results__item results__item_pub"
            v-for="(pub, index) in searchResults.publications"
            :key="index"
          >
            <nuxt-link :to="`/publication/${pub.id}`">
              <div>{{ pub.title }}</div>
              <div>{{ pub.Publisher.name }}</div>
            </nuxt-link>
            <img class="results__image" :src="getImageUrl(pub.coverLink)" alt="Обложка">
          </div>
          <el-button class="results__more" type="text" @click="goToList('catalog')">Перейти к списку</el-button>
        </template>
        <template v-else>Ничего не найдено</template>
      </div>
      <el-divider></el-divider>
      <div class="results__news">
        <h3 class="results__title">Новости</h3>
        <template v-if="searchResults.news && searchResults.news.length">
          <div class="results__article results__item" v-for="(article, index) in searchResults.news" :key="index">
            <nuxt-link :to="`/news/${article.id}`">
              <div>{{ article.title }}</div>
              <div>{{ article.author.name }}</div>
            </nuxt-link>
          </div>
          <el-button  class="results__more" type="text" @click="goToList('news')">Перейти к списку</el-button>
        </template>
        <template v-else>Ничего не найдено</template>
      </div>
      <el-divider></el-divider>
      <el-button type="text" @click="resetSearch">Сбросить</el-button>
    </el-card>

  </div>
</template>

<script>
export default {
  created() {
    this.serverUrl = process.env.serverUrl
  },
  data() {
    return {
      search: '',
      timer: null,
      loading: false,
      serverUrl: ''
    }
  },
  methods: {
    resetSearch(time) {
      setTimeout(() => {
        this.search = ''
        this.$store.commit('publication/SET_EMPTY_GLOBAL_SEARCH')
      }, time)
    },
    searchForPubs() {
      this.loading = true
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.$store.dispatch('publication/searchPublicationsGlobal', {search: this.search.trim().toLowerCase()})
          .then(() => this.loading = false)
      }, 800);
    },
    getImageUrl(url) {
      return this.serverUrl + '/' + url
    },
    goToList(route) {
      this.resetSearch(0)
      this.$router.push({path: `/${route}`, query: {search: this.search}})
    }
  },
  computed: {
    searchResults() {
      return this.$store.state.publication.globalSearch
    },
    searchNotEmpty() {
      return this.search.trim().length
    }
  },
  watch: {
    search() {
      this.searchForPubs()
    },
    $route (to, from){
      this.resetSearch(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.global-search {
  width: 100%;
  position: relative;

  &__input {
    width: 100%;
  }

  &__results {
    position: absolute;
    left: 0;
    top: 55px;
    border-radius: 4px;
    width: 100%;
    min-height: 50px;
    background-color: #fff;
  }
}

.results {
  &__title {
    margin-bottom: 10px;
    font-weight: normal;
  }

  &__image {
    border-radius: 4px;
    width: 50px;
  }

  &__item {
    margin-bottom: 10px;
    font-size: 14px;
    transition: 0.3s;

    &_pub {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    :hover {
      color: #66b1ff !important;
      text-decoration: underline;
    }
  }

  &__more {
    padding: 0 !important;
  }
}
</style>
