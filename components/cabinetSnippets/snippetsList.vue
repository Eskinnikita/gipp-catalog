<template>
  <div class="snippet-list">
    <div class="snippet-list__not-approved" v-if="hasApprovedList">
      <h3 class="snippet-list__title">Заявки на рассмотрение</h3>
      <users-to-confirm :items="items.notApproved"/>
      <p v-if="!items.notApproved.length">Список пуст</p>
    </div>
    <h3 class="snippet-list__title">{{ tabTitle }}</h3>
    <el-input class="snippet-list__search"
              placeholder="Поиск"
              prefix-icon="el-icon-search"
              v-model.lazy="search"
    />
    <template v-if="hasApprovedList" >
      <users-tab v-if="items.approved.rows && items.approved.rows.length" :items="items.approved.rows"/>
      <p v-if="!items.approved.rows.length">Список пуст</p>
    </template>
    <template v-if="items.rows && items.rows.length">
      <users-tab v-if="role === 1" :items="items.rows"/>
      <news-tab v-if="role === 4" :items="items.rows"/>
      <reviews-tab v-if="role === 5" :items="items.rows"/>
      <tags-tab v-if="role === 6" :items="items.rows"/>
    </template>
  </div>
</template>

<script>
import tagsTab from "@/components/cabinetTabs/tagsTab"
import reviewsTab from "@/components/cabinetTabs/reviewsTab"
import newsTab from "@/components/cabinetTabs/newsTab"
import usersTab from "@/components/cabinetTabs/usersTab"
import usersToConfirm from "@/components/cabinetTabs/usersToConfirm"

export default {
  components: {
    tagsTab,
    reviewsTab,
    newsTab,
    usersTab,
    usersToConfirm
  },
  created() {
    if (this.$route.query.search) {
      this.search = this.$route.query.search
    }
  },
  data() {
    return {
      search: '',
      timer: null,
    }
  },
  props: {
    items: {
      type: Object,
      required: true
    },
    role: {
      type: Number,
      required: true
    }
  },
  methods: {
    sendSearchString() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.$emit('setSearchValue', this.search)
      }, 800);
    }
  },
  computed: {
    isUser() {
      const roles = [1, 2, 3]
      return roles.indexOf(this.role) !== -1
    },
    hasApprovedList() {
      const roles = [2, 3]
      return roles.indexOf(this.role) !== -1
    },
    tabTitle() {
      let tabTitle = ''
      switch (this.role) {
        case 1:
          tabTitle = 'Все пользователи';
          break;
        case 2:
          tabTitle = 'Все пользователи';
          break;
        case 3:
          tabTitle = 'Все пользователи';
          break;
        case 4:
          tabTitle = 'Статьи';
          break;
        case 5:
          tabTitle = 'Отзывы на рассмотрении';
          break;
        case 6:
          tabTitle = 'Теги изданий';
          break;
      }
      return tabTitle
    }
  },
  watch: {
    search() {
      this.sendSearchString()
    }
  }
}
</script>

<style lang="scss" scoped>
.snippet-list {
  padding: 20px 30px 30px 30px;

  &__not-approved {
    margin-bottom: 20px;
  }

  &__not-found {
    text-align: center;
  }

  &__search {
    max-width: 450px;
    margin: 0 0 15px 0;
  }

  &__not-approved {
    margin-bottom: 30px;
  }

  &__title {
    margin-bottom: 15px;
  }

  &__review-block {
    margin-top: 25px;
    width: 100%;
  }
}
</style>
