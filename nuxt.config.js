export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: 'Каталог детских СМИ',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/persistedstate.js',
    '@/plugins/axios.js',
    {src: '@/plugins/star-rating.js', ssr: false},
    {src: '@/plugins/nuxt-quill-plugin.js', ssr: false},
    {src: '@/plugins/vue-social-sharing.js', ssr: false},
    {src: '@/plugins/font-awesome.js', ssr: false},
    {src: '@/plugins/vue-editor.js', ssr: false},
    {src: '@/plugins/vue-color.js', ssr: false},
    {src: '@/plugins/vue-burger.js', ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment'
  ],

  // router: {
  //   middleware: "isAuth"
  // },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  robots: {
    UserAgent: '*',
    Disallow: [
      '/cabinet',
      '/user=',
      '/organization',
      '/favourites',
      '/create',
      '/editor',
      '/publication/create'
    ]
  },
  sitemap: {
    hostname: 'http://detsmi-catalog-gipp.herokuapp.com',
    gzip: true,
    exclude: [
      '/cabinet',
      '/editor',
    ],
    routes: [
      {
        url: '/catalog',
        changefreq: 'daily',
        priority: 1,
      },
      {
        url: '/news',
        changefreq: 'daily',
        priority: 1,
      },
      {
        url: '/publisher',
        changefreq: 'daily',
        priority: 1,
      }
    ]
  },
  moment: {
    locales: ['ru']
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
  env: {
    production: false,
    // serverUrl: 'http://localhost:8082',
    serverUrl: 'http://gipp-server.std-272.ist.mospolytech.ru',
    appName: 'Каталог детских СМИ'
  }
}
