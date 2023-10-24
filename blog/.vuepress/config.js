module.exports = {
  title: 'Siren\'s playground',
  description: 'Paint the world colorful.',
  // title: {
  //   'en-US': 'Siren\'s playground',
  //   'zh-CN': 'Siren 的游乐场',
  // },
  // description: {
  //   'en-US': 'Paint the world colorful.',
  //   'zh-CN': '让世界充满色彩。',
  // },
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
    // '/': {
    //   lang: 'en-US',
    //   label: 'English',
    //   title: 'Siren\'s playground',
    //   description: 'Siren 的游乐场'
    // },
    // '/zh/': {
    //   lang: 'zh-CN',
    //   label: '简体中文',
    //   title: '让世界充满色彩',
    // }
  }
}