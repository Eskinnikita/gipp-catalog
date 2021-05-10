<template>
  <div class="pub-create">
    <h3 class="pub-create__title">Редактирование издательства</h3>
    <h4 class="pub-create__title">Логотип издательства</h4>
    <div class="pub-create__cover">
      <el-upload
        :on-change="handleChange"
        action="#"
        list-type="picture-card"
        :auto-upload="false">
        <div slot="file" slot-scope="{file}" v-if="imageUrl">
          <img
            class="el-upload-list__item-thumbnail"
            :src="imageUrl" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
        <i style="margin-bottom: 15px" slot="default" class="el-icon-plus"></i>
        <p>Нажмите или перетащите изображение для загрузки</p>
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
          <el-form-item class="pub-create__controls">
            <el-button type="primary" @click="updatePublisher">Сохранить</el-button>
            <el-button>Назад</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  created() {
    this.publisherId = +this.$route.params.id
  },
  data() {
    return {
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
          { type: 'email', message: 'Пожалуйста, проверьте введенную почту', trigger: ['blur', 'change'] }
        ],
      }
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.imageFile = file.raw
    },
    handleRemove(file) {
      this.imageUrl = ''
    },
    updatePublisher() {
      this.$refs["publisherForm"].validate((valid) => {
        if (valid) {
          const formData = new FormData();
          formData.append('publisher', JSON.stringify(this.publisher))
          formData.append('logo', this.imageFile)
          this.$store.dispatch('publisher/updatePublisher', {id: this.publisherId, formData: formData})
            // .then(() => {
            //   this.$router.push({path: `/publisher/${this.publisherId}`});
            // })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
