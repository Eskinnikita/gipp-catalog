<template>
  <div class="profile-page">
    <div class="profile-page__left left">
      <img
        src="https://lh3.googleusercontent.com/proxy/oCNYKCQ3hKKRwq-CUEWq5pNKZ1dr5QgMGYPmcg546odf38HZUEUrVxWJAeZn0G3Hlg19fNMeZW0h3Gfo6I1vFc0B9TYPWOWsQFMoZdoLchvLbRqw-uXyqxu5RLKNspR4fBOo3QECkGlpGqIyQGcgG5Ulrj3-oclWJpwDiN-R-TQH333k4RtygWnP1m6qOGpe8ORmLRRYbhiekCeZGVrRmCzq_2wVLrAZFd0"
        class="profile-page__image left__item" alt="profile image"/>
      <div class="profile-page__controls left__item">
        <el-button type="primary">Редактировать</el-button>
        <el-button type="primary" plain icon="el-icon-share"></el-button>
      </div>
      <info-block/>
    </div>
    <div class="profile-page__right left__item">
      <h3 class="profile-page__title">Издательский дом «Азбука-Аттикус»</h3>
      <p class="profile-page__desc">
        В Издательскую Группу «Азбука-Аттикус» входят четыре издательства. Каждое специализируется на определенных нишах
        книжного рынка и стремится достичь совершенства именно в них: «Азбука» — русская и зарубежная классика,
        современная художественная литература, фэнтези и фантастика,
        культурология, искусство, книги для детей, комиксы и манга.
      </p>
      <div class="profile-page__content">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Каталог" name="1">
            <div class="profile-page__tab-title-container">
              <h3 class="profile-page__tab-title">Наши издания</h3>
              <nuxt-link to="/publication/create">
                <el-button icon="el-icon-edit" type="primary">Добавить</el-button>
              </nuxt-link>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Новости" name="2">
            <div class="profile-page__tab-title-container">
              <h3 class="profile-page__tab-title">Наши Новости</h3>
              <nuxt-link to="/editor">
                <el-button icon="el-icon-edit" type="primary">Добавить</el-button>
              </nuxt-link>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Комментарии" name="3">
            <h3 class="profile-page__tab-title">Наши комментарии</h3>
          </el-tab-pane>
        </el-tabs>
        <div class="profile-page__tab-content">
          <publisher-catalog v-if="activeTab === '1'"/>
          <profile-news v-if="activeTab === '2'"/>
          <profile-comments v-if="activeTab === '3'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoBlock from "@/components/profile/infoBlock"
import publisherCatalog from "@/components/profile/publisherCatalog"
import profileNews from "@/components/profile/profileNews"
import profileComments from "@/components/profile/profileComments"

export default {
  components: {
    infoBlock,
    publisherCatalog,
    profileNews,
    profileComments
  },
  layout: 'transparent',
  data() {
    return {
      activeTab: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 100vh;

  &__left {
    width: 230px;
    margin-right: 40px;
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
    padding: 20px;
  }

  &__title {
    margin-bottom: 15px;
  }

  &__desc {
    width: 80%;
    max-width: 650px;
    margin-bottom: 15px;
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
}

.left {
  &__item {
    margin-bottom: 15px;
    border-radius: 4px;
  }
}

</style>
