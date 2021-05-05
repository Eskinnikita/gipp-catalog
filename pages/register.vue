<template>
  <div class="reg">
    <el-radio-group v-model="role" style="margin-bottom: 30px;">
      <el-radio-button label="1">Читатель</el-radio-button>
      <el-radio-button label="2">Представитель организации</el-radio-button>
      <el-radio-button label="3">Издатель</el-radio-button>
    </el-radio-group>
    <div class="reg__form-container">
      <!-- USER FORM -->
      <reader-form v-if="+role === 1"/>
      <!-- COMPANY FORM -->
      <el-form class="reg__form" v-if="+role === 2" ref="form" :model="form">
        <el-form-item label="Наименование организации">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Почта">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Телефон">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="Адрес">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Оставить заявку</el-button>
        </el-form-item>
      </el-form>
      <!-- PUBLISHER FORM -->
      <el-form class="reg__form" v-if="+role === 3" ref="form" :model="form">
        <el-form-item label="Название издательства">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Почта">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Телефон">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="Адрес">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Оставить заявку</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import readerForm from "@/components/regForms/readerForm"
export default {
  components: {
    readerForm
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
  watch: {

  }
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
