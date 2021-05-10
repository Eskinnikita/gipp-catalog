export const state = () => ({
  publisher: {}
})

export const mutations = {
  SET_PUBLISHER(state, publisher) {
    state.publisher = publisher
  }
}

export const actions = {
  async getPublisher({commit}, id) {
    try {
      let res = null
      res = await this.$axios.$get(`/publisher/${id}`)
      if(res) {
        commit('SET_PUBLISHER', res)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getters = {
}
