export const state = () => ({})

export const mutations = {}

export const actions = {
  async getUserForUpdate({commit}, data) {
    try {
      let res = null
      if (data.role === 1) {
        res = await this.$axios.$get(`/users/${data.id}`)
      } else {
        res = await this.$axios.$get(`/organs/${data.id}`)
      }
      if (res) {
        return res
      }
    } catch (e) {
      throw e;
    }
  },
  async updateUser({commit}, data) {
    try {
      let res = null
      if (data.role === 1) {
        res = await this.$axios.$patch(`/users/${data.id}`, data.formData)
      } else {
        res = await this.$axios.$patch(`/organs/${data.id}`, data.formData)
      }
      if (res) {
        return res
      }
    } catch (e) {
      throw e;
    }
  },
}

export const getters = {}
