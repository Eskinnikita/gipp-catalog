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
      console.log(e)
    }
  },
  async updateUser({commit}, data) {
    try {
      console.log(data)
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
      console.log(e)
    }
  },
}

export const getters = {}
