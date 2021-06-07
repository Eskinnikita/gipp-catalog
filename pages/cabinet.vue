<template>
  <div class="cabinet">
    <div class="cabinet__navbar">
      <el-menu
        :default-active="params.activeTab"
      >
        <el-menu-item @click="changeTab(item.index, item.role)" v-for="(item, index) in navItems" :key="index"
                      :index="item.index">
          <i :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="cabinet__content">
      <snippets-list ref="snippets" @setSearchValue="setSearch" v-if="listItems" :items="listItems"
                     :role="+params.role"/>
      <div class="cabinet__pagination">
        <el-pagination
          v-if="listItems && (listItems.count > listItems.limit)"
          @current-change="handleCurrentChange"
          :current-page="+params.page"
          layout="pager"
          :page-size="listItems.limit"
          :total="listItems.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import snippetsList from "@/components/cabinetSnippets/snippetsList"

export default {
  middleware: "isAdmin",
  components: {
    snippetsList
  },
  created() {
    const obj = this.$route.query
    if (obj && Object.keys(obj).length === 0 && obj.constructor === Object) {
      this.$router.push({path: '/cabinet', query: {tab: '1', page: '1'}});
    } else {
      if (this.$route.query.tab) {
        const tabInfo = this.navItems.findIndex(el => {
          return el.index === this.$route.query.tab
        })
        if(tabInfo !== -1) {
          this.params.activeTab = this.$route.query.tab
          const tabConfig = this.navItems.find(el => el.index === this.$route.query.tab)
          this.params.role = tabConfig.role
        } else {
          this.$router.push({path: '/cabinet', query: {tab: '1', page: '1'}});
        }
      }
      if (this.$route.query.page) {
        this.params.page = this.$route.query.page
      }
      if (this.$route.query.search) {
        this.params.search = this.$route.query.search
      }
    }
  },
  mounted() {

  },
  data() {
    return {
      timer: null,
      limit: 10,
      params: {
        activeTab: '1',
        page: '1',
        role: '1',
        search: ''
      },
      navItems: [
        {
          index: '1',
          icon: 'el-icon-notebook-2',
          text: 'Издатели',
          role: 3
        },
        {
          index: '2',
          icon: 'el-icon-s-cooperation',
          text: 'Организации',
          role: 2
        },
        {
          index: '3',
          icon: 'el-icon-s-custom',
          text: 'Читатели',
          role: 1
        },
        {
          index: '4',
          icon: 'el-icon-news',
          text: 'Новости',
          role: 4
        },
        {
          index: '5',
          icon: 'el-icon-s-comment',
          text: 'Отзывы',
          role: 5
        },
        {
          index: '6',
          icon: 'el-icon-price-tag',
          text: 'Теги',
          role: 6
        }
      ]
    }
  },
  methods: {
    setSearch(val) {
      this.params.search = val
      this.$router.push({
        path: '/cabinet',
        query: {tab: this.params.activeTab, page: this.params.page, search: this.params.search}
      });
    },
    handleCurrentChange(val) {
      this.params.page = `${val}`
    },
    changeTab(index, role) {
      this.params.search = ''
      this.params.role = role
      this.params.page = 1
      this.params.activeTab = `${index}`
      this.$router.push({path: '/cabinet', query: {tab: index, page: '1'}});
    },
    getListItems(params) {
      const role = this.params.role
      const serverParams = this.defineServerQueryParams(role)
      if (this.params.search.trim() !== '') {
        serverParams.data.params.search = this.params.search.toLowerCase()
      }
      this.$router.push({path: '/cabinet', query: {tab: this.params.activeTab, page: this.params.page, search: this.params.search}});
      this.$store.dispatch(serverParams.dispatch, serverParams.data)
    },
    defineServerQueryParams(role) {
      if (role === 1) {
        return {
          dispatch: 'admin/getUsers',
          data: {
            route: '/admin/users/users/all',
            params: {
              page: this.params.page
            }
          }
        }
      } else if (role === 2 || role === 3) {
        return {
          dispatch: 'admin/getPubs',
          data: {
            route: '/admin/users/pubs/all',
            params: {
              page: this.params.page,
              role: this.params.role
            }
          }
        }
      } else if (role === 5) {
        return {
          dispatch: 'admin/getReviews',
          data: {
            route: '/admin/reviews/all',
            params: {
              page: this.params.page
            }
          }
        }
      } else if (role === 4) {
        return {
          dispatch: 'admin/getArticles',
          data: {
            route: '/admin/articles/all',
            params: {
              page: this.params.page
            }
          }
        }
      } else if(role === 6) {
        return {
          dispatch: 'admin/getTags',
          data: {
            route: '/admin/tags/all',
            params: {
              page: this.params.page
            }
          }
        }
      }
    }
  },
  computed: {
    listItems() {
      return this.$store.state.admin.adminPanelListItems
    },
    pagesCount() {
      return Math.round(+this.listItems.count / this.limit)
    }
  },
  watch: {
    params: {
      handler(val) {
        this.getListItems(val)
      },
      deep: true
    },
  },
  beforeDestroy() {
    this.$store.commit('admin/SET_EMPTY_ITEMS')
  },
  head() {
    return {
      title: `Панель администратора | ${process.env.appName}`
    }
  },
}
</script>

<style lang="scss" scoped>
.cabinet {
  display: flex;
  justify-content: space-between;

  &__nav {
    margin-bottom: 10px;
  }

  &__content {
    width: 100%;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
