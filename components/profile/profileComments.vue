<template>
  <div class="profile-news">
    <template v-if="reviews.length">
      <comment-snippet
        class="profile-news__review"
        :show-controls="false"
        :approved="true"
        v-for="(item, index) in reviews"
        :comment-info="item"
        :key="index"
      />
    </template>
    <template v-else>
      Список пуст
    </template>
  </div>
</template>

<script>
import commentSnippet from "@/components/snippets/commentSnippet"
export default {
  components: {
    commentSnippet
  },
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-news {
  &__review {
    margin-bottom: 30px;
  }
}
</style>
