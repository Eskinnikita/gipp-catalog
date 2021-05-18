<template>
  <div class="profile-page" v-if="pageReady">
    <review-modal ref="reviewModal"/>
    <div class="profile-page__left left">
      <div class="profile-page__image-container left__item">
        <img
          v-if="publication && publication.coverLink"
          :src="coverUrl"
          class="profile-page__image" alt="profile image"/>
      </div>
      <div class="profile-page__image-placeholder left__item"
           v-if="publication && !publication.coverLink && publication.coverLink !== undefined">
      </div>
      <div class="profile-page__controls left__item">
        <a :href="publication.subsLink" target="_blank">
          <el-button type="primary">Подписаться</el-button>
        </a>
        <el-button type="primary" plain icon="el-icon-share"></el-button>
      </div>
      <div class="left__item" v-if="isUserAdmin">
        <nuxt-link :to="`${publicationId}/edit`">
          <el-button style="width: 100%" type="primary">Редактировать</el-button>
        </nuxt-link>
      </div>
      <info-block v-if="info.length" :info-items="info"/>
    </div>
    <div class="profile-page__right left__item">
      <h2 class="profile-page__title">{{ publication.title }}</h2>
      <nuxt-link :to="`/publisher/${publication.publisher.id}`">
        <el-button class="profile-page__publisher-name" type="text">{{ publication.publisher.name }}</el-button>
      </nuxt-link>
      <div class="profile-page__content">
        <p class="profile-page__desc" v-if="publication.desc">
          {{ publication.desc }}
        </p>
        <div class="profile-page__tags-container" v-if="publication.publisher.tags && publication.publisher.tags.length">
<!--          <el-tag :type="randomType()" v-for="item in publication.publisher.Publications" :key="item">{{ item.title }}</el-tag>-->
        </div>
        <div class="profile-page__recommends recommends" v-if="publication.publisher.Publications.length">
          <h4 class="profile-page__subtitle">Еще от <b>{{publication.publisher.name}}</b></h4>
          <div class="recommends__container" :style="{ 'justify-content': publication.publisher.Publications.length === 2 ? 'flex-start' : 'space-between'}">
            <rec-publications v-for="(recPub, index) in publication.publisher.Publications" :rec-pub="recPub" :key="index"/>
          </div>
        </div>
        <div class="profile-page__reviews reviews">
          <div class="reviews__header">
            <h4 class="profile-page__subtitle">Отзывы</h4>
            <el-button v-if="!couldReview" type="primary" @click="$refs.reviewModal.openModal()">Оставить отзыв</el-button>
          </div>
          <div class="reviews__container">
            <comment-snippet class="profile-page__comment" v-for="(item, index) in 4" :key="index"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoBlock from "@/components/profile/infoBlock"
import recPublications from "@/components/profile/snippets/recPublications"
import commentSnippet from "@/components/snippets/commentSnippet"
import reviewModal from "@/components/modals/reviewModal"
export default {
  layout: 'transparent',
  components: {
    infoBlock,
    recPublications,
    commentSnippet,
    reviewModal
  },
  created() {
    this.serverUrl = process.env.serverUrl
    this.publicationId = +this.$route.params.id
    this.$store.dispatch('publication/getPublication', this.publicationId).then(() => {
      this.pageReady = true
    })
  },
  data() {
    return {
      pageReady: false,
      serverUrl: null,
      publicationId: null,
      activeTab: '1'
    }
  },
  methods: {
    randomType() {
      const types = ["success", "info", "warning", "danger"]
      return types[Math.floor(Math.random() * types.length)]
    }
  },
  computed: {
    info() {
      return [
        {
          label: 'Вид',
          value: this.publication.type
        },
        {
          label: 'Возрастной рейтинг',
          value: this.publication.age
        },
        {
          label: 'Периодичность',
          value: `${this.publication.count} в ${this.publication.period}`
        },
        {
          label: 'Средний вес выпуска',
          value: this.publication.weight + 'г.'
        },
        {
          label: 'Количество полос',
          value: this.publication.strips
        },
        {
          label: 'Подписной индекс',
          value: this.publication.subindex
        },
      ]
    },
    coverUrl() {
      return this.serverUrl + '/' + this.publication.coverLink
    },
    publication() {
      return this.$store.state.publication.publication
    },
    user() {
      return this.$store.state.auth.user
    },
    isUserAdmin() {
      if (this.user) {
        return (this.publication.publisherId === this.user.id && (+this.user.role === 3)) || +this.user.role === 4
      } else {
        return false
      }
    },
    couldReview() {
      if (this.user) {
        return (this.publication.publisherId === this.user.id && (+this.user.role === 3))
      } else {
        return false
      }
    }
  },
  beforeDestroy() {
    this.$store.commit('publication/SET_EMPTY_PUBLICATION')
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 100vh;

  &__subtitle {
    font-weight: normal;
    margin-bottom: 15px;
  }

  &__left {
    max-width: 190px;
    margin-right: 30px;
  }

  &__right {
    width: 100%;
  }

  &__image {
    width: 100%;
    object-fit: contain;
  }

  &__info {
    background-color: #fff;
    height: 200px;
  }

  &__comment {
    margin-bottom: 20px;
    max-width: 70%;
  }

  &__controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    min-height: 100vh;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px 20px 40px;
    color: #606266;
  }

  &__title {
  }

  &__desc {
    max-width: 650px;
    margin-bottom: 30px;
    font-size: 14px;
  }

  &__tab-content {
    margin-top: 20px;
  }

  &__tab-title-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__publisher-name {
    //color: #606266;
    font-size: 16px;
    font-weight: normal;
  }

  &__image-placeholder {
    width: 100%;
    height: 200px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("../../../assets/logo.svg");
      filter: opacity(40%);
    }
  }

  &__image-container {
    padding: 5px;
    background-color: #fff;
  }

  &__tags-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;
  }
}

.left {
  &__item {
    margin-bottom: 15px;
    border-radius: 4px;
  }
}

.recommends {
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
  }
}

.el-tag {
  margin-right: 10px;
}

.reviews {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__container {

  }
}

</style>
