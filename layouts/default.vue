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
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap');

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  background-color: #ebeef5;
  color: #000;
}


*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

a {
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
  }
}

.title {
  font-weight: normal;
  margin: 10px 0 20px;
  padding: 0 15px;
}

//.el-upload--picture-card {
//  height: 240px !important;
//  width: 180px !important;
//  line-height: normal;
//  font-size: 12px;
//  padding: 70px 10px 0;
//}
//
//.el-upload-list__item {
//  height: 240px !important;
//  width: 180px !important;
//
//  img {
//    object-fit: cover;
//  }
//}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-height: 100px;
  //min-width: 100px;
  line-height: normal;
  padding: 30px 15px 20px;
  img {
    object-fit: cover;
    max-height: 250px;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

textarea {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 12px !important;

}

.el-tabs__item {
  color: #606266 !important;
}

.el-notification__content {
  p {
    text-align: left;
  }
}

.ql-container{
  min-height: 300px !important;
}

.codex-editor__redactor {
  padding-bottom: 150px !important;
}

.el-divider {
  margin: 15px 0 !important;
}
</style>
