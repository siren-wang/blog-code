<template>
  <nav
    v-if="userLinks.length || repoLink"
    class="nav-links"
  >
    <div v-if="$page.headers">
      <div
          v-for="(item, index) in displayHeaders"
          ref="chairTocItem"
          :key="index"
          class="nav-item"
          :class="[
            `theme-toc-h${item.level}`,
            {'router-link-active': activeIndex === index}
          ]"
        >
          <a 
            :class="{'router-link-active': activeIndex === index}"
            :href="`#${item.slug}`" :title="item.title">{{ item.title }}
          </a>
        </div>
    </div>
    <!-- user links -->
    <div v-else>
      <div
        v-for="item in userLinks"
        :key="item.link"
        class="nav-item"
      >
        <DropdownLink
          v-if="item.type === 'links'"
          :item="item"
        />
        <NavLink
          v-else
          :item="item"
        />
      </div>
    </div>

    <!-- repo link -->
    <a
      v-if="repoLink"
      :href="repoLink"
      class="repo-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ repoLabel }}
      <OutboundLink />
    </a>
  </nav>
</template>

<script>
import Sticker from '@theme/components/Sticker.vue'
import DropdownLink from '@theme/components/DropdownLink.vue'
import { resolveNavLinkItem } from '../util'
import NavLink from '@theme/components/NavLink.vue'
let initTop
// get offset top
function getAbsoluteTop(dom) {
  return dom && dom.getBoundingClientRect
    ? dom.getBoundingClientRect().top +
        document.body.scrollTop +
        document.documentElement.scrollTop
    : 0
}
export default {
  name: 'NavLinks',
  components: {
    NavLink,
    DropdownLink,
    Sticker
  },
  data() {
    return {
      activeIndex: 0,
      // displayHeaders: []
    }
  },
  computed: {
    displayHeaders () {
      const { headers } = this.$page
      return Array.isArray(headers) ? headers.filter(h => h.level<3) : []
    },
    userNav () {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },
    nav () {
      const { locales } = this.$site
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path
        const routes = this.$router.options.routes
        const themeLocales = this.$site.themeConfig.locales || {}
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          ariaLabel: this.$themeLocaleConfig.ariaLabel || 'Select language',
          items: Object.keys(locales).map(path => {
            const locale = locales[path]
            const text = themeLocales[path] && themeLocales[path].label || locale.lang
            let link
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path)
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          })
        }
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },
    userLinks () {
      console.log('links: ', this.nav);
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },
    repoLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
      return null
    },
    repoLabel () {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }
      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }
      return 'Source'
    }
  },
  watch: {
    activeIndex() {
      const items = this.$refs.chairTocItem || []
      const dom = items[this.activeIndex]
      if (!dom) return
      const rect = dom.getBoundingClientRect()
      const wrapperRect = this.$el.getBoundingClientRect()
      const top = rect.top - wrapperRect.top
      if (top < 20) {
        this.$el.scrollTop = this.$el.scrollTop + top - 20
      } else if (top + rect.height > wrapperRect.height) {
        this.$el.scrollTop += rect.top - (wrapperRect.height - rect.height)
      }
    },
    $route() {},
  },
  mounted() {
    setTimeout(() => this.triggerEvt(), 1000)
    this._onScroll = () => this.onScroll()
    this._onHashChange = () => {
      const hash = decodeURIComponent(location.hash.substring(1))
      const index = (this.displayHeaders || []).findIndex(h => h.slug === hash)
      if (index >= 0) this.activeIndex = index
      const dom = hash && document.getElementById(hash)
      if (dom) window.scrollTo(0, getAbsoluteTop(dom) - 20)
    }
    window.addEventListener('scroll', this._onScroll)
    // window.addEventListener('hashchange', this._onHashChange);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this._onScroll)
    window.removeEventListener('hashchange', this._onHashChange)
  },
  methods: {
    onScroll() {
      if (initTop === undefined) {
        initTop = getAbsoluteTop(this.$el)
      }
      // update position
      const scrollTop =
        document.body.scrollTop + document.documentElement.scrollTop
      const headings = this.displayHeaders || []
      // change active toc with scrolling
      let i = 0
      const addLink = index => {
        this.activeIndex = index
      }
      for (; i < headings.length; i++) {
        const dom = document.getElementById(headings[i].slug)
        const top = getAbsoluteTop(dom)
        if (top - 50 < scrollTop) {
          addLink(i)
        } else {
          if (!i) addLink(i)
          break
        }
      }
    },
    triggerEvt() {
      this._onScroll()
      this._onHashChange()
    },
  },
}
</script>

<style lang="stylus">
.nav-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color var(--theme-accent-color)
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
    a
      overflow hidden
      text-overflow ellipsis
    &:first-child
      margin-left 0
  .repo-link
    margin-left 1.5rem
@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0
@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color var(--theme-foreground-color)
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
</style>