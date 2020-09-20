import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'shop-app-dashboard',
    paths: ['user'],
  })(store)
}
