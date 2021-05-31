<template>
  <div>
    Любимое
  </div>
</template>

<script>
export default {
  beforeResolve (to, from, next) {
    if (this.$store.getters["auth/isAuthenticated"]) {
      next('/')
    } else {
      next();
    }
  }
}
</script>

<style scoped>

</style>
