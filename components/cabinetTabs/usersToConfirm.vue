<template>
  <div class="cabinet-tab">
    <user-snippet
      v-if="items.length" v-for="(item, index) in items"
      :key="index"
      :user-info="item"
      @openConfirmDialog="openUsersConfirmModal('confirm', item)"
      @openDenyDialog="openUsersConfirmModal('deny', item)"
    />
    <confirm-dialog ref="usersConfirmDialog" :on-confirm="methodOnConfirm" title="Подтверждение">
      <span>{{ dialogMessage }}</span>
      <el-form v-if="actionType === 'deny'">
        <el-form-item label="Причина отклонения">
          <el-input v-model="denyComment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </confirm-dialog>
  </div>
</template>

<script>
import userSnippet from "@/components/cabinetSnippets/userSnippet"
import confirmDialog from "@/components/modals/confirmDialog"

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    userSnippet,
    confirmDialog
  },
  data() {
    return {
      dialogMessage: '',
      denyComment: '',
      userOnConfirm: null,
      actionType: 'confirm',
      methodOnConfirm: () => {
      },
    }
  },
  methods: {
    openUsersConfirmModal(type, user) {
      console.log(user)
      if (type === 'confirm') {
        this.actionType = 'confirm'
        this.userOnConfirm = user
        this.methodOnConfirm = this.confirmUser
        this.dialogMessage = 'Вы уверены, что хотите принять заявку?'
      }
      if (type === 'deny') {
        this.actionType = 'deny'
        this.userOnConfirm = user
        this.methodOnConfirm = this.denyUser
        this.dialogMessage = 'Вы уверены, что хотите отклонить заявку?'
      }
      this.$refs.usersConfirmDialog.opened = true
    },
    confirmUser() {
      this.$store.dispatch('admin/confirmRequest', {
        id: this.userOnConfirm.id,
        role: this.userOnConfirm.role
      }).then(() => {
        this.sendNotification('Пользователь одобрен!', 'Уведомление выслано пользователю на почту', 'success')
        this.$refs.usersConfirmDialog.opened = false
      })
    },
    denyUser() {
      this.$store.dispatch('admin/denyRequest', {
        id: this.userOnConfirm.id,
        role: this.userOnConfirm.role,
        comment: this.denyComment
      }).then(() => {
        this.denyComment = ''
        this.$refs.usersConfirmDialog.opened = false
        this.sendNotification('Заявка отклонена!', 'Уведомление выслано пользователю на почту', 'success')
      })
    },
    sendNotification(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type,
        position: 'bottom-right'
      });
    }
  }
}
</script>

<style scoped>

</style>
