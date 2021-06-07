export const state = () => ({
  article: {},
  articles: [],
  articleOnUpdate: {}
})

export const mutations = {
  SET_ARTICLE(state, article) {
    state.article = article
  },
  SET_EMPTY_ARTICLE(state) {
    state.article = {}
  },
  SET_ARTICLES(state, articles) {
    state.articles = articles
  },
  async SET_ARTICLE_ON_UPDATE(state, article) {
    state.articleOnUpdate = article
  },
  ADD_COMMENT(state, comment) {
    state.article.Comments.push(comment)
  }
}

export const actions = {
  async getArticle({commit}, id) {
    try {
      let res = null
      res = await this.$axios.$get(`/articles/${id}`)
      if (res) {
        commit('SET_ARTICLE', res)
        return res
      }
    } catch (e) {
      console.log(e)
      this.$notify({
        title: 'Успех!',
        message: e.message,
        type: 'error',
        position: 'bottom-right'
      });
    }
  },
  async getAllArticles({commit}, params) {
    try {
      let res = null
      res = await this.$axios.$post(`/articles/all`, params)
      if (res) {
        commit('SET_ARTICLES', res)
      }
    } catch (e) {
      throw e;
    }
  },
  async saveArticle({commit}, data) {
    try {
      console.log(data)
      let res = null
      res = await this.$axios.$post(`/articles`, data)
      if (res) {
        commit('SET_ARTICLE', res)
        return res
      }
    } catch (e) {
      throw e;
    }
  },
  async updateArticle({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$patch(`/articles/${data.id}`, data.data)
      console.log(res)
      if (res) {
        return res
      }
    } catch (e) {
      throw e;
    }
  },
  async sendComment({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post(`/comments`, data)
      if (res) {
        console.log(res)
        commit('ADD_COMMENT', res[0])
        return res
      }
    } catch (e) {
      throw e;
    }
  },
  async deleteArticle({commit}, id) {
    try {
      let res = null
      res = await this.$axios.$delete(`/articles/${id}`)
      if (res) {
        return res
      }
    } catch (e) {
      throw e;
    }
  }
}

export const getters = {}
