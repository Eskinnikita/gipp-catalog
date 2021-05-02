<template>
  <el-dialog
    title="Авторизация"
    :visible.sync="dialogFormVisible"
    :modalAppendToBody="false"
    :center="true"
    width="430px"
  >
    <el-form :model="form">
      <el-form-item label="Почта">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Пароль">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeModal">Отменить</el-button>
      <el-button type="primary" @click="login">Войти</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {}
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
    login() {
        console.log(this.form)
    }
  }
};
</script>

<style lang="scss" scoped></style>
