<template>
  <div class="profile-page">
    <div class="profile-page__left left">
      <img
        v-if="publisher && publisher.logoUrl"
        :src="logoUrl"
        class="profile-page__image left__item" alt="profile image"/>
      <div class="profile-page__image-placeholder left__item" v-if="publisher && !publisher.logoUrl">

      </div>
      <div class="profile-page__controls left__item">
        <el-button type="primary">Подписаться</el-button>
        <el-button type="primary" plain icon="el-icon-share"></el-button>
      </div>
      <div class="left__item" v-if="isUserAdmin">
        <nuxt-link :to="`${publisherId}/edit`">
          <el-button style="width: 100%" type="primary">Редактировать</el-button>
        </nuxt-link>
      </div>
      <info-block :info-items="info"/>
    </div>
    <div class="profile-page__right left__item">
      <h3 class="profile-page__title">{{ publisher.name }}</h3>
      <p class="profile-page__desc" v-if="publisher.description">
        {{ publisher.description }}
      </p>
      <div class="profile-page__content">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Каталог" name="1">
            <div class="profile-page__tab-title-container">
              <h3 class="profile-page__tab-title">Наши издания</h3>
              <nuxt-link v-if="isUserAdmin" to="/publication/create">
                <el-button icon="el-icon-edit" type="primary">Добавить</el-button>
              </nuxt-link>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Новости" name="2">
            <div class="profile-page__tab-title-container">
              <h3 class="profile-page__tab-title">Наши Новости</h3>
              <nuxt-link v-if="isUserAdmin" to="/editor">
                <el-button icon="el-icon-edit" type="primary">Добавить</el-button>
              </nuxt-link>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Комментарии" name="3">
            <h3 class="profile-page__tab-title">Наши комментарии</h3>
          </el-tab-pane>
        </el-tabs>
        <div class="profile-page__tab-content">
          <publisher-catalog :publications="publisher.Publications"
                             v-if="activeTab === '1' && publisher.Publications"/>
          <profile-news v-if="activeTab === '2'"/>
          <profile-comments v-if="activeTab === '3'"/>
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

export default {
  layout: 'transparent',
  components: {
    infoBlock,
    publisherCatalog,
    profileNews,
    profileComments
  },
  created() {
    this.serverUrl = process.env.serverUrl
    this.publisherId = +this.$route.params.id
    this.$store.dispatch('publisher/getPublisher', +this.publisherId)
  },
  data() {
    return {
      serverUrl: null,
      publisherId: null,
      activeTab: '1'
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
    user() {
      return this.$store.state.auth.user
    },
    isUserAdmin() {
      if (this.user) {
        return (this.publisherId === this.user.id && (+this.user.role === 3)) || +this.user.role === 4
      } else {
        return false
      }
    }
  },
  beforeDestroy() {
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

  &__left {
    max-width: 210px;
    margin-right: 40px;
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
    padding: 20px;
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
}

.left {
  &__item {
    margin-bottom: 15px;
    border-radius: 4px;
  }
}

</style>
