export const state = () => ({
  publication: {},
  tags: [],
  publications: []
})

export const mutations = {
  SET_PUBLICATION(state, publication) {
    const roles = ['User', 'Publisher', 'Organ']
    publication.Reviews.forEach(el => {
      roles.forEach(role => {
        if(el.hasOwnProperty(role) && el[role].role === el.reviewerRole) {
          el.author = el[role]
        }
      })
    })
    state.publication = publication
  },
  SET_EMPTY_PUBLICATION(state) {
    state.publication = {}
  },
  SET_TAGS(state, tags) {
    state.tags = tags
  },
  SET_ALL_PUBS(state, publications) {
    state.publications = publications
  },
  SET_EMPTY_PUBS(state) {
    state.publications = []
  }
}

export const actions = {
  async getTags({commit}) {
    try {
      let res = null
      res = await this.$axios.$get(`/tags/pub/all`)
      if(res) {
        commit('SET_TAGS', res)
      }
      return res
    } catch (e) {
      console.log(e)
    }
  },
  async createPublication({commit}, formData) {
    try {
      let res = null
      res = await this.$axios.$post('/publication/create', formData)
      if(res) {
        return res
      }
    } catch (e) {
      console.log(e)
    }
  },
  async getPublication({commit}, id) {
    try {
      let res = null
      res = await this.$axios.$get(`/publication/${id}`)
      if(res) {
        commit('SET_PUBLICATION', res)
      }
      return res
    } catch (e) {
      console.log(e)
    }
  },
  async getPublicationForUpdate({commit}, id) {
    try {
      let res = null
      res = await this.$axios.$get(`/publication/update/${id}`)
      if(res) {
        commit('SET_PUBLICATION', res)
      }
      return res
    } catch (e) {
      console.log(e)
    }
  },
  async updatePublication({commit}, data) {
    try {
      await this.$axios.$patch(`/publication/${data.id}`, data.formData)
    } catch (e) {
      console.log(e)
    }
  },
  async getAllPublications({commit}, params) {
    try {
      commit('SET_EMPTY_PUBS')
      let res = null
      res = await this.$axios.$post(`/catalog/all`, params)
      if(res) {
        commit('SET_ALL_PUBS', res)
      }
      return res
    } catch (e) {
      console.log(e)
    }
  },
  async sendReview({}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/reviews', data)
      if(res) {
        return res
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getters = {
}
