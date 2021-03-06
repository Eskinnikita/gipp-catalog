<template>
  <div class="profile-page" v-if="pageReady">
        <div class="profile-page__left left">
          <div class="profile-page__image-container left__item">
            <img
              v-if="profile && profile.logoUrl"
              :src="logoUrl"
              class="profile-page__image" alt="profile image"/>
            <div class="profile-page__image-placeholder left__item"
                 v-if="profile && !profile.logoUrl && profile.logoUrl !== undefined">
            </div>
          </div>
          <div class="left__item" v-if="isUserAdmin">
            <nuxt-link :to="`${profileId}/edit`">
              <el-button style="width: 100%" type="primary">Редактировать</el-button>
            </nuxt-link>
          </div>
          <div class="profile-page__controls left__item">
            <social-sharing v-if="profile.role === 2" :meta-info="socialInfo"/>
          </div>
          <info-block class="profile-page__info-block" v-if="profile.role === 2" :info-items="info"/>
        </div>
        <div class="profile-page__right left__item">
          <h3 class="profile-page__title">{{ profile.name }}</h3>
          <p class="profile-page__desc" v-if="profile.description">
            {{ profile.description }}
          </p>
          <info-block class="profile-page__info-block_adaptive" v-if="profile.role === 2" :info-items="info"/>
          <div class="profile-page__content">
            <el-tabs v-model="params.tab" @tab-click="handleTabChange">
              <el-tab-pane label="Новости" name="news" v-if="profile.role === 2">
                <div class="profile-page__tab-title-container">
                  <h3 class="profile-page__tab-title">Наши Новости</h3>
                  <nuxt-link v-if="isUserAdmin" to="/editor">
                    <el-button icon="el-icon-edit" type="primary">Добавить</el-button>
                  </nuxt-link>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Комментарии" name="comments">
                <h3 class="profile-page__tab-title">Наши комментарии</h3>
              </el-tab-pane>
            </el-tabs>
            <div class="profile-page__tab-content">
              <profile-news
                v-if="params.tab === 'news' && tabContent.rows && profile.role === 2"
                :articles="tabContent.rows"
              />
              <profile-comments :comments="tabContent.rows" v-if="params.tab === 'comments' && tabContent.rows"/>
              <div class="profile-page__pagination">
                <el-pagination
                  v-if="tabContent.rows && tabContent.rows.length"
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
    this.routeName = this.$route.name.split('-')[0]
    if (this.routeName === 'organization') {
      this.params.role = 2
      this.params.tab = 'news'
    } else if (this.routeName === 'user') {
      this.params.role = 1
      this.params.tab = 'comments'
    }
    const obj = this.$route.query
    this.serverUrl = process.env.serverUrl
    this.profileId = +this.$route.params.id
    this.params.id = +this.$route.params.id
    if (obj && Object.keys(obj).length === 0 && obj.constructor === Object) {
      this.$router.push({path: `/${this.routeName}/${this.profileId}`, query: {tab: this.params.tab, page: '1'}});
    } else {
      if (this.$route.query.tab) {
        this.params.tab = this.$route.query.tab
      }
      if (this.$route.query.page) {
        this.params.page = +this.$route.query.page
      }
    }
    this.getProfile()
  },
  data() {
    return {
      routeName: '',
      pageReady: false,
      serverUrl: null,
      profileId: null,
      params: {
        tab: null,
        page: 1,
        role: null,
        id: null
      }
    }
  },
  methods: {
    getProfile() {
      const data = {
        role: this.params.role,
        id: this.params.id
      }
      this.$store.dispatch('profile/getProfile', data).then(() => {
        this.pageReady = true
      })
      this.getTabContent()
    },
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
          value: this.profile.email
        },
        {
          label: 'Телефон',
          value: this.profile.phone
        },
        {
          label: 'Адрес',
          value: this.profile.address
        }
      ]
    },
    logoUrl() {
      return this.serverUrl + '/' + this.profile.logoUrl
    },
    profile() {
      return this.$store.state.profile.profile
    },
    tabContent() {
      return this.$store.state.profile.tabContent
    },
    user() {
      return this.$store.state.auth.user
    },
    isUserAdmin() {
      if (this.user) {
        return (this.profile.id === this.user.id && this.profile.role === this.user.role) || this.user.role === 4
      } else {
        return false
      }
    },
    socialInfo() {
      return {
        title: this.profile.name,
        desc: this.profile.description ? this.profile.description : ''
      }
    },
    userDescription() {
      if(this.profile.role === 2 && this.profile.description) {
        if(this.profile.description.length > 220) {
          return this.profile.description.slice(0, 220) + '...'
        } else {
          return `${this.profile.name}. ${this.profile.description}`
        }
      } else {
        return `${this.profile.name}`
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
  // beforeDestroy() {
  //   this.$store.commit('publisher/SET_EMPTY_PUBLISHER')
  // }
  head() {
    if(this.profile.name) {
      return {
        title: `${this.profile.name} | ${process.env.appName}`,
        meta: [
          {
            hid: 'article-description',
            name: 'description',
            content: this.userDescription
          },
          {
            hid: 'article-keywords',
            name: 'keywords',
            content: `${this.profile.name}`
          }
        ]
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.profile-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__pagination {
    margin-top: 30px;
  }

  &__left {
    max-width: 190px;
    min-width: 180px;
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

  &__info-block {
    &_adaptive {
      display: none;
    }
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

@media (max-width: 575.98px) {
  .profile-page {
    flex-direction: column;

    &__desc {
      width: 100%;
    }

    &__image-container {
      img {
        max-height: 150px;
      }
    }

    &__desc {
      font-size: 16px;
      margin-bottom: 20px;
    }

    &__info-block {
      display: none;
      &_adaptive {
        display: block;
        margin-bottom: 20px;
      }
    }
  }

  .left {
    max-width: 100%;
    margin-right: 0;
  }
}

@media (min-width: 576px) and (max-width: 815px) {
  .left {
    max-width: 160px;
  }
}

</style>
