<template>
  <div class="profile-page" v-if="pageReady">
    <div class="profile-page__left left">
      <div class="profile-page__image-container left__item">
        <img
          v-if="publisher && publisher.logoUrl"
          :src="logoUrl"
          class="profile-page__image" alt="profile image"/>
        <div class="profile-page__image-placeholder left__item"
             v-if="publisher && !publisher.logoUrl && publisher.logoUrl !== undefined">
        </div>
      </div>
      <div class="left__item" v-if="isUserAdmin">
        <nuxt-link :to="`${publisherId}/edit`">
          <el-button class="accent-element" style="width: 100%" type="primary">Редактировать</el-button>
        </nuxt-link>
      </div>
      <div class="profile-page__controls left__item">
        <social-sharing :meta-info="socialInfo"/>
      </div>
      <info-block :info-items="info"/>
    </div>
    <div class="profile-page__right left__item">
      <h3 class="profile-page__title">{{ publisher.name }}</h3>
      <p class="profile-page__desc" v-if="publisher.description">
        {{ publisher.description }}
      </p>
      <div class="profile-page__content">
        <el-tabs v-model="params.tab" @tab-click="handleTabChange">
          <el-tab-pane label="Каталог" name="catalog">
            <div class="profile-page__tab-title-container">
              <h3 class="profile-page__tab-title">Наши издания</h3>
              <nuxt-link v-if="isUserAdmin" to="/publication/create">
                <el-button class="accent-element" icon="el-icon-edit" type="primary">Добавить</el-button>
              </nuxt-link>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Новости" name="news">
            <div class="profile-page__tab-title-container">
              <h3 class="profile-page__tab-title">Наши Новости</h3>
              <nuxt-link v-if="isUserAdmin" to="/editor">
                <el-button class="accent-element" icon="el-icon-edit" type="primary">Добавить</el-button>
              </nuxt-link>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Комментарии" name="comments">
            <h3 class="profile-page__tab-title">Наши комментарии</h3>
          </el-tab-pane>
        </el-tabs>
        <div class="profile-page__tab-content">
          <publisher-catalog
            v-if="params.tab === 'catalog' && tabContent.rows"
            :publications="tabContent.rows"
          />
          <profile-news
            v-if="params.tab === 'news' && tabContent.rows"
            :articles="tabContent.rows"
          />
          <profile-comments
            v-if="params.tab === 'comments' && tabContent.rows"
            :comments="tabContent.rows"/>
          <div class="profile-page__pagination">
            <el-pagination
              v-if="tabContent.rows && tabContent.rows.length && (tabContent.count > tabContent.limit)"
              @current-change="handleCurrentChange"
              :current-page="+params.page"
              layout="pager"
              :page-size="tabContent.limit"
              :total="tabContent.count">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoBlock from "@/components/profile/infoBlock"
import publisherCatalog from "@/components/profile/publisherCatalog"
import profileNews from "@/components/profile/profileNews"
import profileComments from "@/components/profile/profileComments"
import socialSharing from "@/components/social/socialSharing"

export default {
  layout: 'transparent',
  components: {
    infoBlock,
    publisherCatalog,
    profileNews,
    profileComments,
    socialSharing
  },
  created() {
    const obj = this.$route.query
    this.serverUrl = process.env.serverUrl
    this.publisherId = +this.$route.params.id
    this.params.id = +this.$route.params.id
    if (obj && Object.keys(obj).length === 0 && obj.constructor === Object) {
      this.$router.push({path: `/publisher/${this.publisherId}`, query: {tab: 'catalog', page: '1'}});
    } else {
      if (this.$route.query.tab) {
        this.params.tab = this.$route.query.tab
      }
      if (this.$route.query.page) {
        this.params.page = +this.$route.query.page
      }
    }
    this.$store.dispatch('publisher/getPublisher', +this.publisherId).then(publisher => {
      let root = document.documentElement;
      root.style.setProperty('--main-color', publisher.PublisherConfig.mainColor, 'important');
      root.style.setProperty('--accent-color', publisher.PublisherConfig.accentColor, 'important');
      this.pageReady = true
    })
    this.getTabContent()
  },
  data() {
    return {
      pageReady: false,
      serverUrl: null,
      publisherId: null,
      params: {
        tab: 'catalog',
        page: 1,
        role: 3,
        id: null
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.params.page = `${val}`
    },
    handleTabChange(tab, event) {
      this.params.page = 1
      this.$router.push({query: {tab: tab.name, page: '1'}});
    },
    getTabContent() {
      this.$router.push({query: {tab: this.params.tab, page: `${this.params.page}`}});
      this.$store.dispatch('profile/getTabContent', this.params)
    }
  },
  computed: {
    info() {
      return [
        {
          label: 'Электронная почта',
          value: this.publisher.contactMail
        },
        {
          label: 'Телефон',
          value: this.publisher.contactPhone
        },
        {
          label: 'Адрес',
          value: this.publisher.address
        }
      ]
    },
    logoUrl() {
      return this.serverUrl + '/' + this.publisher.logoUrl
    },
    publisher() {
      return this.$store.state.publisher.publisher
    },
    tabContent() {
      return this.$store.state.profile.tabContent
    },
    user() {
      return this.$store.state.auth.user
    },
    isUserAdmin() {
      if (this.user) {
        return (this.publisherId === this.user.id && (+this.user.role === 3)) || +this.user.role === 4
      } else {
        return false
      }
    },
    socialInfo() {
      return {
        title: this.publisher.name,
        desc: this.publisher.description
      }
    }
  },
  watch: {
    params: {
      handler(val) {
        this.getTabContent()
      },
      deep: true
    },
  },
  beforeDestroy() {
    let root = document.documentElement;
    root.style.setProperty('--main-color', "#ebeef5", 'important');
    root.style.setProperty('--accent-color', "#409EFF", 'important');
    this.$store.commit('publisher/SET_EMPTY_PUBLISHER')
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 100vh;

  &__pagination {
    margin-top: 30px;
  }

  &__left {
    max-width: 190px;
    margin-right: 30px;
  }

  &__right {
    width: 100%;
  }

  &__image {
    width: 100%;
    object-fit: contain;
  }

  &__info {
    background-color: #fff;
    height: 200px;
  }

  &__controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    min-height: 100vh;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px 20px 40px;
    color: #606266;
  }

  &__title {
    margin-bottom: 15px;
  }

  &__desc {
    width: 80%;
    max-width: 650px;
    margin-bottom: 15px;
    font-size: 14px;
  }

  &__tab-content {
    margin-top: 20px;
  }

  &__tab-title-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__image-placeholder {
    width: 100%;
    height: 200px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("../../../assets/logo.svg");
      filter: opacity(40%);
    }
  }

  &__image-container {
    padding: 15px;
    background-color: #fff;
  }

}

.left {
  &__item {
    margin-bottom: 15px;
    border-radius: 4px;
  }
}

</style>
