export const state = () => ({
  adminPanelListItems: null
})

export const mutations = {
  SET_ITEMS(state, items) {
    state.adminPanelListItems = items
  },
  SET_EMPTY_ITEMS(state) {
    state.adminPanelListItems = null
  },
  REMOVE_USER(state, id) {
    const userIndex = state.users.find(el => {
      return el.id === id
    })
    userIndex.approved = true
  }
}

export const actions = {
  async getUsers({commit}, data) {
    try {
      commit('SET_EMPTY_ITEMS')
      let res = null
      res = await this.$axios.$post(data.route, data.params)
      if (res) {
        commit('SET_ITEMS', res)
      }
    } catch (e) {
      console.log(e)
    }
  },
  async getPubs({commit}, data) {
    try {
      commit('SET_EMPTY_ITEMS')
      let res = null
      res = await this.$axios.$post(data.route, data.params)
      if (res) {
        commit('SET_ITEMS', res)
      }
    } catch (e) {
      console.log(e)
    }
  },
  async confirmRequest({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/users/confirm', data)
      if (res) {
        console.log(res)
        commit('REMOVE_USER', data)
      }
    } catch (e) {
      console.log(e)
    }
  },
  async denyRequest({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/users/deny', data)
      if (res) {
        console.log(res)
        commit('REMOVE_USER', data.id)
      }
    } catch (e) {
      console.log(e)
    }
  },
}

export const getters = {}
