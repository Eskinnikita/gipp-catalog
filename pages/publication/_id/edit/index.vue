<template>
  <div class="pub-create">
    <confirm-dialog ref="confirmModal" :on-confirm="updatePublication" title="Подтверждение">
      Вы уверены, что хотите внести изменения?
    </confirm-dialog>
    <h3 class="pub-create__title">Создание издания</h3>
    <h4 class="pub-create__title">Обложка <span style="font-weight: normal">(нажмите на обложку для изменения)</span></h4>
    <div class="pub-create__cover">
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-change="handleChange"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" alt="Обложка" class="avatar">
        <template v-else>
          <i style="margin-bottom: 15px" slot="default" class="el-icon-plus"></i>
          <p>Нажмите или перетащите  <br> изображение  <br> для загрузки</p>
        </template>
      </el-upload>
      <h4 class="pub-create__title"></h4>
      <div class="pub-create__form">
        <el-form :model="publication" status-icon :rules="rules" ref="pubForm">
          <el-form-item label="Название" prop="title">
            <el-input v-model="publication.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Ссылка на оформление подписки">
            <el-input v-model="publication.subsLink" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Описание">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="Введите описание"
              v-model="publication.desc">
            </el-input>
          </el-form-item>
          <el-form-item label="Выберите тип"><br>
            <el-select v-model="publication.type" placeholder="Select">
              <el-option
                v-for="item in pubTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Выберите возрастной рейтинг"><br>
            <el-select v-model="publication.age" placeholder="Select">
              <el-option
                v-for="item in age"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Выберите периодичность"><br>
            <el-row>
              <el-col :md="4">
                <el-input
                  prop="count"
                  placeholder="Количество"
                  type="number"
                  v-model="publication.count">
                </el-input>
              </el-col>
              <el-col :md="1" style="text-align: center">
                <span>в</span>
              </el-col>
              <el-col :md="4">
                <el-select v-model="publication.period" placeholder="Select">
                  <el-option
                    v-for="item in period"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="Количество полос">
            <el-input type="number" v-model="publication.strips" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Средний вес одного выпуска (в граммах)">
            <el-input type="number" v-model="publication.weight" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Подписной индекс">
            <el-input v-model="publication.subindex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Выберите один или несколько тегов"><br/>
            <el-select v-model="publicationTags" multiple placeholder="Теги">
              <el-option
                filterable
                v-for="(item, index) in tags"
                :key="index"
                :label="item.tag"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
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
  middleware: "isPublisher",
  components: {
    confirmDialog
  },
  created() {
    this.publicationId = this.$route.params.id
    this.serverUrl = process.env.serverUrl
    this.$store.dispatch('publication/getTags').then(res => {
      if(res) {
        this.tags = res
      }
    })
    this.$store.dispatch('publication/getPublicationForUpdate', this.publicationId)
    .then(res => {
      this.publication = JSON.parse(JSON.stringify(res))
      if(res.coverLink) {
        this.imageUrl = this.serverUrl + '/' + res.coverLink
      }
      this.parseTagsForUpdate(this.publication.tags)
    })
  },
  data() {
    return {
      publicationId: null,
      imageFile: null,
      disabled: false,
      imageUrl: '',
      tags: [],
      publicationTags: [],
      publication: {
        publisherId: this.$store.state.auth.user.id,
        title: '',
        subsLink: '',
        desc: '',
        type: 'Журнал',
        age: '0+',
        count: 1,
        period: 'неделю',
        strips: null,
        weight: null
      },
      rules: {
        title: [
          {required: true, message: 'Пожалуйста, введите название', trigger: 'blur'}
        ]
      },
      pubTypes: [{
        value: 'Журнал',
        label: 'Журнал'
      }, {
        value: 'Газета',
        label: 'Газета'
      }, {
        value: 'Книга',
        label: 'Книга'
      }, {
        value: 'Зарубежное издание',
        label: 'Зарубежное издание'
      }],
      age: [{
        value: '0+',
        label: '0+'
      }, {
        value: '6+',
        label: '6+'
      }, {
        value: '12+',
        label: '12+'
      }, {
        value: '16+',
        label: '16+'
      }],
      period: [{
        value: 'неделю',
        label: 'неделю'
      }, {
        value: 'месяц',
        label: 'месяц'
      }, {
        value: 'триместр',
        label: 'триместр'
      },
        {
          value: 'полугодие',
          label: 'полугодие'
        },
        {
          value: 'год',
          label: 'год'
        }]
    }
  },
  methods: {
    parseTagsForUpdate(tags) {
      tags.forEach(el => {
        this.publicationTags.push(el.PubTag.id)
      })
    },
    openConfirmModal() {
      this.$refs["pubForm"].validate((valid) => {
        if (valid) {
          this.$refs.confirmModal.opened = true
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleChange(file, fileList) {
      this.imageFile = file.raw
    },
    parseTags(tags) {
       return tags.map(el => {
         return {
           publicationId: +this.publicationId,
           pubTagId: el
         }
       })
    },
    updatePublication() {
      const parsedTags = this.parseTags(this.publicationTags)
      this.publication.weight = +this.publication.weight
      this.publication.strips = +this.publication.strips
      const formData = new FormData();
      formData.append('publication', JSON.stringify(this.publication))
      formData.append('tags', JSON.stringify(parsedTags))
      formData.append('cover', this.imageFile)
      this.$store.dispatch('publication/updatePublication', {id: this.publicationId, formData: formData})
        .then(() => {
          this.$refs.confirmModal.opened = false
          this.$notify({
            title: 'Успешное добавление',
            message: 'Информация об издании успешно обновлена!',
            type: 'success',
            position: 'bottom-right'
          });
          this.$router.push({path: `/publication/${this.publicationId}`});
        })
    }
  },
  head() {
    return {
      title: `Редактирование издания | ${process.env.appName}`
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
