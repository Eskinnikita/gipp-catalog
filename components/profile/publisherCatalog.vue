<template>
  <div class="publisher-catalog">
    <div class="publisher-catalog__grid">
      <template v-if="publications.length">
        <cover-snippet
          v-for="(publication, index) in publications"
          :publication="publication"
          :route="'/publication'"
          :key="index"
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
  components: {
    coverSnippet
  },
  props: {
    publications: {
      type: Array,
      required: true
    }
  },
  beforeDestroy() {
    this.$store.commit('profile/SET_EMPTY_TAB_CONTENT')
  }
}
</script>

<style lang="scss" scoped>
.publisher-catalog {
  &__grid {
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-gap: 2rem;
    justify-content: space-between;
  }
}

@media (max-width: 575.98px) {
  .publisher-catalog {
    &__grid {
      grid-gap: 1.5rem;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
  }

  @media (min-width: 576px) and (max-width: 815px) {
    .publisher-catalog {
      &__grid {
        grid-gap: 1.5rem;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      }
    }
  }
}


</style>
