<template>
  <div class="thank-you">
    <h2 class="title">
      Спасибо, что оставили заявку.
    </h2>
    <p class="thank-you__text">Заявка будет рассмотрена администратором.
      Для уточнения информации мы свяжемся с вами по указанным контактным данным.
    </p>
    <el-button type="primary" @click="goToMainPage">На главную</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goToMainPage() {
      this.$router.push({path: "/"});
    }
  }
}
</script>

<style lang="scss" scoped>
  .thank-you {
    text-align: center;
    margin: 0 auto;

    &__text {
      margin-bottom: 20px;
    }
  }
</style>
