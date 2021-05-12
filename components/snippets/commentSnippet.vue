<template>
  <div class="comment-snippet">
    <div class="comment-snippet__avatar">
      <el-avatar size="large" icon="el-icon-user-solid"></el-avatar>
    </div>
    <div class="comment-snippet__info">
      <h4 class="comment-snippet__name">Ескин Никита</h4>
      <p class="comment-snippet__text">Build your next Vue.js application with confidence using NuxtJS. An open source framework making web
        development simple and powerful.
      </p>
      <span class="comment-snippet__time">27 минут назад</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.comment-snippet {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  :last-child {
    margin-bottom: 10px;
  }

  &__name {
    font-weight: normal;
    margin-bottom: 5px;
  }

  &__info {
    border-bottom: 1px solid #E4E7ED;
    padding-bottom: 10px;
    padding-left: 15px;
  }

  &__text {
    margin-bottom: 5px;
    font-size: 14px;
  }

  &__time {
    font-size: 14px;
  }

  &__avatar {
    width: 40px;
  }
}
</style>
