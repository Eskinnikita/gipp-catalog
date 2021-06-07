<template>
  <div class="cabinet-tab">
    <template v-if="items.length">
      <review-snippet
        :approved="false"
        :show-controls="true"
        @openConfirmDialog="openReviewsModal('confirm', item)"
        @openDenyDialog="openReviewsModal('deny', item)"
        class="cabinet-tab__snippet"
        v-for="(item, index) in items"
        :key="index"
        :comment-info="item"
      />
    </template>
    <confirm-dialog ref="reviewsModal" :on-confirm="methodOnConfirm" title="Подтверждение">
      {{ dialogMessage }}
    </confirm-dialog>
  </div>
</template>

<script>
import confirmDialog from "@/components/modals/confirmDialog"
import reviewSnippet from "@/components/snippets/reviewSnippet"

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    confirmDialog,
    reviewSnippet
  },
  data() {
    return {
      dialogMessage: '',
      methodOnConfirm: () => {
      },
      reviewOnConfirm: null
    }
  },
  methods: {
    openReviewsModal(type, review) {
      if (type === 'confirm') {
        this.reviewOnConfirm = review
        this.methodOnConfirm = this.confirmReview
        this.dialogMessage = 'Вы уверены, что хотите опубликовать отзыв?'
      }
      if (type === 'deny') {
        this.reviewOnConfirm = review
        this.methodOnConfirm = this.denyReview
        this.dialogMessage = 'Вы уверены, что хотите отклонить отзыв?'
      }
      this.$refs.reviewsModal.opened = true
    },
    confirmReview() {
      this.$store.dispatch('admin/confirmReview', {
        id: this.reviewOnConfirm.id
      }).then(() => {
        this.$refs.reviewsModal.opened = false
        this.sendNotification('Отзыв опубликован!', 'Отзыв появился на странице издания', 'success')
      })
    },
    denyReview() {
      this.$store.dispatch('admin/denyReview', {
        id: this.reviewOnConfirm.id
      }).then(() => {
        this.$refs.reviewsModal.opened = false
        this.sendNotification('Отзыв отклонен!', 'Отказ в публикации отзыва', 'success')
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

<style lang="scss" scoped>
.cabinet-tab {
  &__snippet {
    margin-bottom: 20px;
  }
}
</style>
