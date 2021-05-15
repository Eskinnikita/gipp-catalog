<template>
  <div class="catalog-filter">
    <el-form class="demo-form-inline">
      <div class="input-label">
        Виды
      </div>
      <el-checkbox-group v-model="parameters.types" >
        <el-checkbox v-for="(type, index) in types" :label="type" :key="index">{{type}}</el-checkbox>
      </el-checkbox-group>
      <div class="input-label">
        Возраст
      </div>
      <el-checkbox-group v-model="parameters.age" >
        <el-checkbox v-for="(item, index) in age" :label="item" :key="index">{{item}}</el-checkbox>
      </el-checkbox-group>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parameters: {
        types: [],
        age: []
      },
      types: ['Журнал', 'Газета'],
      age: ['0+', '6+', '12+', '16+']
    }
  },

}
</script>

<style scoped>
.catalog-filter {
  min-width: 200px;
  background-color: #fff;
  margin-right: 20px;
  padding: 15px 20px 15px 20px;
}
</style>
