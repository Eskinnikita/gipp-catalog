<template>
  <div class="snippet-list">
    <template v-if="items.length">
      <el-row class="snippet-list__search-container">
        <el-col :md="10">
          <el-input
            class="snippet-list__search"
            placeholder="Поиск"
            prefix-icon="el-icon-search"
            v-model="search"
          ></el-input>
        </el-col>
      </el-row>
      <user-snippet v-for="(item, index) in items" :user-info="item" :key="index"/>
    </template>
    <template v-else>
      <div class="snippet-list__not-found">
        Список пуст
      </div>
    </template>
  </div>
</template>

<script>
import userSnippet from "@/components/cabinetSnippets/userSnippet"
export default {
  components: {
    userSnippet
  },
  props: {
    search: '',
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .snippet-list {
    &__search {
      margin-bottom: 25px;
    }

    &__not-found {
      text-align: center;
    }

    &__search-container {

    }
  }
</style>
