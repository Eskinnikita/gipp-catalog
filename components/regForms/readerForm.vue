<template>
  <el-form
    class="reg__form"
    ref="userForm"
    :model="form"
    :rules="rules"
    autocomplete="off"
  >
    <el-form-item label="Почта" prop="email">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Пароль" prop="password">
      <el-input type="password" :show-password="true" v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Повторите пароль" prop="checkPassword">
      <el-input type="password" v-model="form.checkPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Как к вам обращаться?" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <div class="reg__error">
      {{error}}
    </div>
    <el-form-item class="reg__controls">
      <el-button type="primary" @click="sendNewUser">Зарегистрироваться</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Пожалуйста, введите пароль'));
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.userForm.validateField('checkPassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Пожалуйста, повторите пароль'));
      } else if (value !== this.form.password) {
        callback(new Error('Пароли не совпадают!'));
      } else {
        callback();
      }
    };
    return {
      error: null,
      form: {
        name: '',
        email: '',
        password: '',
        checkPassword: '',
        role: 1,
      },
      rules: {
        password: [
          {required: true, validator: validatePass, trigger: 'blur'},
          {min: 8, message: 'Пароль должен быть не менее 8 символов!', trigger: 'blur'}
        ],
        checkPassword: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ],
        email: [
          {required: true, message: 'Пожалуйста, введите вашу почту', trigger: 'blur'},
          {type: 'email', message: 'Пожалуйста, проверьте введенную почту', trigger: ['blur', 'change']}
        ],
        name: [
          {required: true, message: 'Пожалуйста, введите имя', trigger: 'blur'},
          {min: 1, message: 'Длина должна быть не менее 1 символа!', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    sendNewUser() {
      this.error = null
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.$store.dispatch('auth/createUser', this.form)
            .then(() => {
              this.$router.push({path: "/"});
            })
            .catch(e => {
              if (e) {
                this.error = 'Профиль с указанной почтой уже существует!'
              }
            })
        } else {
          return false;
        }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
  .reg {
    &__error {
      color: #F56C6C;
      margin-bottom: 20px;
    }
  }
</style>
