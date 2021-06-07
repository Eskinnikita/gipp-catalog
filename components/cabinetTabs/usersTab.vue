<template>
  <div class="cabinet-tab">
    <user-snippet
      v-if="items.length"
      v-for="(item, index) in items"
      :key="index"
      :user-info="item"
      @openDeleteModal="openDeleteModal(item)"
    />
    <confirm-dialog ref="deleteConfirmModal" :on-confirm="deleteUser" title="Подтверждение">
      Вы уверены, что хотите удалить пользователя?
    </confirm-dialog>
  </div>
</template>

<script>
import confirmDialog from "@/components/modals/confirmDialog"
import userSnippet from "@/components/cabinetSnippets/userSnippet"

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
      userToDelete: null
    }
  },
  methods: {
    openDeleteModal(user) {
      this.userToDelete = user
      this.$refs.deleteConfirmModal.opened = true
    },
    sendNotification(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type,
        position: 'bottom-right'
      });
    },
    deleteUser() {
      let route = ''
      if (this.userToDelete.role === 1) {
        route = `/users/`
      } else if (this.userToDelete.role === 2) {
        route = '/organs/block/'
      } else if (this.userToDelete.role === 3) {
        route = '/publisher/block/'
      }
      route += this.userToDelete.id
      this.$store.dispatch('admin/deleteUser', {route, role: this.userToDelete.role})
        .then(() => {
          this.$refs.deleteConfirmModal.opened = false
          this.userToDelete = null
          this.sendNotification('Успех!', 'Пользователь удален', 'success')
        })
    }
  }
}
</script>

<style scoped>

</style>
