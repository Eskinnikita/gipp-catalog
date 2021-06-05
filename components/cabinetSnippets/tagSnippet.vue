<template>
  <div>
    <div class="tag-snippet">
      <span class="tag-snippet__name">{{tag.tag}}</span>
      <el-button type="danger">Удалить</el-button>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag-snippet {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__name {
      font-size: 16px;
    }
  }
</style>
