<template>
  <nuxt-link class="rec-publication" :to="`/publication/${recPub.id}`">
    <img class="rec-publication__cover" :src="coverUrl" :alt="recPub.title">
    <div class="rec-publication__info info">
      <div class="info__item info__item_title">{{ recPub.title }}</div>
      <div class="info__item">{{ recPub.count }} в {{ recPub.period }}</div>
      <div class="info__item">{{ recPub.age }}</div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    recPub: {
      type: Object,
      required: true
    }
  },
  created() {
    this.serverUrl = process.env.serverUrl
  },
  data() {
    return {}
  },
  computed: {
    coverUrl() {
      return this.serverUrl + '/' + this.recPub.coverLink
    }
  }
}
</script>

<style lang="scss" scoped>
.rec-publication {
  width: 30%;
  min-width: 200px;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
  height: 100px;
  margin-right: 20px;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.03);
  }

  &:last-child {
    margin-right: 0;
  }

  &__cover {
    height: 100%;
  }
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 10px 10px 15px;

  &__info-item {
    color: #606266;

    &_title {
      font-size: 14px;
    }
  }
}
</style>
