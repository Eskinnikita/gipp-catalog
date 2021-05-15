<template>
  <div class="cover-snippet" @click="goTo">
    <img class="cover-snippet__image"
         :src="coverUrl"
         alt="">
    <div class="cover-snippet__info">
      <h5 class="cover-snippet__title">{{ publication.title }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    publication: {
      type: Object,
      required: true
    },
    route: {
      type: String,
      required: false
    }
  },
  created() {
    this.imageUrl = process.env.serverUrl
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    goTo() {
      this.$router.push({path: `${this.route}/${this.publication.id}`})
    }
  },
  computed: {
    coverUrl() {
      if (this.publication.coverLink) {
        return this.imageUrl + '/' + this.publication.coverLink
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-snippet {
  cursor: pointer;
  transition: transform 0.3s;
  max-width: 150px;

  &__image {
    height: 200px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 3px;
    border-radius: 4px;
    background-color: #409EFF;
  }

  &__info {
    color: #409EFF;
  }

  &__title {
    font-size: 14px;
    font-weight: normal;
  }

  &:hover {
    transform: scale(1.03);
  }
}
</style>
