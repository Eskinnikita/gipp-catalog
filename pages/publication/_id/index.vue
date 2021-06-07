<template>
  <div class="profile-page" v-if="pageReady">
    <review-modal ref="reviewModal"/>
    <login-modal ref="loginModal"/>
    <confirm-dialog ref="confirmModal" :on-confirm="deletePublication" title="Подтверждение">
      Вы уверены, что хотите удалить издание?
    </confirm-dialog>
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
      <div class="profile-page__controls controls">
        <!--        <div v-if="isUserAdmin" class="profile-page__admin-controls left__item">-->
        <!--          <nuxt-link :to="`${publication.id}/edit`">-->
        <!--            <el-button class="accent-element left__item" style="width: 100%" type="primary">Редактировать</el-button>-->
        <!--          </nuxt-link>-->
        <!--          <el-button @click="$refs.confirmModal.opened = true" class="accent-element" style="width: 100%"-->
        <!--                     type="primary">Удалить-->
        <!--          </el-button>-->
        <!--        </div>-->
        <a class="left__item" :href="publication.subsLink" target="_blank">
          <el-button class="accent-element" style="width: 100%" type="primary">Подписаться</el-button>
        </a>
        <div class="controls__bottom left__item">
          <social-sharing class="controls__row-button" :meta-info="socialInfo"/>
          <favourite-button class="controls__row-button" :is-fav="publication.favourite"
                            @click.native="addToFavourite"/>
        </div>
      </div>
      <info-block class="profile-page__info-block" v-if="info.length" :info-items="info"/>
    </div>
    <div class="profile-page__right left__item">
      <!--      <h2 class="profile-page__title">{{ publication.title }}</h2>-->
      <!--      <nuxt-link :to="`/publisher/${publication.publisher.id}`">-->
      <!--        <el-button class="profile-page__publisher-name" type="text">{{ publication.publisher.name }}</el-button>-->
      <!--      </nuxt-link>-->
      <div class="profile-page__right-header">
        <div class="right-header__info">
          <h2 class="profile-page__title">{{ publication.title }}</h2>
          <nuxt-link :to="`/publisher/${publication.publisher.id}`">
            <el-button class="profile-page__publisher-name" type="text">{{ publication.publisher.name }}</el-button>
          </nuxt-link>
        </div>
        <div class="right-header__controls" v-if="isUserAdmin">
          <nuxt-link class="right-header__edit" :to="`${publication.id}/edit`">
            <el-button class="accent-element" type="primary" icon="el-icon-edit" ></el-button>
          </nuxt-link>
          <el-button @click="$refs.confirmModal.opened = true"
                     class="accent-element"
                     icon="el-icon-delete"
                     type="primary">
          </el-button>
        </div>
      </div>
      <div class="profile-page__content">
        <p class="profile-page__desc" v-if="publication.desc">
          {{ publication.desc }}
        </p>
        <info-block class="profile-page__info-block_adaptive" v-if="info.length" :info-items="info"/>
        <div class="profile-page__tags-container">
          <el-tag v-if="publication.tags.length" class="profile-page__tag" :type="randomType()"
                  v-for="(item, index) in publication.tags" :key="index">{{
              item.PubTag.tag
            }}
          </el-tag>
        </div>
        <div class="profile-page__recommends recommends" v-if="publication.publisher.Publications.length">
          <h4 class="profile-page__subtitle">Еще от <b>{{ publication.publisher.name }}</b></h4>
          <div class="recommends__container"
               :style="{ 'justify-content': publication.publisher.Publications.length === 2 ? 'flex-start' : 'space-between'}">
            <rec-publications
              v-if="index < 3"
              v-for="(recPub, index) in publication.publisher.Publications"
              :rec-pub="recPub"
              :key="index"
            />
          </div>
        </div>
        <el-divider></el-divider>
        <div class="profile-page__reviews reviews">
          <div class="reviews__header">
            <h4 class="profile-page__subtitle">Отзывы</h4>
            <el-button v-if="!couldReview" class="accent-element" type="primary" @click="openReviewModal">
              Оставить отзыв
            </el-button>
          </div>
          <div class="reviews__container">
            <template v-if="publication.Reviews.length">
              <review-snippet
                :approved="true"
                class="profile-page__comment"
                v-for="(item, index) in publication.Reviews"
                :comment-info="item"
                :show-controls="false"
                :key="index"/>
            </template>
            <div v-if="!approvedReviews.length">
              Никто еще не оставил отзыв. Станьте первым!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoBlock from "@/components/profile/infoBlock"
import recPublications from "@/components/profile/snippets/recPublications"
import reviewSnippet from "@/components/snippets/reviewSnippet"
import reviewModal from "@/components/modals/reviewModal"
import socialSharing from "@/components/social/socialSharing"
import favouriteButton from "@/components/profile/favouriteButton"
import loginModal from "@/components/modals/loginModal"
import confirmDialog from "@/components/modals/confirmDialog"

export default {
  layout: 'transparent',
  components: {
    infoBlock,
    recPublications,
    reviewSnippet,
    reviewModal,
    socialSharing,
    favouriteButton,
    loginModal,
    confirmDialog
  },
  created() {
    this.serverUrl = process.env.serverUrl
    this.publicationId = +this.$route.params.id
    this.$store.dispatch('publication/getPublication', {
      publicationId: this.publicationId,
      userId: this.user ? this.user.id : null
    }).then(() => {
      let root = document.documentElement;
      root.style.setProperty('--main-color', this.publication.publisher.PublisherConfig.mainColor, 'important');
      root.style.setProperty('--accent-color', this.publication.publisher.PublisherConfig.accentColor, 'important');
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
    deletePublication() {
      this.$store.dispatch('publication/deletePublication', this.publication.id)
        .then(() => {
          this.$router.push({path: `/publisher/${this.user.id}`, query: {tab: 'catalog', page: '1'}});
        })
    },
    addToFavourite() {
      if (this.user) {
        this.$store.dispatch('publication/addToFavourite', {
          userId: this.user.id,
          userRole: this.user.role,
          publicationId: this.publication.id,
          isFavPage: false
        })
      } else {
        this.$refs.loginModal.openModal()
      }
    },
    randomType() {
      const types = ["success", "info", "warning", "danger"]
      return types[Math.floor(Math.random() * types.length)]
    },
    openReviewModal() {
      if (this.user) {
        this.$refs.reviewModal.openModal()
      } else {
        this.$refs.loginModal.openModal()
      }
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
    },
    approvedReviews() {
      return this.publication.Reviews.filter(el => {
        return el.approved
      })
    },
    socialInfo() {
      return {
        title: this.publication.title,
        desc: this.publication.desc
      }
    }
  },
  beforeDestroy() {
    let root = document.documentElement;
    root.style.setProperty('--main-color', "#ebeef5", 'important');
    root.style.setProperty('--accent-color', "#409EFF", 'important');
    this.$store.commit('publication/SET_EMPTY_PUBLICATION')
  },
  head() {
    if(this.publication.title) {
      return {
        title: `${this.publication.title} | ${process.env.appName}`
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.profile-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__admin-controls {
    border: 1px solid var(--accent-color);
    border-radius: 4px;
    padding: 10px;
  }

  &__subtitle {
    font-weight: normal;
    margin-bottom: 15px;
  }

  &__left {
    width: 190px;
    margin-right: 30px;
  }

  &__right {
    width: 100%;
  }

  &__image {
    width: 100%;
    object-fit: contain;
    min-width: 180px;
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

  }

  &__content {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px 20px 50px;
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

  &__info-block {
    &_adaptive {
      display: none;
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
    flex-wrap: wrap;
    margin-bottom: 25px;
  }

  &__tag {
    margin-bottom: 10px;
  }

  &__right-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.right-header {
  &__controls {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__edit {
    margin-right: 15px;
  }
}

.left {
  &__item {
    margin-bottom: 15px;
    border-radius: 4px;
    display: block;
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
    margin-bottom: 15px;

    .profile-page__subtitle {
      margin-bottom: 0;
    }
  }

  &__container {

  }
}

.controls {
  &__bottom {
    display: flex;
    justify-content: space-between;
  }

  &__row-button {
    width: 50%;

    &:first-child {
      margin-right: 15px;
    }
  }
}

@media (max-width: 575.98px) {
  .profile-page {
    flex-direction: column;

    &__image-container {
      img {
        max-height: 300px;
      }
    }

    &__desc {
      font-size: 16px;
      margin-bottom: 20px;
    }

    &__info-block {
      display: none;

      &_adaptive {
        display: block;
        margin-bottom: 20px;
      }
    }

    &__right-header {
      flex-direction: column;
      margin-bottom: 20px;
    }

  }

  .left {
    width: 100%;
    max-width: 100%;
    margin-right: 0;
  }

  .page-info {
    padding: 15px 0;
  }

  .recommends {
    &__container {
      flex-direction: column;
    }
  }

  .right-header {
    &__info {
      width: 100%;
    }

    &__controls {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .el-button {
        width: 45%;
      }
    }

    &__edit {
      width: 45%;
      .el-button {
        width: 100%;
      }
    }
  }
}

@media (min-width: 576px) and (max-width: 815px) {
  .left {
    max-width: 160px;
  }

  .profile-page {
    &__image {
      min-width: 100px;
    }

    &__right {
      width: 75%;
    }
  }

  .recommends {
    &__container {
      overflow-x: scroll;
    }
  }
}

@media (min-width: 815px) and (max-width: 1000px) {
  .recommends {
    &__container {
      overflow-x: scroll;
    }
  }
}

</style>
