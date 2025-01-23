// @ts-check

/**
 * This file is intended to be required from VitePress
 * consuming project's config file.
 *
 * It runs in Node.js.
 */

// for local-linked development
const deps = ['@vue/theme', '@vueuse/core', 'body-scroll-lock']

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  scrollOffset: ['header', '.VPLocalNav'],

  vite: {
    ssr: {
      noExternal: deps
    },
    optimizeDeps: {
      exclude: deps
    }
  },

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.svg'
      }
    ]
  ],

  markdown: {
    headers: {
      level: [2, 3]
    }
  },

  // @ts-ignore
  transformHead({assets, pageData,siteConfig, siteData}) {
    const font = assets.find((file) =>
      /inter-roman-latin\.\w+\.woff2/.test(file)
    )
    const head = []
    if (pageData.frontmatter.image) {
      const urlIamge = pageData.frontmatter.image.indexOf("http") > -1 ? pageData.frontmatter.image :  pageData.frontmatter.image
      head.push(['meta', {property: 'og:image', content: urlIamge, itemprop: "thumbnailUrl"}])
    }else {
      head.push(['meta', {property: 'og:image', content: "/images/thumbnail.png", itemprop: "thumbnailUrl"}])
    }
    head.push(['meta', {property: 'og:url', content: pageData.relativePath.replaceAll(".md",".html"), itemprop: "url"}])

    head.push(['meta', {property: 'og:title', content: pageData.frontmatter.title, itemprop: "headline"}])
    head.push(['meta', {property: 'og:description', content: pageData.description || pageData.frontmatter.title, itemprop: "description"}])
    head.push(['meta', {name: 'description', content: pageData.description || pageData.frontmatter.title}])

    if (font) {
      head.push(
        [
          'link',
          {
            rel: 'preload',
            href: font,
            as: 'font',
            type: 'font/woff2',
            crossorigin: ''
          }
        ]
      )
    }
    return head;
  },

  shouldPreload(link) {
    // make algolia chunk prefetch instead of preload
    return !link.includes('Algolia')
  }
}

module.exports = config
