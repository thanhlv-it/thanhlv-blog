import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
import { textAdPlugin } from './textAdMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: 'Blog',
    activeMatch: `^/blog/`,
    link: '/blog/gioi-thieu'
  }
]

const postBlogs = [
  {
    text: 'Concurrency và parallelism. Giải thích Concurrency và parallelism của OS và business khác gì nhau ?.',
    link: '/blog/2024-01-10-concurrency-va-parallelism-giai-thich-concurrency-va-parallelism-cua-os-va-business-khac-gi-nhau'
  },
  {
    text: 'CPU, CORE và Thread khác gì nhau ?',
    link: '/blog/2024-01-09-cpu-core-and-thread-khac-gi-nhau'
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/blog/': [
    {
      text: '',
      items: [
        { text: 'Giới thiệu', link: '/blog/gioi-thieu' },
        ...postBlogs
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
// const i18n: ThemeConfig['i18n'] = {
// }

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  lastUpdated: true,
  cleanUrls: true,
  lang: 'en-US',
  title: 'Thanhlv',
  description: 'Thanhlv - Yêu công nghệ',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://thanhlv.com/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'thanhlv.com' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Thanhlv - Yêu công nghệ'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://sponsors.vuejs.org'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'script',
      {
        src: 'https://vueschool.io/banner.js?affiliate=vuejs&type=top',
        async: 'true'
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,
    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: 'f49cbd92a74532cc55cfbffa5e5a7d01',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
    ],

    editLink: {
      repo: 'thanhlv-it/thanhlv-blog',
      text: 'Edit this page on GitHub'
    },
    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} ThanhLv`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
      // .use(textAdPlugin)
    },
    toc: {
      level: [2, 3, 4, 5, 6, 7, 8, 9]
    },
    anchor: {
      level: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  }
})
