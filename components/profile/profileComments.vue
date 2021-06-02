<template>
  <div class="profile-news">
    <template v-if="comments.length">
      <comment-snippet
        class="profile-news__review"
        v-for="(item, index) in comments"
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
import commentSnippet from "@/components/news/commentSnippet"
export default {
  components: {
    commentSnippet
  },
  props: {
    comments: {
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
