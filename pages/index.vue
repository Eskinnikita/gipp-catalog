<template>
  <div v-if="pageReady" class="main-page">
    <div class="main-page__col main-page__col_left">
      <h4 class="main-page__title">
        Главные
      </h4>
      <main-news :articles="mainContent.mainNews"/>
      <div class="main-page__separator"></div>
      <div class="main-page__block main-page__block_main-news">
      </div>
      <h4 class="main-page__title">
        Свежие выпуски
      </h4>
      <div class="main-page__block main-page__block_fresh-pubs">
        <rec-publications
          v-for="(recPub, index) in mainContent.freshPubs"
          :rec-pub="recPub"
          :key="index"
        />
      </div>
      <div class="main-page__separator"></div>
      <h4 class="main-page__title">
        Свежие выпуски
      </h4>
      <div class="main-page__block main-page__block_all-pubs">
        <cover-snippet
          v-for="(publication, index) in mainContent.pubsList"
          :key="index"
          :publication="publication"
          route="/publication"
        />
      </div>
      <div class="main-page__link">
        <el-link @click="goToCatalog" type="primary">Перейти к каталогу</el-link>
      </div>
    </div>
    <div class="main-page__col main-page__col_right">
      <h4 class="main-page__title">
        Последние новости
      </h4>
      <side-snippet
        v-for="(article, index) in mainContent.sideNews"
        :key="index"
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import recPublications from "@/components/profile/snippets/recPublications"
import coverSnippet from "@/components/snippets/coverSnippet"
import sideSnippet from "@/components/news/sideSnippet"
import mainNews from "@/components/news/mainNews"

export default {
  layout: 'transparent',
  components: {
    recPublications,
    coverSnippet,
    sideSnippet,
    mainNews
  },
  created() {
    this.$store.dispatch('getMainContent').then(() => {
      this.pageReady = true
    })
  },
  data() {
    return {
      pageReady: false
    }
  },
  methods: {
    goToCatalog() {
      this.$router.push({path: "/catalog", query: {page: '1'}});
    }
  },
  computed: {
    mainContent() {
      return this.$store.state.mainContent
    }
  }
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;

  &__title {
    font-weight: normal;
    margin-bottom: 15px;
  }

  &__block {
    &_fresh-pubs {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &_all-pubs {
      display: grid;
      grid-template-columns: repeat(auto-fill, 130px);
      grid-gap: 2rem;
      justify-content: space-between;
    }
  }

  &__col {
    border-radius: 4px;
    background-color: #fff;

    &_right {
      max-width: 300px;
      min-width: 250px;
      padding: 15px;
    }

    &_left {
      padding: 30px 30px 50px 30px;
      width: 100%;
      margin-right: 20px;
    }
  }

  &__separator {
    margin: 20px 0;
    width: 100%;
    height: 15px;
    background-color: var(--main-color);
  }

  &__link {
    display: flex;
    justify-content: center;
    margin: 10px auto;

    .el-link {
      color: var(--accent-color) !important;
    }
  }

}
</style>
