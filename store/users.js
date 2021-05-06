export const state = () => ({
  users: []
})

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
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
  }
}

export const getters = {

}
