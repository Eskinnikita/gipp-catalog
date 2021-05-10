export const state = () => ({
  publication: {}
})

export const mutations = {
  SET_PUBLICATION(state, publication) {
    state.publication = publication
  },
  SET_EMPTY_PUBLICATION(state) {
    state.publication = {}
  }
}

export const actions = {
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
  }
}

export const getters = {
}
