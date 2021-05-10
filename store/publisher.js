export const state = () => ({
  publisher: {}
})

export const mutations = {
  SET_PUBLISHER(state, publisher) {
    state.publisher = publisher
  },
  SET_EMPTY_PUBLISHER(state) {
    state.publisher = {}
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
      return res
    } catch (e) {
      console.log(e)
    }
  },
  async updatePublisher({commit}, data) {
    try {
      await this.$axios.$patch(`/publisher/${data.id}`, data.formData)
    } catch (e) {
      console.log(e)
    }
  }
}

export const getters = {
}
