<template>
  <router-link :to="info.path">
    <div v-if="info.frontmatter.cover" :style="{backgroundImage: `url(${info.frontmatter.cover})`}" class="article-cover">
        <div class="article-title-wrapper">
        <h1>{{info.title}}</h1>
        <div v-html="info.excerpt"></div>
        <footer class="article-meta">
            <span><i class="icon-calendar"></i>{{formateDate(info.frontmatter.date)}}</span>
        </footer>
        </div>
    </div>
    <div v-else>
        <h3 class="article-title">
        <router-link :to="info.path">{{info.title}}</router-link>
        </h3>
        <div class="article-desc" v-html="info.excerpt"></div>
        <footer class="article-meta">
        <span><i class="icon-calendar"></i>{{formateDate(info.frontmatter.date)}}</span>
        </footer>
    </div>
  </router-link>
</template>
<script>
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsPluginUTC)

export default {
  name: 'PostEntry',
  props: {
    info: {},
  },
  methods: {
    formateDate(val) {
      return dayjs
        .utc(val)
        .format(this.$themeConfig.dateFormat)
    }
  }
}
</script>
<style lang="stylus">
.article-info
  display: block;
  overflow: hidden;
  margin-bottom: 1.75rem;
  border-radius: 6px;
  background var(--theme-card-background)
  box-shadow var(--theme-card-boxshadow)
  &:hover
    box-shadow var(--theme-card-boxshadow-hover)
  .article-cover
    height 300px;
    // overflow hidden;
    background-size cover;
    background-position center;
    position relative;
    z-index 1;
    &:after
      content: '';
      background-color: rgba(0,0,0,0.38)
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
    .article-title-wrapper
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index 10;
      height: 100px;
      margin: auto;
      color: white;
      text-align: center;
      &:hover
        box-shadow 0 2px 12px 0 rgba(0 0 0 0.6)
        h1
          text-shadow: 0 0 8px #ccc, 0 0 8px #ccc;
      h1
        text-transform: uppercase;
        font-weight: 700;
      blockquote
        border-left none;
        color: white;
.article-title
  margin 0
  a
    display: block;
    padding: 1.5rem 1.5rem 0;
    transition: color .15s;
.article-desc
  padding: 0 1.5rem;
  opacity: .8;
  a
    border-bottom: 1px dotted;
    transition: color .15s,border-color .15s,opacity .15s;
.article-meta
  margin: 1em 1.5rem 0;
  padding-bottom: 1.5rem;
  opacity: .63;
  [class^="icon-"]
    margin-right 0.4rem
</style>