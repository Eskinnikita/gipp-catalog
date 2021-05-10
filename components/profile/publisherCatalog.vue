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
  }
}
</script>

<style lang="scss" scoped>
  .publisher-catalog {
    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, 150px);
      grid-gap: 2rem;
      justify-content: space-between;
    }
  }

</style>
