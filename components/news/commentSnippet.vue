<template>
  <div v-if="commentInfo && commentInfo.author" class="comment-snippet">
    <div class="comment-snippet__content-container">
      <div class="comment-snippet__avatar">
        <el-avatar
          v-if="avatarUrl"
          size="large"
          fit="cover"
          :src="avatarUrl"
          alt="Аватар пользователя"
        ></el-avatar>
        <el-avatar v-else size="large" icon="el-icon-user-solid"></el-avatar>
      </div>
      <div class="comment-snippet__info">
        <h4 class="comment-snippet__name">{{ commentInfo.author.name }}</h4>
        <p class="comment-snippet__text">{{ commentInfo.text }}
        </p>
        <span class="comment-snippet__time"> {{ $moment(commentInfo.updatedAt).fromNow(true) }} назад</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commentInfo: {
      type: Object,
      required: true
    }
  },
  created() {
    this.serverUrl = process.env.serverUrl
  },
  data() {
    return {
      serverUrl: ''
    }
  },
  methods: {},
  computed: {
    avatarUrl() {
      if (this.commentInfo && this.commentInfo.author) {
        if (this.commentInfo.author.role === 4 || !this.commentInfo.author.logoUrl) {
          return false
        } else {
          return this.serverUrl + '/' + this.commentInfo.author.logoUrl
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-snippet {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__content-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  &__name {
    font-weight: normal;
    margin-bottom: 5px;
  }

  &__info {
    border-bottom: 1px solid #E4E7ED;
    padding-bottom: 10px;
    padding-left: 15px;
    width: 100%;
  }

  &__text {
    margin-bottom: 5px;
    font-size: 14px;
  }

  &__time {
    font-size: 14px;
  }

  &__avatar {
    width: 40px;
  }

  &__controls {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
