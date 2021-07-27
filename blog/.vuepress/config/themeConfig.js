module.exports = {
  siteName: 'Siren\'s Blog',
  logo: '/logo.jpg',
  siteDesc: 'Paint the world colorful.',
  nav: [
    { text: 'Home', link: '/' },
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
      link: '//qm.qq.com/cgi-bin/qm/qr?k=fknyQ434nkzVUWUmJ6rpIPctkS9eyQaZ&jump_from=webapi'
    },
    {
      type: 'feed',
      link: '/rss.xml'
    }
  ],
  copyright: '© 2021 ❤️ <a target="_blank" href="https://17ria.com/">Siren Wang</a>',
  blog: {
    directories: [
      {
        id: 'post',
        dirname: '_post',
        path: '/',
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
      hostname: 'https://80shuo.com',
      exclude: ['/404.html']
    },
    feed: {
      canonical_base: 'http://80shuo.com',
    },
    palette: {},
    comment: {},
  },
}