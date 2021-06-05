export const state = () => ({
  publication: {},
  tags: [],
  publications: [],
  globalSearch: {},
  favouritePublications: []
})

export const mutations = {
  SET_PUBLICATION(state, publication) {
    const roles = ['User', 'Publisher', 'Organ']
    if (publication.hasOwnProperty('Reviews') && publication.Reviews.length) {
      publication.Reviews.forEach(el => {
        roles.forEach(role => {
          if (el.hasOwnProperty(role) && el[role] && el[role].role === el.reviewerRole) {
            el.author = el[role]
          }
        })
      })
    }
    state.publication = publication
  },
  SET_EMPTY_PUBLICATION(state) {
    state.publication = {}
  },
  SET_TAGS(state, tags) {
    state.tags = tags
  },
  SET_ALL_PUBS(state, publications) {
    state.publications = publications
  },
  SET_EMPTY_PUBS(state) {
    state.publications = []
  },
  SET_GLOBAL_SEARCH(state, search) {
    state.globalSearch = search
  },
  SET_EMPTY_GLOBAL_SEARCH(state) {
    state.globalSearch = {}
  },
  SET_FAVOURITES(state, favourites) {
    state.favouritePublications = favourites
  },
  CHANGE_FAVOURITE(state, data) {
    console.log('DATA', data)
    let publicationIndex = null
    if (data.publication.isFavPage) {
      if (data.status === 'removed') {
        publicationIndex = state.favouritePublications.publications.findIndex(el => {
          return el.id === data.publication.publicationId
        })
        state.favouritePublications.publications.splice(publicationIndex, 1)
      }
    } else {
      state.publication.favourite = data.status !== 'removed';
    }
  }
}

export const actions = {
  async getTags({commit}) {
    try {
      let res = null
      res = await this.$axios.$get(`/tags/pub/all`)
      if (res) {
        commit('SET_TAGS', res)
      }
      return res
    } catch (e) {
      throw e;
    }
  },
  async createPublication({commit}, formData) {
    try {
      let res = null
      res = await this.$axios.$post('/publication/create', formData)
      if (res) {
        return res
      }
    } catch (e) {
      throw e;
    }
  },
  async getPublication({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post(`/publication`, data)
      if (res) {
        commit('SET_PUBLICATION', res)
      }
      return res
    } catch (e) {
      throw e;
    }
  },
  async getPublicationForUpdate({commit}, id) {
    try {
      let res = null
      res = await this.$axios.$get(`/publication/update/${id}`)
      if (res) {
        commit('SET_PUBLICATION', res)
      }
      return res
    } catch (e) {
      throw e;
    }
  },
  async updatePublication({commit}, data) {
    try {
      await this.$axios.$patch(`/publication/${data.id}`, data.formData)
    } catch (e) {
      throw e;
    }
  },
  async getAllPublications({commit}, params) {
    try {
      commit('SET_EMPTY_PUBS')
      let res = null
      res = await this.$axios.$post(`/catalog/all`, params)
      if (res) {
        commit('SET_ALL_PUBS', res)
      }
      return res
    } catch (e) {
      throw e;
    }
  },
  async sendReview({}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/reviews', data)
      if (res) {
        return res
      }
    } catch (e) {
      throw e;
    }
  },
  async searchPublicationsGlobal({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post(`/catalog/search`, data)
      if (res) {
        commit('SET_GLOBAL_SEARCH', res)
      }
      return res
    } catch (e) {
      throw e;
    }
  },
  async addToFavourite({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post(`/favourites`, {
        publicationId: data.publicationId,
        userId: data.userId,
        userRole: data.userRole
      })
      if (res) {
        res.publication.isFavPage = data.isFavPage
        commit('CHANGE_FAVOURITE', res)
      }
    } catch (e) {
      throw e;
    }
  },
  async getFavourites({commit}, data) {
    console.log(data)
    try {
      let res = null
      res = await this.$axios.$post(`/favourites/all`, data)
      if (res) {
        commit('SET_FAVOURITES', res)
        return res
      }
    } catch (e) {
      throw e;
    }
  },
  async deletePublication({commit}, id) {
    try {
      let res = null
      res = await this.$axios.$delete(`/publication/${id}`)
      if (res) {
        return res
      }
    } catch (e) {
      throw e;
    }
  },
}

export const getters = {}
