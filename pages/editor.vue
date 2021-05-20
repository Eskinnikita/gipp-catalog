<template>
  <div class="article-editor">
    <h2 class="title">Редактор статьи</h2>
    <el-form
      ref="newsEditor"
    >
      <el-form-item label="Заголовок статьи" prop="name">
        <el-input v-model="news.title"></el-input>
      </el-form-item>
      <p class="article-editor__author">
        Автор: {{ user.name }}
      </p>
      <div class="article-editor__editor-container">
        <client-only>
          <editor
            holder="article-editor"
            ref="editor"
            :config="config"
            @change="onChange"
            @save="save"/>
        </client-only>
      </div>
      <div class="article-editor__controls">
        <el-button type="primary" @click="save">Посмотреть</el-button>
        <el-button type="primary" @click="save">Опубликовать</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
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
  components: {},
  created() {
    this.serverUrl = process.env.serverUrl
    console.log(this.serverUrl)
  },
  mounted() {

  },
  data() {
    const self = this;
    return {
      serverUrl: null,
      news: {
        title: ''
      },
      config: {
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
    onChange(args) {
      console.log(args)
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
    saveImage(file) {

    }
  },
  computed: {
    ...
      mapState('auth', {
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
  &__author {
    margin-bottom: 20px;
  }

  &__editor {
    color: #000;
  }

  &__controls {
    margin-top: 20px;
  }

  &__editor-container {
    padding: 20px;
    border-radius: 4px;
    border: 1px solid #8c939d;
  }
}


</style>
