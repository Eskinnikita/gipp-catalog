<template>
  <div>
    <Header />
    <main class="page">
      <div class="page__container page__container_transparent">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  created() {
    console.log('TRANS RELOADED')
  }
};
</script>

<style lang="scss">
:root{
  --main-color: #ebeef5 !important;
  --accent-color: #1e88e5 !important;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  background-color: var(--main-color) !important;
  color: #303133;
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
    border-radius: 4px;
    &_transparent {
      background: none;
    }
  }
}

.title {
  font-weight: normal;
  margin: 10px 0 20px;
  padding: 0 15px;
}

//CUSTOM

.accent-element {
  background: var(--accent-color) !important;
  border: 1px solid var(--accent-color) !important;
  color: #fff !important;
}

.el-tabs__active-bar {
  background-color: var(--accent-color) !important;
}

.el-pager li{
  color: var(--accent-color) !important;
}

.el-button--text {
  color: var(--accent-color) !important;
}

</style>
