import { env } from 'node:process'

// @ts-expect-error webpack-i18n-tools does currently not expose types
// import poLoader from 'webpack-i18n-tools/loader/rollup'

// @ts-expect-error webpack-i18n-tools does currently not expose types
// import poOptimizer from 'webpack-i18n-tools/optimizer/rollup'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    typedPages: true,
  },

  build: {
    transpile: [/unplugin-vue-router\/runtime/],
  },

  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/eslint',
    // "@nuxtjs/i18n",
    'radix-vue/nuxt',
    '@nuxtjs/supabase',
  ],

  supabase: {
    redirect: false,
  },

  runtimeConfig: {
    supabaseUrl: env.SUPABASE_URL,
    supabaseKey: env.SUPABASE_KEY,
    supabaseAdminEmail: env.SUPABASE_ADMIN_EMAIL,
    supabaseAdminPassword: env.SUPABASE_ADMIN_PASSWORD,

    public: {
      googleMapKey: env.NUXT_GOOGLE_MAP_KEY,
      databaseUrl: env.NUXT_DATABASE_URL,
      databaseKey: env.NUXT_DATABASE_KEY,
      slackNewCandidateUrl: env.NUXT_SLACK_NEW_CANDIDATE_URL,
      slackReportUrl: env.NUXT_SLACK_REPORT_URL,
      // recaptcha: {
      //   v3SiteKey: process.env.NUXT_RECAPTCHA_SITE_KEY,
      // }
    },
  },

  imports: {
    dirs: [
      'app/utils/i18n',
    ],
    imports: [
      ...['MapLocation', 'Cluster', 'Cryptocity', 'CryptocityData', 'Currency', 'Provider'].map(name => ({ name, from: 'types', type: true })),
    ],
  },

  vite: {
    plugins: [
      // poLoader(),
      // poOptimizer(),
    ],
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: true,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  },

  ignore: ['./bot'],

  eslint: {
    config: {
      standalone: false,
    },
  },

  compatibilityDate: '2024-07-17',
})
