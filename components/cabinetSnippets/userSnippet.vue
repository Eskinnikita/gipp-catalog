<template>
  <div class="user-snippet">
    <div class="user-snippet__left">
      <div class="user-snippet__avatar">
        <el-avatar icon="el-icon-user-solid" size="large"></el-avatar>
      </div>
      <div>
        <div class="user-snippet__snippet-info snippet-info">
          <el-button @click="goToProfile(userInfo.role, userInfo.id)" type="text" class="snippet-info__name">{{ userInfo.name }}</el-button>
          <div class="reader-snippet__additional-info">
            <div class="reader-snippet__additional-info-item">
              <i class="el-icon-message"/> {{ userInfo.email }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="+userInfo.role === 1 || userInfo.approved">
      <el-button type="primary" @click="goToEdit(userInfo.role, userInfo.id)"  icon="el-icon-edit" circle></el-button>
      <el-button type="danger" @click="openDeleteModal" icon="el-icon-delete" circle></el-button>
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
    openDeleteModal(){
      this.$emit('openDeleteModal')
    },
    openConfirmModal(){
      const modalData = this.userInfo
      modalData.modalId = 1
      modalData.message = 'Принять заявку?'
      this.$emit('openConfirmDialog', modalData)
    },
    openDenyModal(){
      const modalData = this.userInfo
      modalData.modalId = 1
      modalData.message = 'Отклонить заявку?'
      this.$emit('openDenyDialog', modalData)
    },
    goToProfile(role, id) {
      if (role === 3) {
        this.$router.push({path: `/publisher/${id}`, query: {tab: 'catalog', page: '1'}});
      } else if (role === 1) {
        this.$router.push({path: `/user/${id}`, query: {tab: 'comments', page: '1'}});
      } else if (role === 2) {
        this.$router.push({path: `/organization/${id}`, query: {tab: 'news', page: '1'}});
      }
    },
    goToEdit(role, id) {
      if (role === 3) {
        this.$router.push({path: `/publisher/${id}/edit`});
      } else if (role === 1) {
        this.$router.push({path: `/user/${id}/edit`});
      } else if (role === 2) {
        this.$router.push({path: `/organization/${id}/edit`});
      }
    }
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
    font-weight: normal !important;
    font-size: 16px;
  }
}

@media (max-width: 575.98px) {
  .user-snippet {
    flex-direction: column !important;
    align-items: flex-start !important;

    &__left {
      margin-bottom: 15px;
    }
  }
}
</style>
