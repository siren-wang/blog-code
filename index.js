const path = require('path')
module.exports = (options, {themeConfig}) => {
  /**
   * Default theme configuration
   */
  themeConfig = Object.assign(themeConfig, {
    searchPlaceholder: themeConfig.searchPlaceholder || 'Search',
    nav: themeConfig.nav || [
      { text: 'Home', link: '/' }
    ],
    hostname: themeConfig.hostname || '',
    wordPerminute: themeConfig.wordPerminute || {cn: 300, en: 160},
    social: themeConfig.social || [],
    reward: themeConfig.reward || {},
    dateFormat: themeConfig.dateFormat || 'MMM DD, YYYY'
  })

  const plugins = [
    ['@vuepress/nprogress'],
    ['@vuepress/search'],
    ['flowchart'],
    ['vuepress-plugin-container', {
      type: 'tip',
      defaultTitle: {
        '/': 'TIP',
        '/zh/': '提示'
      }
    }],
    ['vuepress-plugin-container', {
      type: 'warning',
      defaultTitle: {
        '/': 'WARNING',
        '/zh/': '注意'
      }
    }],
    ['vuepress-plugin-container', {
      type: 'danger',
      defaultTitle: {
        '/': 'WARNING',
        '/zh/': '警告'
      }
    }],
    ['vuepress-plugin-container', {
      type: 'details',
      before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
      after: () => '</details>\n'
    }],
    ['vuepress-plugin-container', {
      type: 'demo',
      before: () => `<DemoCode>\n`,
      after: () => '</DemoCode>\n'
    }],
    ['@vuepress/medium-zoom', {
      selector: '.article-content img',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16,
        background: "#FF0000",
      }
    }],
    ['@vuepress/blog', themeConfig.blog || {
      directories: [
        {
          id: 'post',
          dirname: '_post',
          path: '/',
          itemPermalink: '/post/:year/:month/:day/:slug.html',
          pagination: {
            perPagePosts: 10,
            prevText: '',
            nextText: ''
          }
        }
      ],
      frontmatters: [
        {
          id: "tag",
          keys: ['tag', 'tags'],
          path: '/tags/',
          frontmatter: { title: 'Tag' },
          pagination: {
            lengthPerPage: 10,
            prevText: '',
            nextText: ''
          }
        },
        {
          id: "category",
          keys: ['category', 'categories'],
          path: '/categories/',
          frontmatter: { title: 'Category' },
          pagination: {
            lengthPerPage: 10,
            prevText: '',
            nextText: ''
          }
        }
      ]
    }],
    [
      'vuepress-plugin-seo', themeConfig.seo || false
    ],
    ['@vuepress/pwa', themeConfig.pwa || false],
    ['one-click-copy', {
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: 'Copy successfully and then paste it for use.', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false, // whether to display on the mobile side, default: false.
    }],
    require('./plugin/demo-code'),
    require('./plugin/theme-utils'),
    require('./plugin/float-menu')
  ];
  if(themeConfig.palette) {
    plugins.push(require('./plugin/theme-palette'));
  }
  const config = {
    plugins,
    alias: {
      assets: path.resolve(__dirname, 'assets'),
    }
  }

  return config
}