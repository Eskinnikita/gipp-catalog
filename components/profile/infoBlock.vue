<template>
  <div class="page-info">
    <div class="page-info__item" v-for="(item, index) in infoItems" v-if="item.value" :key="index">
        <div class="page-info__title">
          {{ item.label }}
        </div>
        <div class="page-info__text">
          {{ item.value }}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.page-info {
  padding: 15px;
  font-size: 14px;
  background-color: #fff;
  border-radius: 4px;
  &__item:not(:last-child) {
    margin-bottom: 20px;
  }

  &__title {
    color: #606266;
    margin-bottom: 5px;
  }

}
</style>
