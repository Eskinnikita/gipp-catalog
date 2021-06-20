<template>
  <div v-if="pageReady" class="main-page">
    <div class="main-page__col main-page__col_left">
      <div class="main-page__left-block">
        <h4 class="main-page__title">
          Главные новости
        </h4>
        <main-news :articles="mainContent.mainNews"/>
      </div>
      <div class="main-page__left-block">
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
      </div>
      <div class="main-page__left-block">
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
  },
  head() {
    return {
      title: `${process.env.appName}`,
      meta: [
        {
          hid: 'homepage-description',
          name: 'description',
          content: 'Объединенный каталог детских изданий от издательств-членов СППИ ГИПП. Свежие изданий, новости издательств.'
        },
        {
          hid: 'homepage-keywords',
          name: 'keywords',
          content: 'детские журналы, детские издания, гильдия издателей, подписаться на журнал, оформить подписку'
        }
      ]
    }
  },
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;

  &__left-block {
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
    padding: 25px 25px 30px;
  }

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

    &_right {
      height: 100%;
      max-width: 300px;
      min-width: 250px;
      padding: 25px 15px 15px;
      background-color: #fff;
    }

    &_left {
      padding: 0 30px 50px 30px;
      width: 100%;
      margin-right: 10px;
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

@media (max-width: 575.98px) {
  .main-page {
    &__link {
      margin: 20px auto;
    }

    &__col {
      &_right {
        display: none;
      }

      &_left {
        padding: 0;
        margin-right: 0;
      }
    }

    &__block {
      &_fresh-pubs {
        flex-direction: column;
        align-items: start;
      }
    }
  }

  .rec-publication {
    width: 100% !important;
    margin-bottom: 20px;
  }

  .main-news {
    flex-direction: column;

    &__right {
      margin-left: 0 !important;
    }
  }
}

@media (min-width: 576px) and (max-width: 815px) {
  .main-page {
    &__col {
      &_right {
        display: none;
      }

      &_left {
        margin-right: 0;
      }
    }

    &__block {
      &_fresh-pubs {
        overflow-x: scroll;
      }
    }
  }
}

@media (min-width: 815px) and (max-width: 1000px) {
  .main-page {
    &__col {

      &_left {
        width: 70%;
        padding: 0 !important;
      }
    }

    &__block {
      &_fresh-pubs {
        overflow-x: scroll;
      }
    }
  }
}
</style>
