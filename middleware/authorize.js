export default function ({ route, redirect, store }) {
  if (route.path !== '/') {
    if (!store.state.user.data?.token) {
      redirect('/')
    }
  }
}
