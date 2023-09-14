// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    // '@vite-pwa/nuxt'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      meta: [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        }
      ],
      link: [
        { rel: "icon", hid: "icon", type: "image/x-icon", href: `/favicon.ico` },
        { rel: "apple-touch-icon", hid: "icon_1", sizes: "57x57", href: `/apple-icon-57x57.png` },
        { rel: "apple-touch-icon", hid: "icon_2", sizes: "60x60", href: `/apple-icon-60x60.png` },
        { rel: "apple-touch-icon", hid: "icon_3", sizes: "72x72", href: `/apple-icon-72x72.png` },
        { rel: "apple-touch-icon", hid: "icon_4", sizes: "76x76", href: `/apple-icon-76x76.png` },
        { rel: "apple-touch-icon", hid: "icon_5", sizes: "114x114", href: `/apple-icon-114x114.png` },
        { rel: "apple-touch-icon", hid: "icon_6", sizes: "120x120", href: `/apple-icon-120x120.png` },
        { rel: "apple-touch-icon", hid: "icon_7", sizes: "144x144", href: `/apple-icon-144x144.png` },
        { rel: "apple-touch-icon", hid: "icon_8", sizes: "152x152", href: `/apple-icon-152x152.png` },
        { rel: "apple-touch-icon", hid: "icon_9", sizes: "180x180", href: `/apple-icon-180x180.png` },
        { rel: "apple-touch-icon", hid: "icon_10", sizes: "192x192", href: `/apple-icon-192x192.png` },
        { rel: "icon", type: "image/png", hid: "icon_11", sizes: "192x192", href: `/pwa-192x192.png` },
        { rel: "icon", type: "image/png", hid: "icon_12", sizes: "36x36", href: `/android-icon-36x36.png` },
        { rel: "icon", type: "image/png", hid: "icon_13", sizes: "96x96", href: `/android-icon-96x96.png` },
        { rel: "icon", type: "image/png", hid: "icon_14", sizes: "16x16", href: `/android-icon-16x16.png` },
        /* { name: "msapplication-TileColor", content: "#ffffff" },
        { name: "msapplication-TileImage", hid: "icon_15", content: `/ms-icon-144x144.png` },
        { name: "theme-color", content: "#ffffff" }, */
        // { rel: "manifest", hid: "manifest", href: `/manifest.json` }, // pwa module will generate manifest
      ],
    },
    // buildAssetsDir:
    // cdnURL
  },
  css: ['~/assets/css/variables.css',
    '~/assets/css/main.css',
    '~/assets/css/page-transition.css',
    '~/assets/css/button.css',
    '~/assets/css/inputs.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    legacy: false,
    locale: 'en-us',
    defaultLocale: 'en-us',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    },
    lazy: true,
    langDir: 'lang',
    locales: [
      {
        code: 'en-us',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'zh-cn',
        name: '简体中文',
        file: 'cn.json'
      },
      {
        code: 'zh-tw',
        name: '繁体中文',
        file: 'tw.json'
      }
    ]
  },
  imports: {
    dirs: ['store']
  },
 /*  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      "name": "Instant Expense Tracker",
      "short_name": "Expense Tracker",
      "description": "Track your expenses.",
      "theme_color": "#3b82f6",
      "start_url": "/",
      "display": "fullscreen",
      "icons": [
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    },
    workbox: {
      navigateFallback: '',
    },
  }, */
  runtimeConfig: {
    // nuxt will auto populate variables matched in .env
    public: {
      TITLE: '',
      VERSION: Date.now()
    }
  },
})
