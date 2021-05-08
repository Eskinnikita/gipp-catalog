<template>
  <el-dialog
    title="Tips"
    :visible.sync="dialogVisible"
    width="30%">
    <span><slot/></span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Отменить</el-button>
    <el-button type="primary" @click="onConfirm">Подтвердить</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    onConfirm: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
