<template>
  <button class="fav-button" :class="isFav ? 'fav-button_like' : 'fav-button_dislike'" :plain="!isFav">
    <font-awesome-icon :icon="{ prefix: 'fa', iconName: 'heart' }"></font-awesome-icon>
  </button>
</template>

<script>
export default {
  props: {
    isFav: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .fav-button {
    width: 100%;
    cursor: pointer;
    border: none;
    border-radius: 4px;

    &_like {
      background: #f56c6c;
      color: #fff;
      border: 2px solid #f56c6c;
    }

    &_dislike {
      color: #f56c6c;
      border: 2px solid #f56c6c;
      background-color: rgba(245, 108, 108, 0.1) ;
    }
  }

</style>
