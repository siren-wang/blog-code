<template>
  <div class="theme-main__inner">
    <div class="category" v-for="subject of $category.list" :key="subject.name">
      <div class="category__title">
        <h1>{{subject.name}}</h1>
      </div>
      <div class="post-list">
        <a class="post-list__item" :href="item.path" v-for="item in sortArticles(subject.pages)" :key="item.path">
          <span class="post-list__date">{{item.date}}</span>
          <span class="post-list__title">{{item.title}}</span>
        </a>
      </div>
    </div>
    <!-- <Pagination v-if="$pagination.length > 1"/> -->
  </div>
</template>
<script>
// import { Pagination } from '@vuepress/plugin-blog/lib/client/components';
export default {
  name: 'Category',
  components: {
    // Pagination
  },
  methods: {
    sortArticles(list) {
      list.forEach(item => { item.date = `${new Date(item.frontmatter.date).toLocaleDateString()}` })
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
      return list;
    }
  },
}
</script>
<style lang="stylus">
.category
  background var(--theme-card-background)
  border-radius: 6px;
  padding: 2.15rem;
  margin-bottom: 2rem;
  box-shadow: var(--theme-card-boxshadow);
  &__title
    position relative
    line-height 60px
    z-index 1
    h1
      display inline
      z-index 10
      padding-right 12px
      background-color var(--theme-card-background)
    &:before
      content: ''
      background-color var(--theme-accent-color)
      position absolute
      left -2.15rem
      top 12px
      width 12px
      height 24px
    &:after
      z-index -1
      content ''
      position absolute
      right 2.15rem
      left 2.15
      top 24px
      height 1px
      width 95%
      background-color var(--theme-border-color)
</style>