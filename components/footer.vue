<template>
  <div class="footer">
    <div class="footer__inner">
      <div class="footer__left">
        <img class="footer__logo" src="../assets/logos/polytechLogo.png" alt="Логотип московского политеха"/>
        <h5 class="footer__title">Каталог детских изданий СППИ ГИПП. 2021.</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 70px;
  background-color: #fff;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 15px;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    min-width: 900px;
  }

  &__left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  &__title {
    font-weight: normal;
  }

  &__logo {
    height: 30px;
    margin-right: 20px;
  }
}

@media (max-width: 575.98px) {
  .footer {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 815px) {

  .footer {
    &__inner {
      min-width: 100%;
    }
  }
}

</style>
