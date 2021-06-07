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
    deleteUser() {
      this.$store.dispatch('admin/getUsers', this.userToDelete)
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
