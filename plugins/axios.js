export default function ({
  $axios,
  store
}) {
  $axios.onRequest(request => {
    if (store.state.auth.user) {
      request.headers.common['Authorization'] = 'bearer ' + store.state.auth.user.token;
    }

    return request
  })

  $axios.setBaseURL('http://localhost:8082/api')
}
