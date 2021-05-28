export const state = () => ({
  article: {},
  articles: []
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
  }
}

export const actions = {
  async getArticle({commit}, id) {
    try {
      let res = null
      res = await this.$axios.$get(`/articles/${id}`)
      if (res) {
        commit('SET_ARTICLE', res)
      }
    } catch (e) {
      console.log(e)
    }
  },
  async getAllArticles({commit}, params) {
    try {
      let res = null
      res = await this.$axios.$post(`/articles/all`)
      if (res) {
        commit('SET_ARTICLES', res)
      }
    } catch (e) {
      console.log(e)
    }
  },
  async saveArticle({commit}, data) {
    try {
      console.log(data)
      let res = null
      res = await this.$axios.$post(`/articles`, data)
      if (res) {
        commit('SET_ARTICLE', res)
      }
    } catch (e) {
      console.log(e)
    }
  },
}

export const getters = {}
