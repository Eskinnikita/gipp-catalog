<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__item header__left">
        <nuxt-link to="/" class="header__logo-link">
          <img src="../assets/logo.svg" alt="Логотип ГИПП"/>
        </nuxt-link>
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
        <el-input
          class="navbar__search"
          placeholder="Поиск"
          prefix-icon="el-icon-search"
          v-model="search"
        >
        </el-input>
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
                size="small"
                fit="cover"
                src="https://sun9-36.userapi.com/impg/c857024/v857024380/138e8f/PEk89jpM9Ak.jpg?size=713x794&quality=96&sign=f579ea1a3516878153044238d0959999&type=album"
                alt="Аватар пользователя"
              ></el-avatar>
              <span class="right-menu__text">Кабинет</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="+auth.user.role === 4" @click.native="goTo('/cabinet')">Личный кабинет</el-dropdown-item>
              <el-dropdown-item v-if="+auth.user.role !== 4" @click.native="goToProfile">Профиль</el-dropdown-item>
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
import LoginModal from "./modals/LoginModal.vue";

export default {
  components: {
    LoginModal
  },
  data() {
    return {
      activeIndex: "1",
      search: "",
      loggedIn: false
    };
  },
  created() {
    this.setupNav(this.$route.name);
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
        this.$router.push({path: "/catalog"});
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
    goTo(dest) {
      this.$router.push({path: dest});
    },
    goToProfile() {
      const userRole = this.auth.user.role
      const userId = this.auth.user.id
      if(userRole === 3) {
        this.$router.push({path: `/publisher/${userId}`});
      }
    }
  },
  computed: {
    ...mapState(["auth"]),
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
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
    width: 100%;
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
</style>
