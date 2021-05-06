<template>
  <div class="cabinet">
    <el-tabs v-model="activeTab" @tab-click="handleClick" class="cabinet__nav">
      <el-tab-pane label="Издатели" name="3"></el-tab-pane>
      <el-tab-pane label="Организации" name="2"></el-tab-pane>
      <el-tab-pane label="Читатели" name="1"></el-tab-pane>
      <el-tab-pane label="Новости" name="news"></el-tab-pane>
    </el-tabs>
    <div class="cabinet__tab-content">
      <snippets-list :items="users"/>
    </div>
  </div>
</template>

<script>
import snippetsList from "@/components/cabinetSnippets/snippetsList"
export default {
  components: {
    snippetsList
  },
  created() {
    this.$store.dispatch('users/getUsers', +this.activeTab)
  },
  data() {
    return {
      activeTab: '1'
    }
  },
  methods: {
    handleClick() {
      const role = +this.activeTab
      this.$store.dispatch('users/getUsers', role)
    }
  },
  computed: {
    users() {
      return this.$store.state.users.users
    }
  }
}
</script>

<style lang="scss" scoped>
  .cabinet {
    &__nav {
      margin-bottom: 10px;
     }
  }
</style>
