<template>
  <div class="user-snippet">
    <el-row :gutter="10">
      <el-col :md="2">
        <el-avatar icon="el-icon-user-solid" size="large"></el-avatar>
      </el-col>
      <el-col :md="20">
        <div class="user-snippet__snippet-info snippet-info">
          <h4 class="snippet-info__name">{{ userInfo.name }}</h4>
          <div class="reader-snippet__additional-info">
            <div class="reader-snippet__additional-info-item">
              <i class="el-icon-message"/> {{userInfo.email}}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="2">
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.user-snippet {
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #E4E7ED;
  padding: 15px 5px;
  &__info {

  }

  &__additional-info-item {

  }
}

.snippet-info {
  &__name {
    font-weight: normal;
    margin-bottom: 15px;
  }
}
</style>
