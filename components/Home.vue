<template>
  <div class="theme-main__inner home">
    <div class="article-item myself">
      <!-- <img :src="require('assets/images/selfie.png')"> -->
      <video
        ref="myVideo"
        :poster="poster"
        :src="require('assets/images/impression.mp4')"
        autoplay
        defaultMuted
        loop
      ></video>
      <div class="welcome-phrase">
        <div>Hey, I'm <span>Siren.</span></div>
        <div>Glad to have you here.</div>
        <div class="notes">I'm a <span>front-end developer</span> based in Chengdu, China. 
        </div>
      </div>
    </div>
    <h1 class="block-title">Projects Made</h1>
    <div class="project" v-for="project in projects" :key="index">
      <div class="article-item">
        <a :href="project.url || project.code" target="_blank">
          <img :src="project.img">
        </a>
      </div>
      <div class="project-brief">
        <h2>{{ project.title }}</h2>
        <span>{{ project.des }}</span>
        <ul class="tags-box" v-if="project.tasks">
          <li v-for="task in project.tasks" :key="index">{{ task }}</li>
        </ul>
        <div class="tags-box">
          <div v-for="tag in project.tags" :key="index">{{ tag }}</div>
        </div>
        <div class="visit" v-if="project.url">
          <a :href="project.url" target="_blank">Visit it ></a>
        </div>
        <div class="visit" v-if="project.code">
          <a :href="project.code" target="_blank">See Code ></a>
        </div>
      </div>
    </div>
    <div class="article-list">
      <div class="article-item" v-for="item in $pagination.pages" :key="item.path">
        <router-link :to="item.path">
          <div v-if="item.frontmatter.cover" :style="{backgroundImage: `url(${item.frontmatter.cover})`}" class="article-cover">
            <div class="article-title-wrapper">
              <h1>{{item.title}}</h1>
              <div v-html="item.excerpt"></div>
              <footer class="article-meta">
                <span><i class="icon-calendar"></i>{{formateDate(item.frontmatter.date)}}</span>
              </footer>
            </div>
          </div>
          <div v-else>
            <h3 class="article-title">
              <router-link :to="item.path">{{item.title}}</router-link>
            </h3>
            <div class="article-desc" v-html="item.excerpt"></div>
            <footer class="article-meta">
              <span><i class="icon-calendar"></i>{{formateDate(item.frontmatter.date)}}</span>
            </footer>
          </div>
        </router-link>
      </div>
    </div>
    <Pagination v-if="$pagination.length > 1"/>
  </div>
</template>
<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components';
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsPluginUTC)

const DATE_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export default {
  name: 'Home',
  components: {
    Pagination
  },
  data() {
    return {
      projects: [
        {
          title: 'Low-code development Platform: Wolf',
          img: require('assets/images/wolf.png'),
          des: 'Wolf is a low-code platform that is based on visual building, enabling users to create powerful business applications in just a few hours.',
          tasks: [
            'Integrating with AI-generated content techniques, we can quickly generate usable pages based on the requirements outlined in the copywriting.',
            'Provide continuous delivery through DevOps',
            'Pre-built templates and Cross-Platform Accessibility'
          ],
          tags: ['AI-Generated Content', 'Low-Code']
        },
        {
          title: 'Medical system for short stature diagnosis',
          img: require('assets/images/medicalDashboard.png'),
          des: 'The system is designed to help healthcare providers identify the underlying cause of short stature and develop an appropriate treatment plan to help the person achieve their full growth potential.',
          url: 'https://sirenar.github.io/graduate-project-baa/',
          tags: ['Computer Vision', 'Attention Map', 'Data Visualization']
        },
        {
          title: 'Mini-Program: Cyan MC',
          img: require('assets/images/miniprogram.jpg'),
          des: 'Cyan MC is a mini-program that operates within the WeChat ecosystem and can be used without the need for downloading or installation.',
          tasks: [
            'As Product Manager: I conducted user research, requirement analysis, feature planning, and prototype design.',
            'As Developer: I worked on page routing design, utilized vant-weapp components, implemented device compatibility, and designed data caching.'
          ],
          code: 'https://gitee.com/Siren_wang/cyan-mc',
          tags: ['Mobile Application']
        }
      ]
    }
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
.article-item
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

.myself
  display: inline-flex;
  position relative;
  // &:after, .welcome-phrase
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  // &:after
  //   content: '';
  //   background: rgba(0, 0, 0, .5);
  .welcome-phrase
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 4vw;
    font-weight: 800;
    color: white;
    font-family: var(--theme-font-logo);
    padding: 0 10%;
    transition: opacity 1s cubic-bezier(0.25,0.1,0.25,1);
    span
      color: var(--theme-accent-color);
    .notes
      font-size: 1.5vw;
      font-weight: 800;
      color: #ddd
      margin-top: 12px;
      font-family: var(--theme-font-heading);
    &:hover
      opacity: 0;
      
  video
    width: 100%;

h1.block-title
  position: relative;
  padding-left: 30px;
  &:before
    content: '';
    background-color: var(--theme-accent-color);
    position: absolute;
    left: 0;
    top: 50%;
    width: 12px;
    height: 24px;
    transform: translateY(-50%);

.project
  display: flex;
  line-height: 1.5;
  margin-bottom: 20px;
  .article-item
    width: 40%;
    cursor: pointer;
    max-height: 400px;
    text-align: center;
  .project-brief
    margin: 0 5%;
    flex: 1;
    white-space: pre-wrap;
    h2
      text-transform: capitalize;
  .tags-box
    display: flex;
    flex-wrap: wrap;
    div
      padding: 2px 10px;
      background: var(--theme-accent-color-02);
      border-radius: 4px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      margin: 12px 8px 0;
      &:hover
        background: var(--theme-accent-color-04)
  .visit a
    color: var(--theme-accent-color) !important;
    font-weight: 800;
  
@media (max-width: $MQMobile)
  .project, .block-title
    display: block;
    margin: 1rem;
    .article-item
      width: 100%;
      margin: 0 !important;
</style>