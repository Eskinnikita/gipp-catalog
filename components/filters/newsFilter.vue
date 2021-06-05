<template>
  <div class="filter">
    <el-form class="demo-form-inline">
      <div class="filter__block">
        <div class="filter__input-label">
          Автор
        </div>
        <el-checkbox-group v-model="parameters.types" >
          <el-checkbox v-for="(type, index) in types" :label="type" :key="index">{{type}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button class="filter__reset" @click="resetFilters" type="text">Сбросить</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parameters: {
        types: [],
      },
      types: ['Издательство', 'Организация'],
    }
  },
  methods: {
    resetFilters() {
      this.parameters = {
        types: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  min-width: 200px;
  background-color: #fff;
  margin-right: 20px;
  padding: 15px 20px 15px 20px;

  &__input-label {
    margin-bottom: 5px;
  }

  &__block {
    margin-bottom: 20px;
  }

  .el-checkbox-group {
    display: flex;
    flex-direction: column;
  }
}
</style>
