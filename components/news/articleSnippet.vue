<template>
  <nuxt-link :to="`/news/${article.id}`">
    <div class="article-snippet">
      <div class="article-snippet__image-container"
           :style="{ backgroundImage: `url(${serverUrl}/${article.mainImageUrl})` }">
        <nuxt-link v-if="isAdminPage" class="article-snippet__edit" :to="`/editor/${article.id}`">
          <el-button type="primary" round icon="el-icon-edit"></el-button>
        </nuxt-link>
        <div class="article-snippet__content">
          <div class="article-snippet__info">
            <h2 class="article-info__title">{{ article.title }}</h2>
            <div class="article-snippet__meta">
              <div class="article-snippet__author" v-if="showAuthor">
                <el-avatar
                  style="margin-right: 10px;"
                  class="article-snippet__avatar-image"
                  size="large"
                  icon="el-icon-user-solid"
                  :src="logoUrl"
                />
                <span class="article-snippet__author-name">{{ article.author.name }}&nbsp;</span>
                <span class="article-snippet__divider">•</span> &nbsp;
              </div><span>{{ $moment(article.updatedAt).fromNow(true) }} назад</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    },
    showAuthor: {
      type: Boolean,
      required: true
    },
    isAdminPage: {
      type: Boolean,
      default: false
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
    logoUrl() {
      if (this.article.author.logoUrl) {
        return this.serverUrl + '/' + this.article.author.logoUrl
      } else {
        return ''
      }
    },
    authorRole() {
      return this.article.authorRole === 3 ? 'publisher' : 'organization'
    }
  }
}
</script>

<style lang="scss" scoped>
.article-snippet {
  width: 100%;
  height: 280px;
  margin-bottom: 30px;
  border-radius: 8px;
  max-width: 100%;
  overflow: hidden;
  transition: 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.01);
  }

  &__image-container {
    border-radius: 8px;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    position: relative;

  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    border-radius: 4px;
    min-height: 230px;
    background-image: linear-gradient(
        -180deg, rgba(0, 0, 0, 0) 7%, rgba(0, 0, 0, 0.08) 12%, rgba(0, 0, 0, 0.16) 17%, rgba(0, 0, 0, 0.22) 21%, rgba(0, 0, 0, 0.32) 26%, rgba(0, 0, 0, 0.42) 32%, rgba(0, 0, 0, 0.52) 38%, rgba(0, 0, 0, 0.62) 47%, rgba(0, 0, 0, 0.72) 57%, rgba(0, 0, 0, 0.82) 65%);
    flex-grow: 0;
    justify-content: flex-end;
    padding: 60px 15px 15px;
    position: absolute;
    bottom: 0;
  }

  &__meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 20px;
  }

  &__author {
  }

  &__author {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__info {
    color: #fff;
  }

  &__edit {
    position: absolute;
    top: 15px;
    right: 15px;
  }
}

@media (max-width: 575.98px) {
  .article-snippet {
    height: 230px;

    &__avatar-image {
      display: none;
    }

    &__meta {
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }

    &__divider {
      display: none;
    }
  }
  .article-info {
    &__title {
      font-size: 18px;
    }
  }
}


</style>
