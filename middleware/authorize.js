export default function ({ route, redirect, store }) {
  if (route.path !== '/') {
    const storage = JSON.parse(localStorage.getItem('shop-app-storefront'))
    if (!storage.user.data?.token) {
      redirect('/')
    }
  }
}
