<template>
  <div class="cabinet-tab">
    <template v-if="items.length">
      <article-snippet
        class="snippet-list__article-block"
        v-for="(item, index) in items"
        :key="index"
        :article="item"
        :show-author="true"
        :is-admin-page="true"
      />
    </template>
  </div>
</template>

<script>
import articleSnippet from "@/components/news/articleSnippet"
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    articleSnippet
  }
}
</script>

<style scoped>

</style>
