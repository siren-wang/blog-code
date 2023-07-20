<template>
  <div class="about-me">
      <div class="img-container">
        <img :src="require('assets/images/selfie.png')">
      </div>
      <div class="about-my-info">
        <div>- A little story about me</div>
        <!-- <div class="chinese">王欣茹</div> -->
        <div class="title">I Am <span>Xinru Wang</span></div>
        <div>{{ selfIntroduction }}</div>
        <div class="info-box">
          <div class="info">Birthday: January 12th, 2000</div>
          <div class="info">Email: siren.xrw@gmail.com</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'AboutMe',
  components: {

  },
  data() {
    return {
      selfIntroduction: `I grew up in the beautiful city of Hangzhou, China. I have always been someone who loves a good challenge and enjoys learning new things. That's why I have decided to pursue my studies abroad.
I'm also a foodie and a travel enthusiast. I believe that food is not just about nourishment, but also a way to experience cultures and connect with people.
I really look forward to embark on a new journey and start exploring!`
    }
  },
}
</script>
<style lang="stylus">
.about-me
  display: flex
  align-items center
  background #f8f8f8
  border-radius 8px
  margin 60px 0
  padding 30px
  .img-container
    flex: 1
    text-align center
    img
      width 50%
      transition all .2s ease
      cursor pointer
      &:hover
        filter: drop-shadow(var(--theme-card-boxshadow-hover))

  .about-my-info
    flex: 1
    margin-left 20px
    > div:first-child
      opacity 0.6
      // font-size 10px
    span
      color: var(--theme-accent-color);
    .title
      font-size 2rem
      font-weight bold
      margin 14px 0
      & + div
        white-space pre-wrap
    .info-box
      margin-top 12px
      display flex
      flex-wrap wrap
      .info
        margin-right 40px

html.dark .about-me
  background var(--theme-card-background)

@media (max-width: $MQNarrow)
  .about-me
    display block
    .img-container
      margin-bottom 30px
</style>