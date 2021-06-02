export const state = () => ({
  mainContent: {}
})

export const mutations = {
  SET_MAIN_CONTENT(state, content) {
    state.mainContent = content
  }
}

export const actions = {
  async getMainContent({commit}) {
    try {
      let res = null
      res = await this.$axios.$get(`/publication/main-page`)
      if (res) {
        commit('SET_MAIN_CONTENT', res)
        return res
      }
    } catch (e) {
      console.log(e)
    }
  },
}

