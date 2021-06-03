export default function async ({store, redirect}) {
  if(!store.getters['auth/isAuthenticated']) {
    redirect('/')
  }
}
