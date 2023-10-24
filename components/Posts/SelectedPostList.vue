<template>
  <div class="article-list">
    <div class="article-item" v-for="(post, index) in selectedPosts" :key="index">
      <PostEntry :info="post" />
    </div>
  </div>
</template>
<script>
import PostEntry from './Post/PostEntry.vue'
export default {
  name: 'SelectedPostList',
  components: {
    PostEntry,
  },
  computed: {
    selectedPosts() {
      return this.$site.pages
        .filter(page => page.frontmatter.selected)
        .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
    },
  },
}
</script>
<style lang="stylus">

</style>