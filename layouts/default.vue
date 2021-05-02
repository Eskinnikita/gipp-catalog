<template>
  <div>
    <Header />
    <main class="page">
      <div class="page__container">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  background-color: #ebeef5;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

a {
  color: #000 !important;
  text-decoration: none;
}

.el-avatar > img {
  width: 100% !important;
}

.page {
  &__container {
    min-height: 100vh;
    padding: 15px;
    margin: 85px auto 20px;
    max-width: 1020px;
    background-color: #fff;
    border-radius: 4px;
    // border: 1px solid black;
  }
}
</style>
