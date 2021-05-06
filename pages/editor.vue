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
        Автор: {{user.name}}
      </p>
      <no-ssr>
        <quill-editor
          class="article-editor__editor"
          v-model='news.content'
          ref='textEditor'
          :options='editorOption'
        ></quill-editor>
      </no-ssr>
      <div class="article-editor__controls">
        <el-button @click="log" type="primary">Опубликовать</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components: {
  },
  created() {

  },
  data() {
    return {
      news: {
        title: '',
        content: ''
      },
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', { list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video']
          ]
        }
      }
    }
  },
  methods: {
    log() {
      console.log(this.news.text)
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
    &__author {
      margin-bottom: 20px;
    }

    &__editor {
      color: #000;
    }

    &__controls {
      margin-top: 20px;
    }
  }
</style>
