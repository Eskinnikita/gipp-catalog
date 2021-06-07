<template>
  <div class="error-page">
    <h3 class="error-page__message">К сожалению, страница, которую вы ищите, отсутствует :(</h3>
    <h1>404</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.error-page {
  font-weight: normal !important;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__message {
    margin-bottom: 30px;
  }
}
</style>
