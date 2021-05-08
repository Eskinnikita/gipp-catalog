<template>
  <div class="cabinet">
    <el-tabs v-model="activeTab" @tab-click="handleClick" class="cabinet__nav">
      <el-tab-pane label="Издатели" name="3"></el-tab-pane>
      <el-tab-pane label="Организации" name="2"></el-tab-pane>
      <el-tab-pane label="Читатели" name="1"></el-tab-pane>
      <el-tab-pane label="Новости" name="news"></el-tab-pane>
    </el-tabs>
    <div class="cabinet__tab-content">
      <snippets-list v-if="activeTab !== '4'" :items="approvedUsers" :notApprovedItems="notApprovedUsers" :activeRole="activeTab"/>
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
      activeTab: '3'
    }
  },
  methods: {
    handleClick() {
      const role = +this.activeTab
      this.$store.dispatch('users/getUsers', role)
    }
  },
  computed: {
    approvedUsers() {
      return this.$store.state.users.users.filter(el => {
        if ('approved' in el) {
          return el.approved
        } else {
          return el
        }
      })
    },
    notApprovedUsers() {
      return this.$store.state.users.users.filter(el => {
        if ('approved' in el) {
          return !el.approved
        }
      })
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
