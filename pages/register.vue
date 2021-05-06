<template>
  <div class="reg">
    <h2 class="title">Регистрация</h2>
    <el-radio-group v-model="role" style="margin-bottom: 30px;">
      <el-radio-button label="1">Читатель</el-radio-button>
      <el-radio-button label="2">Представитель организации</el-radio-button>
      <el-radio-button label="3">Издатель</el-radio-button>
    </el-radio-group>
    <div class="reg__form-container">
      <!-- USER FORM -->
      <reader-form v-if="+role === 1"/>
      <!-- COMPANY FORM -->
      <comp-form v-if="+role === 2"/>
      <!-- PUBLISHER FORM -->
      <pub-form v-if="+role === 3"/>
    </div>
  </div>
</template>

<script>
import readerForm from "@/components/regForms/readerForm"
import compForm from "@/components/regForms/compForm"
import pubForm from "@/components/regForms/pubForm"

export default {
  components: {
    readerForm,
    compForm,
    pubForm
  },
  data() {
    return {
      form: {},
      role: 1
    }
  },
  methods: {
    regNewUser() {
      console.log(this.form)
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.reg {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__form {
    min-width: 500px;
  }

  &__controls {
    margin-top: 20px !important;
  }
}
</style>
