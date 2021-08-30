module.exports = {
  title: 'I\'m Siren',
  description: 'Paint the world colorful.',
  port: 8088,
  markdown: {
    lineNumbers: true,
    extractHeaders: [ 'h2', 'h3', 'h4' ],
    plugins: {
      'markdown-it-mark': true,
      'markdown-it-footnote': true,
      'markdown-it-abbr': true,
      'markdown-it-task-lists': true,
    }
  },
  theme: require.resolve('../../index'), // 使用本地主题
  themeConfig: require('./config/themeConfig'),
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    // '/': {
    //   lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
    //   title: 'VuePress',
    //   description: 'Vue-powered Static Site Generator'
    // },
    // '/zh/': {
    //   lang: 'zh-CN',
    //   title: 'VuePress',
    //   description: 'Vue 驱动的静态网站生成器'
    // }
  }
}