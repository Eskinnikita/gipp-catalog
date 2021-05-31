<template>
  <div class="article-editor">
    <confirm-dialog ref="confirmModal" :on-confirm="saveArticle" title="Подтверждение">
      {{ confirmMessage }}
    </confirm-dialog>
    <div class="article-editor__header">
      <div class="article-editor__editor-header">
        <h2 class="title">Редактор статьи</h2>
        <p class="article-editor__author" v-if="user">
          Автор: {{ user.name }}
        </p>
      </div>
      <el-form
        :model="article"
        :rules="rules"
        ref="articleForm"
      >
        <el-form-item label="Заголовок статьи" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <h4 class="article-editor__title">Главная картинка <span style="font-weight: normal">(нажмите на логотип для изменения)</span>
        </h4>
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="handleChange"
          :on-success="handleAvatarSuccess">
          <img v-if="article.mainImage" :src="article.mainImage" alt="Логотип издателя" class="avatar">
          <template v-else>
            <i style="margin-bottom: 15px" slot="default" class="el-icon-plus"></i>
            <p>Нажмите или перетащите <br> изображение <br> для загрузки</p>
          </template>
        </el-upload>
      </el-form>
    </div>
    <div class="article-editor__editor-container">
      <client-only>
        <editor
          :initialized="onInitialized"
          holder="article-editor"
          ref="editor"
          :config="config"
          @save="save"/>
      </client-only>
    </div>
    <div class="article-editor__controls">
      <el-button type="primary" @click="openPreview">Посмотреть</el-button>
      <el-button type="primary" v-if="!articleOnUpdate"
                 @click="openConfirmDialog('Вы уверены, что хотите опубликовать новость?')">Опубликовать
      </el-button>
      <el-button type="primary" v-else @click="openConfirmDialog('Сохранить изменения?')">Сохранить</el-button>
    </div>
    <el-dialog width="70%" title="Статья" :visible.sync="dialogVisible">
      <article-view :article="article" :preview="true"/>
    </el-dialog>
  </div>
</template>

<script>
import articleView from "@/components/news/articleView"
import confirmDialog from "@/components/modals/confirmDialog"
import {mapState} from 'vuex'

let Header, Paragraph, List, Marker, Quote, SimpleImage, Embed, Image
if (process.browser) {
  SimpleImage = require('@editorjs/simple-image')
  Header = require('@editorjs/header')
  Paragraph = require('@editorjs/paragraph')
  List = require('@editorjs/list')
  Marker = require('@editorjs/marker')
  Quote = require('@editorjs/quote')
  Embed = require('@editorjs/embed')
  Image = require('@editorjs/image')
}

export default {
  layout: 'transparent',
  components: {
    articleView,
    confirmDialog
  },
  beforeResolve(to, from, next) {
    if (this.$store.getters['auth/notUser'] && this.$store.getters['auth/isAuthenticated']) {
      console.log('ssss')
      next('/')
    } else {
      console.log('mmm')
      next();
    }
  },
  created() {
    if (this.$route.params.id) {
      this.$store.dispatch('article/getArticle', this.$route.params.id)
        .then(res => {
          this.articleOnUpdate = res
          this.parseArticleToUpdate(res)
        })
    }
    this.serverUrl = process.env.serverUrl
  },
  mounted() {
    if(this.user) {
      this.article.authorId = this.user.id
      this.article.authorRole = this.user.role
    }
  },
  data() {
    const self = this;
    return {
      rules: {
        title: [
          {required: true, message: 'Пожалуйста, введите заголовок', trigger: 'blur'}
        ]
      },
      articleOnUpdate: null,
      confirmMessage: '',
      article: {
        authorId: null,
        authorRole: null,
        title: '',
        mainImage: '',
        mainImageFile: null,
        editorContent: {
          "time": 1591362820044,
          version: "2.21.0",
          blocks: [
            {
              data: {
                level: 3,
                text: 'Заголовок'
              },
              id: '0m19K7Ia43',
              type: 'header'
            },
            {
              data: {
                text: "Текст статьи"
              },
              id: 'o4gio7RoC0',
              type: "paragraph"
            }
          ]
        },
      },
      dialogVisible: false,
      serverUrl: null,
      config: {
        onChange: (args) => {
          this.$refs.editor._data.state.editor.save()
            .then((data) => {
              this.article.editorContent = data
            })
            .catch(err => {
              console.log(err)
            })
        },
        tools: {
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile(file) {
                  const formData = new FormData();
                  formData.append('image', file)
                  return new Promise(function (resolve, reject) {
                    self.$store.dispatch('files/saveImage', formData)
                      .then(res => {
                        resolve(res)
                      })
                      .catch(e => {
                        reject(e)
                      })
                  })
                },
              }
            }
          },
          header: {
            class: Header,
            config: {
              placeholder: 'Введите заголовок',
              levels: [1, 2, 3, 4, 5],
              defaultLevel: 3,
            }
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true
              }
            },
          },
          marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Введите цитату',
              captionPlaceholder: 'Автор цитаты',
            },
          },
        }
      },
    }
  },
  methods: {
    parseArticleToUpdate(data) {
      const articleToUpdate = data
      this.article.mainImage = this.serverUrl + '/' + articleToUpdate.mainImageUrl
      this.article.authorRole = articleToUpdate.authorRole
      this.article.authorId = articleToUpdate.authorId
      this.article.title = articleToUpdate.title
      this.article.editorContent = articleToUpdate.blocks
    },
    saveArticle() {
      const articleData = {
        title: this.article.title,
        authorId: this.article.authorId,
        authorRole: this.article.authorRole,
        mainImageUrl: this.articleOnUpdate ? this.articleOnUpdate.mainImageUrl : '',
        blocks: this.article.editorContent
      }
      const formData = new FormData();
      formData.append('mainImage', this.article.mainImageFile)
      formData.append('data', JSON.stringify(articleData))
      if (this.articleOnUpdate) {
        this.$store.dispatch('article/updateArticle', {data: formData, id: this.articleOnUpdate.id})
          .then(() => {
            this.goToArticle(this.articleOnUpdate.id, 'Данные успешно обновлены!')
          })
      } else {
        this.$store.dispatch('article/saveArticle', formData)
          .then(res => {
            console.log('RESSSSS', res)
            this.goToArticle(res.id, 'Статья успешно опубликована!')
          })
      }
    },
    goToArticle(id, message) {
      this.$notify({
        title: 'Успех!',
        message: message,
        type: 'success',
        position: 'bottom-right'
      });
      this.$router.push({path: `/news/${id}`})
    },
    openConfirmDialog(message) {
      this.$refs["articleForm"].validate((valid) => {
        if (valid) {
          this.confirmMessage = message
          this.$refs.confirmModal.opened = true
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    openPreview() {
      this.$refs["articleForm"].validate((valid) => {
        if (valid) {
          this.dialogVisible = true
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.article.mainImage = URL.createObjectURL(file.raw);
    },
    handleChange(file, fileList) {
      this.article.mainImageFile = file.raw
    },
    save() {
      this.$refs.editor._data.state.editor.save()
        .then((data) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onInitialized(editor) {
      this.renderEditor(this.article.editorContent)
    },
    renderEditor(data) {
      const check = setInterval(() => {
        if (this.$refs.editor && this.$refs.editor._data.state.editor.configuration) {
          if (this.articleOnUpdate) {
            this.$refs.editor._data.state.editor.render(this.articleOnUpdate.blocks)
            clearInterval(check)
          } else {
            this.$refs.editor._data.state.editor.render(data)
            clearInterval(check)
          }
        }
      }, 100)
    }
  },
  computed: {
    ...mapState('auth', {
      user: state => state.user
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}

.article-editor {

  &__editor {
    color: #000;
  }

  &__controls {
    margin-top: 20px;
  }

  &__editor-container {
    padding: 20px;
    border-radius: 4px;
    background-color: #fff;
  }

  &__header {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 15px;
  }

  &__title {
    font-weight: normal;
    margin-bottom: 10px;
  }

  &__editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}

.title {
  margin: 0;
  padding: 0;
}

.el-dialog {
  margin-top: 5vh !important;
}


</style>
