<template>
  <el-dialog
    :title="title"
    :visible.sync="opened"
    width="30%">
    <span><slot/></span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="opened = false">Отменить</el-button>
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
    },
    title: {
      type: String,
      required: false
    },
  },
  data() {
    return {
      opened: false
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
