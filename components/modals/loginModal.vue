<template>
  <el-dialog
    class="login-modal"
    title="Авторизация"
    :visible.sync="dialogFormVisible"
    :modalAppendToBody="false"
    :center="true"
    width="430px"
  >
    <el-form :model="form" ref="loginModal" :rules="rules">
      <el-form-item label="Почта" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <div class="login-modal__error-container" v-if="error">
      {{ error }}
    </div>
    Нет аккаунта?
    <nuxt-link :to="'/register'">
      <el-button type="text" class="reg-btn" style="color: #1e88e5 !important;">Зарегистрироваться</el-button>
    </nuxt-link>
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
      form: {},
      error: null,
      rules: {
        email: [
          {required: true, message: 'Пожалуйста, введите почту!', trigger: 'blur'},
          {type: 'email', message: 'Пожалуйста, введите корректную почту!', trigger: ['blur', 'change']}
        ],
        password: [
          {required: true, message: 'Пожалуйста, введите пароль!', trigger: 'blur'},
          {min: 8, message: 'Пароль должен быть не менее 8 символов!', trigger: 'blur'}
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
    login() {
      this.$refs["loginModal"].validate((valid) => {
        if (valid) {
          this.error = null
          this.$store.dispatch('auth/loginUser', this.form)
            .then(() => {
              this.closeModal()
              this.$router.push({path: '/'})
            })
            .catch(e => {
              if (e) {
                this.error = 'Неправильная почта или пароль!'
              }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.reg-btn span {

}

.login-modal {
  &__error-container {
    color: #F56C6C;
    margin-bottom: 10px;
  }
}
</style>
