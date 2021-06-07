<template>
  <div class="pub-create">
    <confirm-dialog ref="confirmModal" :on-confirm="updatePublisher" title="Подтверждение">
      Вы уверены, что хотите внести изменения?
    </confirm-dialog>
    <h3 class="pub-create__title">Редактирование издательства</h3>
    <h4 class="pub-create__title">Логотип издательства <span style="font-weight: normal">(нажмите на логотип для изменения)</span></h4>
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
          <p>Нажмите или перетащите  <br> изображение  <br> для загрузки</p>
        </template>
      </el-upload>
      <h4 class="pub-create__title"></h4>
      <div class="pub-create__form">
        <el-form :model="publisher" status-icon :rules="rules" ref="publisherForm">
          <el-form-item label="Описание">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="Введите описание"
              v-model="publisher.description">
            </el-input>
          </el-form-item>
          <el-form-item label="Электронная почта для связи" prop="contactMail">
            <el-input v-model="publisher.contactMail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Телефон для связи">
            <el-input v-model="publisher.contactPhone" autocomplete="off"></el-input>
          </el-form-item>
          <h4 class="pub-create__title">Цветовая схема</h4>
          <el-form-item style="margin-bottom: 0" label="Акцентный цвет">
          </el-form-item>
          <swatches-picker v-model="colors.accentColor" :palette="colorPalette[0].accentPalette"/>
          <el-form-item style="margin-bottom: 0" label="Основной цвет">
          </el-form-item>
          <swatches-picker v-model="colors.mainColor" :palette="colorPalette[0].mainPalette"/>
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
import palette from '@/assets/jsons/palette.json'
export default {
  middleware: "isPublisher",
  components: {
    confirmDialog
  },
  created() {
    console.log(this.colorPalette)
    this.serverUrl = process.env.serverUrl
    this.publisherId = +this.$route.params.id
    this.$store.dispatch('publisher/getPublisher', +this.publisherId)
      .then(publisherInfo => {
        this.parseForUpdate(publisherInfo)
      })
  },
  data() {
    return {
      colorPalette: palette,
      colors: {
        mainColor: '',
        accentColor: ''
      },
      publisherId: null,
      imageFile: null,
      disabled: false,
      imageUrl: '',
      publisher: {
        description: '',
        contactMail: '',
        contactPhone: ''
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
      this.$refs["publisherForm"].validate((valid) => {
        if (valid) {
          this.$refs.confirmModal.opened = true
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updatePublisher() {
      const colorConfig = {
        publisherId: this.publisherId,
        mainColor: this.colors.mainColor.hex,
        accentColor: this.colors.accentColor.hex
      }
      const formData = new FormData();
      formData.append('publisher', JSON.stringify(this.publisher))
      formData.append('logo', this.imageFile)
      formData.append('config', JSON.stringify(colorConfig))
      this.$store.dispatch('publisher/updatePublisher', {id: this.publisherId, formData: formData})
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
    parseForUpdate(publisherInfo) {
      const keys = ['description', 'contactMail', 'contactPhone']
      for (let k in publisherInfo) {
        if (keys.indexOf(k) !== -1 && publisherInfo.hasOwnProperty(k)) {
          this.publisher[k] = publisherInfo[k]
        }
      }
      if (publisherInfo.logoUrl) {
        this.imageUrl = this.serverUrl + '/' + publisherInfo.logoUrl
      }
      this.colors.mainColor = publisherInfo.PublisherConfig.mainColor
      this.colors.accentColor = publisherInfo.PublisherConfig.accentColor

    }
  },
  computed: {

  },
  head() {
    return {
      title: `Редактирование профиля | ${process.env.appName}`
    }
  },
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
