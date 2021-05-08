export const state = () => ({
  users: []
})

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  REMOVE_USER(state, user) {

  }
}

export const actions = {
  async getUsers({commit}, role) {
    try {
      let res = null
      res = await this.$axios.$get(`/users/all/${role}`)
      if(res) {
        commit('SET_USERS', res)
      }
    } catch (e) {
      console.log(e)
    }
  },
  async confirmRequest({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/users/confirm', data)
      if(res) {
        console.log(res)
        commit('REMOVE_USER', res)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getters = {
}
