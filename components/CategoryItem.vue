<template>
  <div class="theme-main__inner">
    <div class="category-item" v-for="subject of $category.list" :key="subject.name">
      <h1 class="category__title">▪ {{subject.name}}</h1>
      <div class="post-list">
        <a class="post-list__item" :href="item.path" v-for="item in sortArticles(subject.pages)" :key="item.path">
          <span class="post-list__date">{{item.date}}</span>
          <span class="post-list__title">{{item.title}}</span>
        </a>
      </div>
    </div>
    <Pagination v-if="$pagination.length > 1"/>
  </div>
</template>
<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components';
export default {
  name: 'CategoryItem',
  components: {
    Pagination
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
.category-item
  background var(--theme-card-background)
  border-radius: 6px;
  padding: 2.15rem;
  margin-bottom: 2rem;
</style>