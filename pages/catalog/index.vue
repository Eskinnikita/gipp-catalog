<template>
  <div class="catalog">
    <div class="catalog__filters">
      <catalog-filter/>
    </div>
    <div
      class="catalog__publications-container"
      :style="{'justify-content': publications.length > 3 ? 'space-between' : 'flex-start'}"
    >
      <cover-snippet
        v-for="(publication, index) in publications "
        :key="index"
        :publication="publication"
        route="/publication"
      />
    </div>
  </div>
</template>

<script>
import coverSnippet from "@/components/snippets/coverSnippet"
import catalogFilter from "@/components/filters/catalogFilter"

export default {
  layout: 'transparent',
  components: {
    coverSnippet,
    catalogFilter
  },
  created() {
    this.$store.dispatch('publication/getAllPublications')
  },
  computed: {
    publications() {
      return this.$store.state.publication.publications
    }
  }
}
</script>

<style lang="scss" scoped>

.catalog {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 100vh;

  &__publications-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-gap: 2rem;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 4px;
    padding: 30px 30px;
    min-height: 100vh;
  }
}

</style>
