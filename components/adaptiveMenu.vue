<template>
  <div class="header__burger-menu">
    <el-button type="text" @click="drawer = true">
      <font-awesome-icon :icon="{ prefix: 'fa', iconName: 'bars' }"></font-awesome-icon>
    </el-button>
    <el-drawer
      :modalAppendToBody="false"
      title="I am the title"
      size="70%"
      :visible.sync="drawer"
      :with-header="false">
      <el-button
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  }
}
</script>

<style scoped>

</style>
