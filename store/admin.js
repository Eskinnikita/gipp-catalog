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
  REMOVE_APPROVED_USER(state, data) {
    const userIndex = state.adminPanelListItems.approved.rows.findIndex(el => {
      return el.id === data.id
    })
    state.adminPanelListItems.approved.rows.splice(userIndex, 1)
  },
  REMOVE_ITEM(state, data) {
    const itemIndex = state.adminPanelListItems.rows.findIndex(el => {
      return el.id === data.id
    })
    state.adminPanelListItems.rows.splice(itemIndex, 1)
  },
  REPLACE_SNIPPET(state, data) {
    const userIndex = state.adminPanelListItems.notApproved.findIndex(el => {
      return el.id === data.id
    })
    const user = JSON.parse(JSON.stringify(state.adminPanelListItems.notApproved[userIndex]))
    user.approved = true
    if(user) {
      state.adminPanelListItems.notApproved.splice(userIndex, 1)
      state.adminPanelListItems.approved.rows.unshift(user)
    }
  },
  ADD_ITEM(state, item) {
    state.adminPanelListItems.rows.unshift(item)
  },
  REMOVE_TAG(state, tag) {

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
      throw e;
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
      throw e;
    }
  },
  async getArticles({commit}, data) {
    try {
      commit('SET_EMPTY_ITEMS')
      let res = null
      res = await this.$axios.$post(data.route, data.params)
      if (res) {
        commit('SET_ITEMS', res)
      }
    } catch (e) {
      throw e;
    }
  },
  async getTags({commit}, data) {
    try {
      commit('SET_EMPTY_ITEMS')
      let res = null
      res = await this.$axios.$post(data.route, data.params)
      if (res) {
        commit('SET_ITEMS', res)
      }
    } catch (e) {
      throw e;
    }
  },
  async addTag({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/tags', data)
      if (res) {
        commit('ADD_ITEM', res)
        return res
      }
    } catch (e) {
      throw e;
    }
  },
  async deleteTag({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$delete(`/tags/${data}`)
      if (res) {
        commit('REMOVE_ITEM', res)
        return res
      }
    } catch (e) {
      throw e;
    }
  },
  async getReviews({commit}, data) {
    try {
      commit('SET_EMPTY_ITEMS')
      let res = null
      res = await this.$axios.$post(data.route, data.params)
      if (res) {
        const roles = ['User', 'Publisher', 'Organ']
        res.rows.forEach(el => {
          roles.forEach(role => {
            if(el[role] !== null) {
              if(el.hasOwnProperty(role) && el[role] && el[role].role === el.reviewerRole) {
                el.author = el[role]
              }
            }
          })
        })
        commit('SET_ITEMS', res)
      }
    } catch (e) {
      throw e;
    }
  },
  async confirmRequest({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/users/confirm', data)
      if (res) {
        commit('REPLACE_SNIPPET', data)
      }
    } catch (e) {
      throw e;
    }
  },
  async denyRequest({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/users/deny', data)
      if (res) {
        commit('REMOVE_USER', data)
      }
    } catch (e) {
      throw e;
    }
  },
  async confirmReview({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/admin/reviews/confirm', data)
      if (res) {
        commit('REMOVE_ITEM', data)
      }
    } catch (e) {
      throw e;
    }
  },
  async denyReview({commit}, data) {
    try {
      let res = null
      res = await this.$axios.$post('/admin/reviews/deny', data)
      if (res) {
        commit('REMOVE_ITEM', data)
      }
    } catch (e) {
      throw e;
    }
  },
  async deleteUser({commit}, data) {
    try {
      let res = null
      if(data.role === 1) {
        res = await this.$axios.$delete(data.route)
      } else {
        res = await this.$axios.$patch(data.route)
      }
      if (data.role === 1) {
        commit('REMOVE_ITEM', res)
      } else {
        commit('REMOVE_APPROVED_USER', res)
      }
    } catch (e) {
      throw e;
    }
  },
}

export const getters = {}
