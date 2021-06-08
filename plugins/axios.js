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

  $axios.setBaseURL('http://gipp-server.std-272.ist.mospolytech.ru/api')
}
