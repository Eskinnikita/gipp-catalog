export const state = () => ({
})

export const mutations = {

}

export const actions = {
  async createPublication({commit}, formData) {
    try {
      let res = null
      res = await this.$axios.$post('/publications/create', formData)
      if(res) {
        return res
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const getters = {
}
