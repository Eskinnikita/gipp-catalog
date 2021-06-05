<template>
  <div class="reg">
    <h2 class="title">Регистрация</h2>
    <el-radio-group class="reg__wide-radio" v-model="role" style="margin-bottom: 30px;">
      <el-radio-button label="1">Читатель</el-radio-button>
      <el-radio-button label="2">Представитель организации</el-radio-button>
      <el-radio-button label="3">Издатель</el-radio-button>
    </el-radio-group>
    <div class="reg__border-radio">
      <el-radio v-model="role" label="1" border>Читатель</el-radio>
      <el-radio v-model="role" label="2" border>Представитель организации</el-radio>
      <el-radio v-model="role" label="3" border>Издатель</el-radio>
    </div>
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

  &__wide-radio {
    display: block;
  }

  &__border-radio {
    display: none;
  }
}

@media (max-width: 575.98px) {
  .reg {
    &__wide-radio {
      display: none;
    }

    &__border-radio {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__form {
      padding: 0 15px;
      min-width: 100%;
    }

    &__form-container {
      width: 100%;
    }
  }

  .el-radio {
    margin: 0 0 15px 0;
  }
}
</style>
