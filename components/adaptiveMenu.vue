<template>
  <div class="adaptive-menu">
    <el-button type="text" @click="drawer = true">
      <font-awesome-icon :icon="{ prefix: 'fa', iconName: 'bars' }"></font-awesome-icon>
    </el-button>
    <el-drawer
      v-if=""
      :modalAppendToBody="false"
      title="I am the title"
      size="300px"
      :visible.sync="drawer"
      :with-header="false">
      <div class="adaptive-menu__container" v-if="user">
        <div class="adaptive-menu__profile">
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
          <button @click="goTo('profile')" class="menu-list__item">
            Профиль
          </button>
          <el-divider></el-divider>
          <button @click="goTo('favourites')" class="menu-list__item">
            Избранное
          </button>
          <el-divider></el-divider>
          <button @click="goTo('catalog')" class="menu-list__item">
            Каталог
          </button>
          <el-divider></el-divider>
          <button @click="goTo('news')" class="menu-list__item">
            Новости
          </button>
          <el-divider></el-divider>
          <button @click="logout" class="menu-list__item menu-list__item_quit">
            Выйти
          </button>
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
