<template>
    <div class="theme-main__inner blog">
        <div class="article-list">
            <div class="article-item" v-for="item in $pagination.pages" :key="item.path">
                <PostEntry :info="item" />
            </div>
        </div>
        <Pagination v-if="$pagination.length > 1"/>“
    </div>
</template>
<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components';
import PostEntry from '@theme/components/Posts/Post/PostEntry.vue';
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsPluginUTC)

export default {
    name: 'BlogsPage',
    components: {
        PostEntry,
        Pagination
    },
}
</script>
<style lang="stylus">

</style>