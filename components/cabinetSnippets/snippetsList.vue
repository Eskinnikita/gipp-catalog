<template>
  <div class="snippet-list">
    <el-dialog
      title="Подтверждение заявки"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
        Принять заявку?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Отменить</el-button>
        <el-button type="primary" @click="confirmRequest">Подтвердить</el-button>
      </span>
    </el-dialog>
    <div v-if="notApprovedItems.length" class="snippet-list__not-approved">
      <template v-if="notApprovedItems.length">
        <user-snippet @openDialog="openConfirmDialog" v-for="(item, index) in notApprovedItems" :user-info="item"
                      :key="index"/>
      </template>
      <template v-else>
        Список пуст
      </template>
    </div>
    <div class="snippet-list__search-container">
      <el-input
        class="snippet-list__search"
        placeholder="Поиск"
        prefix-icon="el-icon-search"
        v-model="search"
      ></el-input>
      <nuxt-link to="/editor">
        <el-button type="primary" plain>
          + Добавить
        </el-button>
      </nuxt-link>
    </div>
    <template v-if="items.length">
      <template v-if="filterItems.length">
        <user-snippet @openDialog="openConfirmDialog" v-for="(item, index) in filterItems" :user-info="item"
                      :key="index"/>
      </template>
      <template v-else>
        Список пуст
      </template>
    </template>
    <template v-else>
      <div class="snippet-list__not-found">
        Список пуст
      </div>
    </template>
  </div>
</template>

<script>
import Dialog from "@/components/modals/Dialog"
import userSnippet from "@/components/cabinetSnippets/userSnippet"

export default {
  components: {
    userSnippet,
    Dialog
  },
  data() {
    return {
      search: '',
      dialogVisible: false,
      userOnConfirm: null
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    notApprovedItems: {
      type: Array,
      required: true
    },
    activeRole: {
      type: String,
      required: true
    }
  },
  methods: {
    openConfirmDialog(data) {
      this.userOnConfirm = data
      this.dialogVisible = true
    },
    confirmRequest() {
      this.$store.dispatch('users/confirmRequest', {
        id: this.userOnConfirm.id,
        role: this.userOnConfirm.role
      }).then(() => {
        this.dialogVisible = false
      })
    }
  },
  computed: {
    filterItems() {
      return this.items.filter(item => {
        return item.name
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(this.search.toLowerCase().replace(/\s/g, ''))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.snippet-list {
  &__search {
    max-width: 450px;
  }

  &__not-found {
    text-align: center;
  }

  &__search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }

  &__not-approved {
    margin-bottom: 30px;
  }
}
</style>
