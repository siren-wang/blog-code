<template>
  <div class="theme-main__inner home">
    <div class="article-item myself">
      <!-- <img :src="require('assets/images/selfie.png')"> -->
      <video
        :src="require('assets/images/impression.mp4')"
        :poster="require('assets/images/shot.png')"
        autoplay
        muted
        loop
        playsinline
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
    <h1 class="block-title">Research</h1>
    <div class="experience" v-for="researchEntry in research" :key="index">
      <div class="experience__node">
        <div>{{ researchEntry.time }}</div>
        <div class="experience__title">{{ researchEntry.title }}</div>
      </div>
      <div class="experience__content">
        <div></div>
        <div>
          <div class="experience__content__subtitle">{{ researchEntry.subtitle }}</div>
          <ol class="tags-box" v-if="researchEntry.tasks">
            <span v-for="task in researchEntry.tasks" :key="index">{{ task }}</span>
          </ol>
        </div>
      </div>
    </div>
    <h1 class="block-title">Employment</h1>
    <div class="experience" v-for="employmentEntry in employment" :key="index">
      <div class="experience__node">
        <div>{{ employmentEntry.time }}</div>
        <div class="experience__title">{{ employmentEntry.title }}</div>
      </div>
      <div class="experience__content">
        <div></div>
        <div>
          <div class="experience__content__subtitle">{{ employmentEntry.subtitle }}</div>
          <ol class="tags-box" v-if="employmentEntry.tasks">
            <span v-for="task in employmentEntry.tasks" :key="index">{{ task }}</span>
          </ol>
        </div>
      </div>
    </div>
    <h1 class="block-title">My Blogs</h1>
    <div class="blog-area">
      <div class="annotation">
        <div class="title">I write <span>for myself</span></div>
        <div>To organize and reflect.</div>
        <div>I use writing as a tool to structure and arrange my thoughts and ideas, and to gain a deeper understanding of myself and the world.</div>
        <div class="count"><span class="important-number">{{ postCount }}</span>blog posts</div>
      </div>
      <SelectedPostList />
    </div>
    <div class="see-more" >
        <router-link :to="'/blogs/'">
        <div>See more</div>
        <div>Of my blogs</div>
        </router-link>
      </div>
    <AboutMe />
  </div>
</template>
<script>
import SelectedPostList from '@theme/components/Posts/SelectedPostList.vue';
import AboutMe from './components/AboutMe.vue'
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsPluginUTC)

const DATE_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export default {
  name: 'Home',
  components: {
    SelectedPostList,
    AboutMe
  },
  data() {
    return {
      projects: [
        {
          title: 'Low-code development Platform: Wolf',
          img: require('assets/images/wolf.png'),
          des: 'Wolf is a low-code development platform that is based on visual building, enabling users to create powerful business applications in just a few hours.',
          tasks: [
            'Integrating with AI-generated content techniques, we can quickly generate usable pages based on the requirements outlined in the copywriting.',
            'Provide continuous delivery through DevOps',
            'Pre-built templates and Cross-Platform Accessibility'
          ],
          tags: ['Low-Code', 'AI-Generated Content']
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
          des: 'Cyan MC (Cyan Mini Community) is a mini-program that operates within the WeChat ecosystem and can be used without the need for downloading or installation.',
          tasks: [
            'As Product Manager: I conducted user research, requirement analysis, feature planning, and prototype design.',
            'As Developer: I worked on page routing design, utilized vant-weapp components, implemented device compatibility, and designed data caching.'
          ],
          code: 'https://gitee.com/Siren_wang/cyan-mc',
          tags: ['Mobile Application']
        }
      ],
      experience: [
        {
          title: 'Data Science: Machine Learning and Natural Language Processing',
          subtitle: 'Lead Developer - Advisor: Dr. Patrick Houlihan, Columbia University',
          type: 'research',
          time: 'May 2022 - Jul 2022',
          tasks: [
            'Conducted research on analyzing the potential influence of reviews.',
            'Proposed a novel approach to predict sales by identifying the time lag of the interaction between reviews and sale fluctuations.',
            'Published a paper accepted by the 3rd International Conference on Signal Processing and Machine Learning (CONF-SPML 2023) as the lead author: “Predicting Product Sales Based on Sentiment Analysis Using Reviews: The Case of Amazon’s Kindle.”',
          ],
          tags: ['NLP', 'Time Series']
        },
        {
          title: 'AI-aided Medical System For Short Stature Diagnosis',
          subtitle: 'Developer - Advisor: Prof. Mengning Yang',
          type: 'research',
          time: 'Nov 2021 - Jun 2022',
          tasks: [
            'Applied deep learning techniques to assess the left hand-wrist radiographs of children for growth disorder diagnosis.',
            'Participated in the model training using attention-maps to identify the discriminative region for bone age expectation regression.',
            'Analyzed functional requirements, designed, and implemented a system for that purpose. Visit https://sirenar.github.io/graduate-project-baa',
          ],
          tags: ['Computer Vision', 'Data Visualization']
        },
        {
          title: 'LinkLocker: Smart Locker for Online Trading, Supported by a WeChat Mini Program',
          subtitle: 'Group Leader & Developer - Advisor: Prof. Mengning Yang',
          type: 'research',
          time: 'Sep 2019 - Dec 2020',
          tasks: [
            'Created a WeChat-based mini program that serves as a social platform for information sharing and second-hand goods sales, from ideation to application, by leading a team of eight developers.',
            'Led an eight-member team to design and build a smart locker; the locker is equipped with Bluetooth LE IoT sensors for secure, self-service item exchange, enabling password-protected access and eliminating waiting times.',
            'Won the First Prize Award in the Southwest Division Selection Tournament of the 13th iCAN International Contest of Innovation.',
            'Receive angel investment amounting to over 2 million RMB from investors including STO Express.',
            'Granted a patent for an innovative invention. Patent No.202021785066.3, Date of Grant: 2021.1',
          ],
          tags: ['Mobile Application', 'IoT programming']
        },
        {
          title: 'Graph Theory Application and Text Data Classification',
          subtitle: 'Participant - Advisor: Dr. Thomas Sauerwald',
          type: 'research',
          time: 'Jul 2019 - Aug 2019',
          tasks: [
            'Adopted a graph-based approach for contextual text normalization.',
            'Proposed a model – GRFEM (Gated Recurrent Feature Extraction Model) to encode-decode inputs and feed the neural network to normalize tokens.'
          ]
        },
        {
          title: 'Meituan',
          subtitle: 'Software Developer',
          type: 'employment',
          time: 'July 2022 - Present',
          tasks: [
            'Played a key role in the design and development of the cloud-based low-code development platform Wolf, a comprehensive online platform for building enterprise-level applications using low-code technology, and employed AIGC for user support.',
            'Implemented, maintained, and refactored Diting (諦聽), an internal CRM tool that enables frontline business analysts to perform self-service data retrieval and integration in drag-and-drop gestures, resulting in good user feedback.',
            'Migrated 6 existing projects to a comprehensive gateway for architecture upgrading, robustness, and scalability enhancement.'
          ]
        },
        {
          title: 'Meituan',
          subtitle: 'Front-End Developer | Internship',
          type: 'employment',
          time: 'May 2021 - Sep 2021',
          tasks: [
            'Assisted with the implementing of features in various projects, including user experience optimization and UI design enhancing.',
            'Coded adhering to latest standards and best practices, and engaged in the continuous delivery process.',
            'Performed timely troubleshooting and resolved technical issues.'
          ]
        },
        {
          title: 'Chongqing Xiantao Big Data Valley',
          subtitle: 'Knowledge Manager | Internship',
          type: 'employment',
          time: 'June 2020',
          tasks: [
            'Engaged in on-site research at an optical fiber manufacturing facility, contributing to the collection and processing of shop floor and manufacturing data utilizing a cloud platform and MES to facilitate the construction of data-driven decision-making models.',
            'Drafted a knowledge management planning proposal for knowledge sharing between projects.'
          ]
        }
      ]
    }
  },
  methods: {
    formateDate(val) {
      return dayjs
        .utc(val)
        .format(this.$themeConfig.dateFormat)
    },
  },
  computed: {
    postCount() {
      return this.$site.pages.length
    },
    research() {
      return this.experience.filter(entry => entry.type === 'research');
    },
    employment() {
      return this.experience.filter(entry => entry.type === 'employment');
    }
  },
}
</script>
<style lang="stylus">
.home
  display flex
  flex-direction column
  align-items center
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
    line-height: 1.2;
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
  margin-top: 40px;
  margin-bottom: 40px;
  text-transform: uppercase;
  &:before
    content: '';
    background-color: var(--theme-accent-color);
    position: absolute;
    left: 50%;
    top: 100%;
    width: 80px;
    height: 3px;
    transform: translateX(-50%);

.project
  display: flex;
  line-height: 1.5;
  margin-bottom: 20px;
  .article-item
    width: 40%;
    cursor: pointer;
    max-height: 400px;
    text-align: center;
    img
      border-radius 6px
  .project-brief
    margin: 0 5%;
    flex: 1;
    h2
      text-transform: capitalize;
    div, span
      white-space: pre-wrap;
.project, .experience
  .tags-box
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 12px;
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

.experience
  &__node
    display: flex;
    align-items: center;
    > div:first-child
      flex: 0 0 220px;
      text-align: end;
      padding-right: 30px;
      position: relative;
      &:after
        content: '';
        background-color: var(--theme-accent-color);
        position: absolute;
        top: calc(50% - 3.5px);
        right: -3px;
        height: 7px;
        width: 7px;
        border-radius: 50%;
  &__title
    flex: 1;
    font-weight: bold;
    font-size: 18px;
  &__content
    display: flex;
    > div:first-child
      flex: 0 0 220px;
      margin: 10px 0;
      border-right: 1px solid #f2f2f2;

    &__subtitle
      line-height: 30px;
      color: var()

    .tags-box 
      padding-left: 0;
      span:not(last-child)
        margin-bottom: 8px;
  &__title, &__content > div:not(first-child)
    padding-left: 30px;

.blog-area .annotation
  position relative
  .title
    font-size: 2rem;
    margin-top: 6vw;
    font-weight: bold;
    & + div
      font-size: 1.8rem;
      opacity: 0.6;
      margin-top: 0.4rem;
      font-weight: bold;
    & + div + *
      margin-top: 1.6rem;
      opacity: 0.8;
  span
    color: var(--theme-accent-color);
  .count
    margin: 2rem;
    font-size: 1.8rem;
    .important-number
      font-size: 3rem;
      margin-right: 6px;
.see-more
  text-align center
  cursor pointer
  padding 10px
  border-radius 8px
  &:hover, a:hover
    background var(--theme-accent-color)
    color: white
    font-weight bold
    a:visited
      color: white


@media (min-width: $MQNarrow) 
  .blog-area
    display: flex;
    justify-content: space-between;
    .article-list
      flex: 1;
      .article-item
        height: 8vw;
        .article-cover
          transform: translateY(-26%);
          blockquote
            display: none;
    .annotation
      flex: 1;
      .title
        font-size: 2.8rem;
        & + div
          font-size: 2rem;
        & + div + *
          font-size: 1.2rem;
          padding-right: 100px;
      > div:last-child
        font-size: 1.8rem;
  .see-more
    margin-top -100px
    margin-right 200px
    z-index 10
  
@media (max-width: $MQNarrow)
  .project, .block-title
    display: block;
    .article-item
      width: 100%;
      margin: 0 !important;
      
  .home > *
    margin: 1rem;
    :not(.article-list) .article-item
      width: 100%;
      margin: 0 !important;


</style>