<template>
  <div>
    <Header />
    <div class="page">
      <div class="page__container">
        <Nuxt />
      </div>
    </div>
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

.el-avatar>img {
  width: 100% !important;
}

.page__container {
  padding: 85px 15px 0;
  margin: 0 auto;
  max-width: 1020px;
  // border: 1px solid black;
}
</style>
