export const state = () => ({
  data: null,
})

export const mutations = {
  login(state, data) {
    state.data = data
  },
  logout(state) {
    state.data = null
  },
  editData(state, newData) {
    state.data = {
      ...state.data,
      ...newData,
    }
  },
}
