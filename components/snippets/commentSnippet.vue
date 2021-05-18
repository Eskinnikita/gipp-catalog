<template>
  <div v-if="commentInfo && commentInfo.approved === approved" class="comment-snippet">
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
        <nuxt-link v-if="showControls" :to="`/publication/${commentInfo.Publication.id}`">
          <el-button type="text"  class="comment-snippet__name">Отзыв к «{{commentInfo.Publication.title}}»</el-button>
        </nuxt-link>
        <h4 class="comment-snippet__name">{{commentInfo.author.name}}</h4>
        <p class="comment-snippet__text">{{commentInfo.text}}
        </p>
        <span class="comment-snippet__time">27 минут назад</span>
      </div>
    </div>
    <div v-if="showControls" class="comment-snippet__controls">
      <el-button plain type="success" @click="openConfirmModal">Опубликовать</el-button>
      <el-button plain type="danger" @click="openDenyModal">Отклонить</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commentInfo: {
      type: Object,
      required: true
    },
    showControls: {
      type: Boolean,
      required: true
    },
    approved: {
      type: Boolean,
      required: true
    }
  },
  created() {
    this.serverUrl = process.env.serverUrl
    console.log(this.commentInfo)
  },
  data() {
    return {
      serverUrl: ''
    }
  },
  methods: {
    openConfirmModal(){
      const modalData = this.commentInfo
      modalData.modalId = 2
      modalData.message = 'Принять заявку?'
      this.$emit('openConfirmDialog', modalData)
    },
    openDenyModal(){
      const modalData = this.commentInfo
      modalData.modalId = 2
      modalData.message = 'Отклонить заявку?'
      this.commentInfo.modalId = 2
      this.$emit('openDenyDialog', modalData)
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
