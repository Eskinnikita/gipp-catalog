export const state = () => ({
})

export const mutations = {

}

export const actions = {
  async saveImage({commit}, data) {
    try {
      console.log('FILE', data)
      let res = null
      res = await this.$axios.$post('/files/save/image', data)
      if (res) {
       return res
      }
    } catch (e) {
      console.log(e)
    }
  },
}

export const getters = {}
