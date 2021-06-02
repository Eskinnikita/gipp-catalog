<template>
  <div class="snippet-list">
    <template v-if="hasApprovedList">
      <div class="snippet-list__not-approved">
        <h3 class="snippet-list__title">Заявки на рассмотрение</h3>
        <user-snippet
          v-if="items.notApproved.length" v-for="(item, index) in items.notApproved"
          :key="index"
          :user-info="item"
          @openConfirmDialog="openConfirmDialog"
          @openDenyDialog="openDenyDialog"
        />
        <p v-if="!items.notApproved.length">Новых заявок нет</p>
      </div>
      <el-divider></el-divider>
      <div class="snippet-list__approved">
        <h3 class="snippet-list__title">Все пользователи</h3>
        <el-input
          class="snippet-list__search"
          placeholder="Поиск"
          prefix-icon="el-icon-search"
          v-model.lazy="search"
        ></el-input>
        <user-snippet
          v-if="items.approved && items.approved.rows.length"
          v-for="(item, index) in items.approved.rows"
          :key="index"
          :user-info="item"
          @openConfirmDialog="openConfirmDialog"
          @openDenyDialog="openDenyDialog"
        />
        <p v-if="!items.approved.rows.length">Список пуст</p>
      </div>
    </template>
    <template v-if="role === 1">
      <div class="snippet-list__users">
        <h3 class="snippet-list__title">Все пользователи</h3>
        <el-input
          class="snippet-list__search"
          placeholder="Поиск"
          prefix-icon="el-icon-search"
          v-model.lazy="search"
        ></el-input>
        <user-snippet
          v-if="items.rows.length"
          v-for="(item, index) in items.rows"
          :key="index"
          :user-info="item"
          @openConfirmDialog="openConfirmDialog"
          @openDenyDialog="openDenyDialog"
        />
        <p v-if="!items.rows.length">Список пуст</p>
      </div>
    </template>
    <template v-if="role === 5">
      <div class="snippet-list__users">
        <h3 class="snippet-list__title">Комментарии на рассмотрение</h3>
        <template v-if="items.rows.length">
          <review-snippet
            :approved="false"
            :show-controls="true"
            @openConfirmDialog="openConfirmDialog"
            @openDenyDialog="openDenyDialog"
            class="snippet-list__review-block"
            v-for="(item, index) in items.rows"
            :key="index"
            :comment-info="item"
          />
        </template>
        <p v-if="!items.rows.length">Список пуст</p>
      </div>
    </template>
        <!-- ДИАЛОГ ПОДТВЕЖДЕНИЯ ЗАЯВКИ -->
        <el-dialog
          title="Подтверждение действия"
          :visible.sync="dialogVisible"
          width="30%">
          <span v-if="dataOnConfirm">
            {{dataOnConfirm.message}}
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Отменить</el-button>
            <el-button type="primary" @click="confirmRequest">Подтвердить</el-button>
          </span>
        </el-dialog>
        <!-- ДИАЛОГ ОТКЛОНЕНИЯ ЗАЯВКИ -->
        <el-dialog
          title="Отклонение действия"
          :visible.sync="denyDialogVisible"
          width="30%">
          <span v-if="dataOnConfirm">
             {{dataOnDeny.message}}
          </span>
          <el-form v-if="dataOnConfirm.modalId === 1">
            <el-form-item label="Причина отклонения">
              <el-input v-model="denyComment" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="denyDialogVisible = false">Отменить</el-button>
            <el-button type="primary" @click="denyRequest">Подтвердить</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
import userSnippet from "@/components/cabinetSnippets/userSnippet"
import reviewSnippet from "@/components/snippets/reviewSnippet"

export default {
  components: {
    userSnippet,
    reviewSnippet
  },
  created() {
    if (this.$route.query.search) {
      this.search = this.$route.query.search
    }
  },
  data() {
    return {
      search: '',
      timer: null,
      dialogVisible: false,
      denyDialogVisible: false,
      dataOnConfirm: {},
      dataOnDeny: {},
      denyComment: ''
    }
  },
  props: {
    items: {
      type: Object,
      required: true
    },
    role: {
      type: Number,
      required: true
    }
  },
  methods: {
    sendNotification(title, message) {
      this.$notify({
        title: title,
        message: message,
        type: 'success',
        position: 'bottom-right'
      });
    },
    sendSearchString() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.$emit('setSearchValue', this.search)
      }, 800);
    },
    openConfirmDialog(data) {
      this.dataOnConfirm = data
      this.dialogVisible = true
      console.log('called')
    },
    openDenyDialog(data) {
      this.dataOnDeny = data
      this.denyDialogVisible = true
    },
    confirmRequest() {
      console.log('called 2')
      if(this.dataOnConfirm.modalId === 1) {
        this.$store.dispatch('admin/confirmRequest', {
          id: this.dataOnConfirm.id,
          role: this.dataOnConfirm.role
        }).then(() => {
          this.sendNotification('Пользователь одобрен!', 'Уведомление выслано пользователю на почту')
          this.dialogVisible = false
        })
      } else if(this.dataOnConfirm.modalId === 2) {
        this.$store.dispatch('admin/confirmReview', {
          id: this.dataOnConfirm.id
        }).then(() => {
          this.dialogVisible = false
          this.sendNotification('Отзыв опебликован!', 'Отзыв появился на странице издания')
        })
      }
    },
    denyRequest() {
      if(this.dataOnDeny.modalId === 1) {
        this.$store.dispatch('admin/denyRequest', {
          id: this.dataOnDeny.id,
          role: this.dataOnDeny.role,
          comment: this.denyComment
        }).then(() => {
          this.denyComment = ''
          this.denyDialogVisible = false
          this.sendNotification('Заявка отклонена!', 'Уведомление выслано пользователю на почту')
        })
      } else if(this.dataOnDeny.modalId === 2) {
        this.$store.dispatch('admin/denyReview', {
          id: this.dataOnConfirm.id,
          role: this.dataOnConfirm.role
        }).then(() => {
          this.dialogVisible = false
          this.sendNotification('Отзыв отклонен!', 'Отказ в публикации отзыва')
        })
      }
    },
  },
  computed: {
    isUser() {
      const roles = [1, 2, 3]
      return roles.indexOf(this.role) !== -1
    },
    hasApprovedList() {
      const roles = [2, 3]
      return roles.indexOf(this.role) !== -1
    }
  },
  watch: {
    search() {
      this.sendSearchString()
    }
  }
}
</script>

<style lang="scss" scoped>
.snippet-list {
  padding: 20px 30px 30px 30px;

  &__not-found {
    text-align: center;
  }

  &__search {
    max-width: 450px;
    margin: 0 0 15px 0;
  }

  &__not-approved {
    margin-bottom: 30px;
  }

  &__title {
    margin-bottom: 15px;
  }

  &__review-block {
    margin-top: 25px;
    width: 100%;
  }
}
</style>
