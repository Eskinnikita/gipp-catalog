export default function async({store, redirect}) {
  if (!store.getters['auth/isAuthenticated'] ||
    (store.getters['auth/isAuthenticated'] && (store.getters['auth/userRole'] !== 4))) {
    redirect('/')
  }
}
