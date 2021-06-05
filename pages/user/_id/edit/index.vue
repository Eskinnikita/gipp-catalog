<template>
  <div class="pub-create">
    <confirm-dialog ref="confirmModal" :on-confirm="updatePublisher" title="Подтверждение">
      Вы уверены, что хотите внести изменения?
    </confirm-dialog>
    <h3 class="pub-create__title">Редактирование профиля</h3>
    <h4 class="pub-create__title">Аватар профиля <span
      style="font-weight: normal">(нажмите на логотип для изображения)</span></h4>
    <div class="pub-create__cover">
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-change="handleChange"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" alt="Логотип издателя" class="avatar">
        <template v-else>
          <i style="margin-bottom: 15px" slot="default" class="el-icon-plus"></i>
          <p>Нажмите или перетащите <br> изображение <br> для загрузки</p>
        </template>
      </el-upload>
      <h4 class="pub-create__title"></h4>
      <div class="pub-create__form">
        <el-form :model="user" status-icon :rules="rules" ref="userForm">
          <template v-if="user.role === 2">
            <el-form-item label="Описание">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="Введите описание"
                v-model="user.description">
              </el-input>
            </el-form-item>
            <el-form-item label="Контактный номер телефона" prop="phone">
              <el-input v-model="user.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Ваш адрес">
              <el-input v-model="user.address" autocomplete="off"></el-input>
            </el-form-item>
          </template>
          <template v-if="user.role === 1">
            <el-form-item label="Ваше имя" prop="name">
              <el-input v-model="user.name" autocomplete="off"></el-input>
            </el-form-item>
          </template>
          <el-form-item class="pub-create__controls">
            <el-button type="primary" @click="openConfirmModal">Сохранить</el-button>
            <el-button>Назад</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
import confirmDialog from "@/components/modals/confirmDialog"

export default {
  middleware: "isOrganOrUser",
  components: {
    confirmDialog
  },
  created() {
    this.routeName = this.$route.name.split('-')[0]
    if (this.routeName === 'organization') {
      this.user.role = 2
    } else if (this.routeName === 'user') {
      this.user.role = 1
    }
    this.serverUrl = process.env.serverUrl
    this.userId = +this.$route.params.id
    this.user.id = this.userId
    this.$store.dispatch('user/getUserForUpdate', {
      id: this.userId,
      role: this.user.role
    })
      .then(userInfo => {
        this.parseForUpdate(userInfo)
      })
  },
  data() {
    return {
      userId: null,
      imageFile: null,
      imageUrl: '',
      user: {
        description: '',
        phone: '',
        name: '',
        address: ''
      },
      rules: {
        contactMail: [
          {type: 'email', message: 'Пожалуйста, проверьте введенную почту', trigger: ['blur', 'change']}
        ],
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleChange(file, fileList) {
      console.log(file)
      this.imageFile = file.raw
    },
    handleRemove(file) {
      this.imageUrl = ''
    },
    openConfirmModal() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.$refs.confirmModal.opened = true
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updatePublisher() {
      let updateData = {}
      if(this.user.role === 1) {
        updateData.name = this.user.name
      } else {
        updateData = this.user
      }
      const formData = new FormData();
      formData.append('user', JSON.stringify(updateData))
      formData.append('logo', this.imageFile)
      this.$store.dispatch('user/updateUser', {id: this.user.id, role: this.user.role, formData: formData})
        .then(() => {
          this.$notify({
            title: 'Данные обновлены',
            message: 'Изменения успешно сохранены!',
            type: 'success',
            position: 'bottom-right'
          });
          this.$refs.confirmModal.opened = false
        })
    },
    parseForUpdate(userInfo) {
      if (userInfo.role === 1) {
        this.user.name = userInfo.name
      } else if (userInfo.role === 2) {
        this.user.description = userInfo.description
        this.user.phone = userInfo.phone
        this.user.address = userInfo.address
      }
      if (userInfo.logoUrl) {
        this.imageUrl = this.serverUrl + '/' + userInfo.logoUrl
      }
      console.log(this.user)
    }
  },
  computed: {
    coverUrl() {
      return this.serverUrl + '/' + this.recPub.coverLink
    }
  }
}
</script>

<style lang="scss" scoped>
.pub-create {
  &__title {
    padding-bottom: 10px;
    border-bottom: 1px solid #E4E7ED;
    margin: 15px 0;
  }

  &__controls {
    margin-top: 40px;
  }
}

</style>
