export const state = () => ({
})

export const mutations = {

}

export const actions = {
  async saveImage({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/files/save/image', data)
      if (res) {
       return res
      }
    } catch (e) {
      throw e;
    }
  },
}

export const getters = {}
