<template>
  <div class="user-snippet">
    <div class="user-snippet__left">
      <div class="user-snippet__avatar">
        <el-avatar icon="el-icon-user-solid" size="large"></el-avatar>
      </div>
      <div>
        <div class="user-snippet__snippet-info snippet-info">
          <h4 class="snippet-info__name">{{ userInfo.name }}</h4>
          <div class="reader-snippet__additional-info">
            <div class="reader-snippet__additional-info-item">
              <i class="el-icon-message"/> {{ userInfo.email }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="+userInfo.role === 1 || userInfo.approved">
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </div>
    <div v-if="notApproved">
      <el-button type="success" @click="openConfirmModal" plain>Принять</el-button>
      <el-button type="danger" @click="openDenyModal" plain>Отклонить</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    openConfirmModal(){
      this.$emit('openDialog', this.userInfo)
    },
    openDenyModal(){
      console.log('dfdf')
      this.$emit('openDenyDialog', this.userInfo)
    },
  },
  computed: {
    notApproved() {
      return (+this.userInfo.role === 2 || +this.userInfo.role === 3) && !this.userInfo.approved
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__avatar {
    margin-right: 30px;
  }

  &__left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
