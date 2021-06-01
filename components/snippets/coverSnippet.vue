<template>
  <div class="cover-snippet">
    <div class="cover-snippet__header" v-if="isFav">
      <el-button
        @click="removeFavourite"
        type="text"
        class="cover-snippet__remove-button"
      >
        Убрать
      </el-button>
    </div>
    <div class="cover-snippet__cover" @click="goTo">
      <img class="cover-snippet__image"
           :src="coverUrl"
           alt="">
      <div class="cover-snippet__info">
        <h5 class="cover-snippet__title">{{ publication.title }}</h5>
      </div>
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
    },
    isFav: {
      type: Boolean,
      default: false
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
    },
    removeFavourite() {
      this.$store.dispatch('publication/addToFavourite', {
        userId: this.user.id,
        userRole: this.user.role,
        publicationId: this.publication.id,
        isFavPage: true
      })
    }
  },
  computed: {
    coverUrl() {
      if (this.publication.coverLink) {
        return this.imageUrl + '/' + this.publication.coverLink
      }
    },
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-snippet {
  max-width: 150px;

  &__cover {
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.03);
    }
  }

  &__image {
    height: 200px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 3px;
    border-radius: 4px;
    background-color: #409EFF;
  }

  &__info {
    //color: #409EFF;
    color: #303133;
  }

  &__title {
    font-size: 14px;
    font-weight: normal;
  }
}
</style>
