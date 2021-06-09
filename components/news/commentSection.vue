<template>
  <div class="article__comments">
    <el-form ref="commentForm" :rules="rules" :model="comment">
      <el-form-item label="Ваш комментарий" prop="text">
        <el-input class="article__comment-textarea" type="textarea" v-model="comment.text"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="sendComment">Отправить</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    commentInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comment: {
        text: ''
      },
      rules: {
        text: [
          {required: true, message: 'Пожалуйста, введите текст комментария', trigger: 'blur'},
          {min: 10, message: 'Комментарий должен быть не менее 10 символов!', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    sendComment() {
      this.$refs["commentForm"].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.commentInfo))
          data.text = this.comment.text
          this.$store.dispatch('article/sendComment', data)
          this.$notify({
            title: 'Спасибо!',
            message: 'Благодарим за оставленный комментарий!',
            type: 'success',
            position: 'bottom-right'
          });
          this.comment.text = ''
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
