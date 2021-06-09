import * as Cookies from 'js-cookie'

export const state = () => ({
  user: null,
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    localStorage.setItem('user-token', user.token)
    this.$axios.setToken(user.token, 'Bearer')
  },
  SET_EMPTY_USER(state) {
    state.user = null
    localStorage.removeItem('user-token')
  }
}

export const actions = {
  async loginUser({commit}, user) {
    try {
      let res = null
      res = await this.$axios.$post('/login', user)
      if(res) {
        commit('SET_USER', res)
      }
    } catch (e) {
      throw e;
    }
  },
  async makeRequest({commit}, request) {
    try {
      await this.$axios.$post('/request', request)
    } catch (e) {
      throw e;
    }
  },
  async createUser({commit}, newUserData) {
    try {
      let res = null
      res = await this.$axios.$post('/register', newUserData)
      if(res) {
        commit('SET_USER', res)
      }
    } catch (e) {
      throw e;
    }
  },
  logout({commit}) {
    commit('SET_EMPTY_USER')
    Cookies.remove('vuex')
  }
}

export const getters = {
  isAuthenticated: state => !!state.user,
  isAdmin: state => state.user.role === 4,
  isUser: state => state.user.role === 1,
  isOrgan: state => state.user.role === 2,
  isPublisher: state => state.user.role === 2,
  userRole: state => state.user.role,
  notUser: state =>  state.user.role === 2 ||  state.user.role === 3 ||  state.user.role === 4
}
