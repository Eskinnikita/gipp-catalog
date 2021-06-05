<template>
  <div class="favourites">
    <div class="favourites__header">
      <h3 class="favourites__title">Избранное</h3>
    </div>
    <div
      class="favourites__publications-container"
    >
      <template v-if="favourites.publications && favourites.publications.length">
        <cover-snippet
          v-for="(publication, index) in favourites.publications"
          :key="index"
          :publication="publication"
          :is-fav="true"
          route="/publication"
        />
      </template>
      <template v-else>
        Список пуст
      </template>
    </div>
  </div>
</template>

<script>
import coverSnippet from "@/components/snippets/coverSnippet"

export default {
  middleware: "isAuth",
  components: {
    coverSnippet
  },
  created() {
    this.$store.dispatch('publication/getFavourites', {
      id: this.user.id,
      role: this.user.role
    })
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    favourites() {
      return this.$store.state.publication.favouritePublications
    }
  }
}
</script>

<style lang="scss" scoped>
.favourites {
  &__publications-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-gap: 2rem;
    justify-content: space-between;
    margin-bottom: 20px;
    min-height: calc(100vh - 240px);
    height: auto;
    padding: 0 30px;
  }

  &__title {
    font-weight: normal;
  }

  &__header {
    padding: 20px 30px;
  }
}

@media (max-width: 575.98px) {
  .favourites {
    &__publications-container {
      grid-template-columns: repeat(auto-fill, 125px);
    }
  }
}
</style>
