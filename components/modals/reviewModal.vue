<template>
  <el-dialog
    title="Ваш отзыв об издании"
    :visible.sync="dialogFormVisible"
    :modalAppendToBody="false"
    :center="true"
    width="430px"
  >
    <el-form :model="form" :rules="rules" ref="reviewForm">
      <el-form-item label="Ваша оценка"> <br/>
        <stars-ratings v-model="form.rating"/>
      </el-form-item>
      <el-form-item label="Ваши впечатления" prop="text">
        <el-input type="textarea" v-model="form.text"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeModal">Отменить</el-button>
      <el-button type="primary" @click="sendReview">Отправить отзыв</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        rating: 5
      },
      rules: {
        text: [
          {required: true, message: 'Пожалуйста, введите текст', trigger: 'blur'}
        ]
      },
    };
  },
  methods: {
    openModal() {
      this.dialogFormVisible = true;
    },
    closeModal() {
      this.form = {};
      this.dialogFormVisible = false;
    },
    sendReview() {
      this.form.reviewerId = this.$store.state.auth.user.id
      this.form.reviewerRole = this.$store.state.auth.user.role
      this.form.approved = false
      this.$refs["reviewForm"].validate((valid) => {
        if (valid) {
          console.log(this.form)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
