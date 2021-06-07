<template>
  <div class="cabinet-tab">
    <div class="cabinet-tab__tag-add">
      <el-input
        class="cabinet-tab__search"
        placeholder="Тег"
        v-model.lazy="tag"
      ></el-input>
      <el-button type="primary" @click="addTag">Добавить</el-button>
    </div>
    <template v-if="items.length">
      <tag-snippet
        @openTagDeleteConfirmDialog="openTagDeleteConfirmDialog"
        class="cabinet-tab__tag-snippet"
        v-for="(item, index) in items"
        :key="index"
        :tag="item"
      />
    </template>
    <confirm-dialog ref="tagDeleteConfirmModal" :on-confirm="deleteTag" title="Подтверждение">
      Вы уверены, что хотите удалить тег?
    </confirm-dialog>
  </div>
</template>

<script>
import tagSnippet from "@/components/cabinetSnippets/tagSnippet"
import confirmDialog from "@/components/modals/confirmDialog"

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    confirmDialog,
    tagSnippet
  },
  data() {
    return {
      tagToDelete: null,
      tag: '',
    }
  },
  methods: {
    addTag() {
      const tag = this.tag.trim()
      if (this.tag.trim()) {
        this.$store.dispatch('admin/addTag', {
          tag: tag.toLowerCase()
        }).then(() => {
          this.tag = ''
          this.sendNotification('Успех!', 'Тег добавлен', 'success')
        }).catch(e => {
          this.sendNotification('Ошибка!', 'Тег уже существует', 'error')
        })
      }
    },
    deleteTag() {
      this.$store.dispatch('admin/deleteTag', this.tagToDelete)
        .then(() => {
          this.$refs.tagDeleteConfirmModal.opened = false
          this.tagToDelete = null
          this.sendNotification('Успех!', 'Тег удален', 'success')
        })
    },
    openTagDeleteConfirmDialog(data) {
      this.$refs.tagDeleteConfirmModal.opened = true
      this.tagToDelete = data.id
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
  &__search {
    max-width: 450px;
    margin: 0 0 15px 0;
  }

  &__tag-add {
    margin-top: 20px;
  }
}
</style>
