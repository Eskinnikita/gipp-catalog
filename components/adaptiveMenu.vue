<template>
  <div class="adaptive-menu">
    <button class="adaptive-menu__button" @click="drawer = true">
      <template>
        <svg class="adaptive-menu__burger-icon" viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="15" rx="8"></rect>
          <rect y="30" width="100" height="15" rx="8"></rect>
          <rect y="60" width="100" height="15" rx="8"></rect>
        </svg>
<!--        <font-awesome-icon :icon="{ prefix: 'fa', iconName: 'bars' }"></font-awesome-icon>-->
      </template>
    </button>
    <el-drawer
      :modalAppendToBody="false"
      title="I am the title"
      size="300px"
      :visible.sync="drawer"
      :with-header="false">
      <div class="adaptive-menu__container">
        <div class="adaptive-menu__profile" v-if="user">
          <el-avatar
            class="adaptive-menu__avatar"
            size="large"
            fit="cover"
            :src="avatarUrl"
            icon="el-icon-user-solid"
            alt="Аватар пользователя"
          ></el-avatar>
          <span>{{ user.name }}</span>
        </div>
        <el-divider/>
        <div class="adaptive-menu__menu-list menu-list">
          <template v-if="!user">
            <el-button
              style="width: 100%; font-size: 16px !important;"
              type="primary"
              plain
              @click="openLoginModal"
              class="menu-list__login-button">
              Войти
            </el-button>
            <el-divider></el-divider>
          </template>
          <template v-if="user">
            <button @click="goTo('profile')" class="menu-list__item">
              Профиль
            </button>
            <el-divider></el-divider>
          </template>
          <template v-if="user">
            <button @click="goTo('favourites')" class="menu-list__item">
              Избранное
            </button>
            <el-divider></el-divider>
          </template>
          <button @click="goTo('catalog')" class="menu-list__item">
            Каталог
          </button>
          <el-divider></el-divider>
          <button @click="goTo('news')" class="menu-list__item">
            Новости
          </button>
          <template v-if="user">
            <el-divider></el-divider>
            <button @click="logout" class="menu-list__item menu-list__item_quit">
              Выйти
            </button>
          </template>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  components: {},
  created() {
    this.serverUrl = process.env.serverUrl
  },
  data() {
    return {
      drawer: false,
      serverUrl: ''
    }
  },
  methods: {
    goTo(route) {
      if (route === 'profile') {
        const userRole = this.user.role
        const userId = this.user.id
        if (userRole === 3) {
          this.$router.push({path: `/publisher/${userId}`, query: {tab: 'catalog', page: '1'}});
        } else if (userRole === 1) {
          this.$router.push({path: `/user/${userId}`, query: {tab: 'comments', page: '1'}});
        } else if (userRole === 2) {
          this.$router.push({path: `/organization/${userId}`, query: {tab: 'news', page: '1'}});
        } else if (userRole === 4) {
          this.$router.push({path: '/cabinet', query: {tab: '1', page: '1'}});
        }
      } else if (route === 'catalog') {
        this.$router.push({path: "/catalog", query: {page: '1'}});
      } else if (route === 'news') {
        this.$router.push({path: "/news", query: {page: '1'}});
      } else if (route === 'favourites') {
        this.$router.push({path: "/favourites"});
      }
      this.drawer = false
    },
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.drawer = false
        this.$router.push({path: "/"});
      })
    },
    openLoginModal() {
      this.drawer = false
      this.$emit('openLoginModal')
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    avatarUrl() {
      if (this.user.role === 4 || !this.user.logoUrl) {
        return ''
      } else {
        return this.serverUrl + '/' + this.user.logoUrl
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.adaptive-menu {
  &__button {
    height: 40px;
    width: 40px;
    position: relative;
    display: flex;
    align-items: center;
    border: none;
    background: none;
    color: var(--accent-color);
    font-size: 30px;
  }

  &__burger-icon{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    fill: var(--accent-color) !important;
  }

  &__container {

  }

  &__profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
  }

  &__avatar {
    border: 1px solid lightgray;
    margin-right: 10px;
  }

  &__login {
    display: flex;
    justify-content: flex-end;
  }
}

.menu-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  //&__login-button {
  //  width: 100% !important;
  //  font-size: 16px !important;
  //}

  &__item {
    font-size: 17px;
    width: 100%;
    cursor: pointer;
    background: none;
    text-align: left;
    padding: 10px 0 10px 20px;
    border: none;

    &_quit {
    }
  }
}
</style>
