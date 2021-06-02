<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__item header__left">
        <nuxt-link to="/" class="header__logo-link">
          <img src="../assets/logo.svg" alt="Логотип ГИПП"/>
        </nuxt-link>
      </div>
      <div class="header__burger-menu">
        <adaptive-menu/>
      </div>
      <div class="header__navbar navbar">
        <el-menu
          @select="handleSelect"
          :default-active="activeIndex"
          class="el-menu-demo navbar__nav"
          mode="horizontal"
        >
          <el-menu-item index="1">Каталог</el-menu-item>
          <el-menu-item index="2">Новости</el-menu-item>
        </el-menu>
        <global-search class="navbar__search"/>
      </div>
      <div class="header__item header__right-menu right-menu">
        <template v-if="isAuthenticated">
          <nuxt-link
            to="/favourites"
            class="right-menu__avatar right-menu__item"
          >
            <img
              class="right-menu__image"
              src="../assets/icons/heart.svg"
              alt=""
            />
            <span class="right-menu__text">Избранное</span>
          </nuxt-link>
          <el-dropdown trigger="click" class="right-menu__avatar right-menu__item">
            <span class="right-menu__item">
              <el-avatar
                v-if="avatarUrl"
                size="small"
                fit="cover"
                :src="avatarUrl"
                alt="Аватар пользователя"
              ></el-avatar>
              <el-avatar v-else size="small" icon="el-icon-user-solid"></el-avatar>
              <span class="right-menu__text">Кабинет</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="+auth.user.role === 4" @click.native="goToCabinet">Личный кабинет
              </el-dropdown-item>
              <el-dropdown-item v-if="+auth.user.role !== 4" @click.native="goToProfile">Профиль</el-dropdown-item>
              <el-dropdown-item v-if="+auth.user.role !== 4" @click.native="goToProfileEdit">Редактировать
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">Выйти</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <el-button type="primary" plain @click="$refs.loginModal.openModal()"
          >Вход
          </el-button
          >
          <el-button type="primary" @click="goToRegisterPage"
          >Регистрация
          </el-button
          >
        </template>
      </div>
    </div>
    <login-modal ref="loginModal"/>
  </header>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import LoginModal from "./modals/loginModal.vue";
import globalSearch from "@/components/customInputs/globalSearch"
import adaptiveMenu from "@/components/adaptiveMenu"

export default {
  components: {
    LoginModal,
    globalSearch,
    adaptiveMenu
  },
  data() {
    return {
      serverUrl: '',
      activeIndex: "1",
      search: "",
      loggedIn: false
    };
  },
  created() {
    this.setupNav(this.$route.name)
    this.serverUrl = process.env.serverUrl
  },
  methods: {
    setupNav(routeName) {
      switch (routeName) {
        case "news":
          this.activeIndex = "2";
          break;
        case "catalog":
          this.activeIndex = "1";
          break;
        default:
          this.activeIndex = "9999";
      }
    },
    handleSelect(key, keyPath) {
      if (+key === 1) {
        this.activeIndex = "1";
        this.$router.push({path: "/catalog", query: {page: '1'}});
      } else {
        this.activeIndex = "2";
        this.$router.push({path: "/news"});
      }
    },
    goToRegisterPage() {
      this.$router.push({path: "/register"});
    },
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({path: "/"});
      })
    },
    goToCabinet() {
      this.$router.push({path: '/cabinet', query: {tab: '1', page: '1'}});
    },
    goToProfile() {
      const userRole = this.auth.user.role
      const userId = this.auth.user.id
      if (userRole === 3) {
        this.$router.push({path: `/publisher/${userId}`, query: {tab: 'catalog', page: '1'}});
      } else if (userRole === 1) {
        this.$router.push({path: `/user/${userId}`, query: {tab: 'comments', page: '1'}});
      } else if (userRole === 2) {
        this.$router.push({path: `/organization/${userId}`, query: {tab: 'news', page: '1'}});
      }
    },
    goToProfileEdit() {
      const userRole = this.auth.user.role
      const userId = this.auth.user.id
      if (userRole === 3) {
        this.$router.push({path: `/publisher/${userId}/edit`});
      } else if (userRole === 1) {
        this.$router.push({path: `/user/${userId}/edit`});
      } else if (userRole === 2) {
        this.$router.push({path: `/organization/${userId}/edit`});
      }
    }
  },
  computed: {
    ...mapState(["auth"]),
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    user() {
      return this.$store.state.auth.user
    },
    avatarUrl() {
      if (this.user.role === 4 || !this.user.logoUrl) {
        return false
      } else {
        return this.serverUrl + '/' + this.user.logoUrl
      }
    },
  },
  watch: {
    $route(to, from) {
      const routeName = to.name;
      this.setupNav(routeName);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  background-color: #fff;
  font-size: 12px;
  z-index: 1000;
  border-bottom: 2px solid #ebeef5;

  &__burger-menu {
    display: none;
    .el-button {
      font-size: 25px;
    }
    .el-drawer {
      padding: 40px 15px !important;
    }
  }

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 15px;
    width: 100%;
    max-width: 1200px;
    min-width: 900px;
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 130px;
    height: 65px;
  }

  &__logo-link {
    display: block;
    width: 100%;
  }

  &__menu {
    font-size: 14px;
  }
}

.right-menu {
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &__item:not(:first-child) {
    margin-left: 30px;
  }

  &__image {
    height: 28px;
    width: 28px;
  }

  &__avatar {
    cursor: pointer;
    font-size: 12px;
    color: #000;
  }

  &__text {
    margin-top: 3px;
  }
}

.navbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 50px;

  &__search {
    max-width: 460px;
  }

  &__nav {
    margin-right: 30px;
    min-width: 210px;
  }
}

.el-menu--horizontal > .el-menu-item {
  height: 50px !important;
}

.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}

@media (max-width: 575.98px) {
  .right-menu {
    display: none;
  }

  .navbar {
    display: none;
  }

  .header {
    &__inner {
      min-width: 100%;
    }

    &__burger-menu {
      display: block;

      .el-drawer {
        padding: 10px;
      }
    }
  }
}

@media (min-width: 576px) and (max-width: 815px) {
  .right-menu {
    display: none;
  }

  .navbar {
    display: none;
  }

  .header {
    &__inner {
      min-width: 100%;
    }

    &__burger-menu {
      display: block;

      .el-drawer {
        padding: 10px;
      }
    }
  }
}
</style>
