<template>
  <div class="theme-main__inner post">
    <article
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <header v-if="$frontmatter.cover" :style="headerStyle" class="article__header--hasCover">
        <div class="article__header-con">
          <PostMeta
            class="post-meta--hasCover"
            :cates="$frontmatter.category || $frontmatter.categories"
            :author="$frontmatter.author"
            :date="$frontmatter.date"
            :location="$frontmatter.location"
          />
          <hr class="article-hr"/>
          <h1 class="post-title" itemprop="name headline">
            {{ $frontmatter.title }}
          </h1>
        </div>
      </header>
      <header v-else class="article__header">
        <h1 class="post-title" itemprop="name headline">
            {{ $frontmatter.title }}
          </h1>
          <PostMeta
            :cates="$frontmatter.category || $frontmatter.categories"
            :author="$frontmatter.author"
            :date="$frontmatter.date"
            :location="$frontmatter.location"
          />
      </header>
      <div class="article-con">
        <Content class="article-content copy-code-enabled" itemprop="articleBody" />
        <div class="article-copyright">
          <ul>
            <li class="article-copyright__item">
              <strong class="article-copyright__title">Last-updated: </strong>
              <span class="article-copyright__text">{{$page.lastUpdated}}</span>
            </li>
            <!-- <li class="article-copyright__item">
              <strong class="article-copyright__title">Copyright<span>:</span></strong>
              <p class="article-copyright__text">自由转载-非商用-禁止演绎-保持署名（<a href="http://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh">CC
                  BY-NC-ND 4.0</a>）</p>
            </li> -->
            <li class="article-copyright__item">
              <strong class="article-copyright__title">Link: </strong>
              <span class="article-copyright__text"><a :href="pageLink"
                  :title="$page.title">{{pageLink}}</a></span>
            </li>
          </ul>
        </div>
        <Reward v-if="isShowReward"/>
      </div>
      <div class="article-footer">
        <PostTag v-if="$frontmatter.tags" :tags="$frontmatter.tags" />
        <PostNav/>
        <Comments/>
      </div>
    </article>
  </div>
</template>

<script>
import PostTag from '@theme/components/Posts/Post/PostTag.vue'
import PostMeta from '@theme/components/Posts/Post/PostMeta.vue'
import PostNav from '@theme/components/Posts/Post/PostNav.vue'
import Reward from '@theme/components/Reward.vue'
import Comments from '@theme/components/Comments.vue'

export default {
  name: 'Post',
  components: {
    PostTag,
    PostMeta,
    Comments,
    PostNav,
    Reward
  },
  computed: {
    isShowReward() {
      console.log('this.$themeConfig', this.$themeConfig);
      if (this.$frontmatter.reward === false) {
        return false;
      }
      return this.$themeConfig.reward.enable
    },
    headerStyle() {
      if (!this.$frontmatter.cover) return;
      return {
        'background-image': `url(${this.$frontmatter.cover})`, 
        'background-color': this.$frontmatter.coverBgColor
      }
    },
    pageLink() {
      console.log('$page.lastUpdated', this.$page.lastUpdated);
      return `${this.$themeConfig.hostname}${this.$page.path}`;
    }
  }
}
</script>

<style lang="stylus">
.post
  background var(--theme-card-background) 
  border-radius: 6px;
  line-height 1.8
  color var(--theme-foreground-color)
  box-shadow: var(--theme-card-boxshadow)
  // font-family: Monaco,Consolas,andale mono,dejavu sans mono,monospace
  // font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  font-family: Verdana, sans-serif, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  h2
    font-size: 2.2rem;
    border-bottom: 1px solid var(--theme-h2-decorate);
  h3
    font-size: 1.8rem;
    margin: 3rem 0 1rem;
  h4
    font-size: 1.2rem;
  h5
    font-weight bold;
  mark
    background-color #fbb972;
    padding: 0.2em;
    border-radius: 3px;
  p, li
    font-size: 1.2rem;
  h2, h4, h5, h6
    margin: 2rem 0 1rem;
    font-weight: 700;
  code
    font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
  img
    width: auto;
    max-width: 90%;
    margin-left: 5%;
    border-radius: 10px;
.article-content
  overflow-x: scroll;
  a
    // border-bottom: 1px dotted;
    transition: color .15s,border-color .15s,opacity .15s;
.article__header
  .post-title
    padding: 4.4rem 2.15rem 2.15rem;
    margin 0;
    font-size: 2rem;
  .post-meta
    padding: 0px 2.15rem;
    line-height: 3;
    background-color: var(--theme-accent-color-01);
.article__header--hasCover
  border-radius: 6px;
  padding-top: 37%;
  background-position: 50% center;
  background-size: cover;
  color: rgb(255, 255, 255);
  position relative;
  &:after
    z-index 1
    content ''
    background-color: rgba(64,64,64,.28);
.article__header-con
  padding: 2.5rem 2.15rem 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
.article-copyright
  display: block;
  margin: 2rem 0;
  padding: 1rem 1.5rem;
  background-color: var(--theme-accent-color-005);
  border-left: 3px solid var(--theme-accent-color);
  border-radius: 3px;
  word-break: break-word;
  line-height: 1.8;
.article-overlay
  position: absolute;
  top: 0;
  left: 0;
  background-position: 50% center;
  background-size: cover;
  ul
    margin 0
    padding-left 0
  &__item
    display flex
    line-height 2
    align-items flex-start
    span
      margin: 0 .6em 0 .2em;
    p
      line-height 2
      margin 0
  &__title
    height 2em
    white-space nowrap
.article-con
  padding: 0.80625rem 2.15rem 2.15rem;
.article-footer
  padding: 0 2.15rem;
  border-color: var(--theme-border-color);
  .vssue
    padding: 10px 0;
.article-hr
  margin: .7rem 0 1rem;
  height: 2px;
  border: 0;
  background: #fff;
  opacity: .5;
  animation: .4s both;
  animation-name: line-scale;
.footnote-ref a
  &:link, &:visited
    color var(--theme-accent-color)!important
abbr
  cursor help

html.light 
  .post
    mark
      color: white;

@media (max-width: $MQMobile)
  .post-title
    margin-top 0
:root
  .dark
    a
     color: var(--theme-accent-color);
  .post
    .article-content
      a
        color: var(--theme-accent-color);
</style>