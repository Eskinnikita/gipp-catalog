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
  REMOVE_USER(state, data) {
    const userIndex = state.adminPanelListItems.notApproved.findIndex(el => {
      return el.id === data.id
    })
    state.adminPanelListItems.notApproved.splice(userIndex, 1)
  },
  REPLACE_SNIPPET(state, data) {
    const userIndex = state.adminPanelListItems.notApproved.findIndex(el => {
      return el.id === data.id
    })
    const user = state.adminPanelListItems.notApproved[userIndex]
    state.adminPanelListItems.notApproved.splice(userIndex, 1)
    user.approved = true
    state.adminPanelListItems.approved.rows.unshift(user)
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
      commit('REPLACE_SNIPPET', data)
      let res = null
      res = await this.$axios.$post('/users/confirm', data)
      if (res) {
        commit('REPLACE_SNIPPET', data)
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
        commit('REMOVE_USER', data)
      }
    } catch (e) {
      console.log(e)
    }
  },
}

export const getters = {}
