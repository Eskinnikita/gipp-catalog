export const state = () => ({
  tabContent: []
})

export const mutations = {
  SET_TABS_CONTENT(state, content) {
    state.tabContent = content
  },
  SET_EMPTY_TAB_CONTENT(state) {
    state.tabContent = []
  }
}

export const actions = {
  async getTabContent({commit}, params) {
    try {
      let res = null
      res = await this.$axios.$post(`/profile/tab-content`, params)
      if(res) {
        commit('SET_TABS_CONTENT', res)
      }
      return res
    }
    catch(e) {
      console.log(e.message)
    }
  }
}

export const modules = {
}
