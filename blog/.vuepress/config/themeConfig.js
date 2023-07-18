module.exports = {
  siteName: 'Siren\'s Blog',
  logo: '/logo.jpg',
  siteDesc: 'Paint the world colorful.',
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Blogs', link: '/blogs/' },
    { text: 'Languages', link: '/categories/theme/' },
    { text: 'Principles', link: '/categories/maker/' },
    { text: 'Interview', link: '/categories/animation/' },
    { text: 'Accomplishments', link: '/categories/oldtime/' },
    { text: 'Being alive', link: '/friend-links/' },
  ],
  searchPlaceholder: 'Search',
  searchMaxSuggestions: 10,
  social: [
    {
      type: 'email',
      link: 'siren.xrw@gmail.com'
    },
    {
      type: 'github',
      link: 'sirenar'
    },
    {
      type: 'qq',
      link: 'https://qm.qq.com/cgi-bin/qm/qr?k=KJY-Ba59H1bP-2vQcM0KqxZY2tZkVayT&noverify=0'
    },
    {
      type: 'feed',
      link: '/rss.xml'
    }
  ],
  copyright: '© 2021 <a target="_blank" href="#">Siren Wang</a>',
  palette: { colors: [
    {
      btnColor: '#ffa1a1',
      paletteVars: 
      {
        dark: 
          '--theme-accent-color: #ffa1a1',
        light: 
          '--theme-accent-color: #ffa1a1',
      },
    }, 
    {
      btnColor: '#d8caaf',
      paletteVars: 
      {
        dark: '--theme-accent-color: #d3d4cc',
        light: '--theme-accent-color: #d3d4cc',
      },
    }, 
    {
      btnColor: '#965455',
      paletteVars: 
      {
        dark: '--theme-accent-color:#965455',
        light: '--theme-accent-color:#965455',
      },
    },{
      btnColor: '#6b5152',
      paletteVars: 
      {
        dark: '--theme-accent-color: #6b5152',
        light: '--theme-accent-color: #6b5152',
      },
    },{
      btnColor: '#7a7281',
      paletteVars: 
      {
        dark: '--theme-accent-color: #7a7281',
        light: '--theme-accent-color: #7a7281',
      },
    }] },
  blog: {
    directories: [
      {
        id: 'post',
        dirname: '_post',
        path: '/blogs/',
        itemPermalink: '/post/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        },
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
    ],
    sitemap: {
      // hostname: 'https://80shuo.com',
      exclude: ['/404.html']
    },
    feed: {
      // canonical_base: 'http://80shuo.com',
    },
    comment: {
      service: 'valine',
      appId: 'yjSOq361A6Hu4FGqG2m8Ln8f-gzGzoHsz',
      appKey: 'nADAGze47rQCdy8yuK3oYN8z',
      notify: false, 
      verify: false, 
      visitor: true, // 阅读量统计
      placeholder: "快来评论我_(:з」∠)_",
      meta: ['nick','mail'],
      lang: 'en',
      requiredFields: []
    }
  },
}