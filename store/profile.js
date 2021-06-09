export const state = () => ({
  tabContent: [],
  profile: {}
})

export const mutations = {
  SET_TABS_CONTENT(state, content) {
    state.tabContent = content
  },
  SET_EMPTY_TAB_CONTENT(state) {
    state.tabContent = []
  },
  SET_PROFILE(state, profile) {
    state.profile = profile
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
      throw e;
    }
  },
  async getProfile({commit}, data) {
    try {
      let res = null
      let route = ''
      if(data.role === 2) {
        route = 'organs'
      } else {
        route = 'users'
      }
      res = await this.$axios.$get(`/${route}/${data.id}`)
      if(res) {
        commit('SET_PROFILE', res)
      }
      return res
    }
    catch(e) {
      throw e;
    }
  },
}

export const modules = {
}
