<template>
  <div v-if="commentInfo" class="comment-snippet">
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
      <h4 class="comment-snippet__name">{{commentInfo.author.name}}</h4>
      <p class="comment-snippet__text">{{commentInfo.text}}
      </p>
      <span class="comment-snippet__time">27 минут назад</span>
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
  computed: {
    avatarUrl() {
      let photo
      const role = this.commentInfo.reviewerRole
      if(role === 1 || role === 4) {
        return false
      } else if(role === 2 || role === 3) {
        photo = this.commentInfo.author.logoUrl
      }
      if(photo === null) {
        return false
      } else {
        return this.serverUrl + '/' + photo
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.comment-snippet {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;

  :last-child {
    margin-bottom: 10px;
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
}
</style>
