<template>
  <el-form
    class="reg__form"
    ref="userForm"
    :model="form"
    :rules="rules"
  >
    <template v-if="!isThankYou">
      <el-form-item label="Наименование организации" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Почта" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Телефон" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="Адрес" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <div class="reg__error">
        {{ error }}
      </div>
      <el-form-item>
        <el-button type="primary" @click="sendRequest">Оставить заявку</el-button>
      </el-form-item>
    </template>
    <template v-else>
      <thank-you/>
    </template>
  </el-form>
</template>

<script>
import thankYou from "@/components/regForms/thankYou"

export default {
  components: {
    thankYou
  },
  data() {
    return {
      error: null,
      isThankYou: false,
      form: {
        name: '',
        email: '',
        address: '',
        phone: '',
        role: 2,
        approved: false
      },
      rules: {
        name: [
          {required: true, message: 'Пожалуйста, введите название', trigger: 'blur'},
          {min: 4, message: 'Длина должна быть не менее 1 символа!', trigger: 'blur'}
        ],
        email: [
          {required: true, message: 'Пожалуйста, введите вашу почту', trigger: 'blur'},
          {type: 'email', message: 'Пожалуйста, проверьте введенную почту', trigger: ['blur', 'change']}
        ],
        address: [
          {required: true, message: 'Пожалуйста, введите адрес', trigger: 'blur'},
          {min: 1, message: 'Длина должна быть не менее 1 символа!', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: 'Пожалуйста, введите телефон', trigger: 'blur'},
          {min: 1, message: 'Длина должна быть не менее 1 символа!', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    sendRequest() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.$store.dispatch('auth/makeRequest', this.form)
            .then(() => {
              this.isThankYou = true
            })
            .catch(e => {
              if (e) {
                this.error = 'Профиль с указанной почтой уже существует!'
              }
            })
        } else {
          console.log(this.form)
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  filters: {}
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
