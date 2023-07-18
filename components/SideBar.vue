<template>
  <div class="theme-sidebar">
    <div class="theme-sidebar__inner">
      <div class="theme-header">
        <ul class="floating-squares">
          <li
            v-for="(item, index) in 10"
            :key="index"
          ></li>
        </ul>
        <RouterLink class="theme-header__logo" to="/">
          <img
            draggable="false"
            class="theme-header__picture"
            :src="$themeConfig.logo"
            alt="logo"
            width="160"
            height="160"/>
          <ThemePalette v-if="$themeConfig.palette"/>
        </RouterLink>
        <RouterLink class="theme-header__name" to="/">
          {{$site.title}}
        </RouterLink>
        <p class="theme-header__slogan">{{$site.description}}</p>
      </div>
      <SubNav/>
      <Navbar/>
      <FooterBar/>
    </div>
  </div>
</template>
<script>
import FooterBar from '@theme/components/FooterBar.vue'
import Navbar from '@theme/components/Navbar.vue'
import SubNav from '@theme/components/SubNav.vue'
import ThemePalette from '@theme/plugin/theme-palette/ThemePalette.vue'
export default {
  name: 'SideBar',
  components: {
    SubNav,
    Navbar,
    FooterBar,
    ThemePalette
  },
}
</script>
<style lang="stylus">
// sidebar
.theme-sidebar
  position fixed
  top 0
  bottom 0
  left 0
  &__inner
    display: flex;
    flex-direction column
    align-content: flex-start
    margin-right -1rem
    padding-right 1rem
    box-sizing content-box
    width $sidebarWidth
    height: 100%;
    overflow-y auto
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
}
.theme-header
  margin: 1rem 1rem 1em;
  border-radius: 6px;
  text-align: center;
  background var(--theme-card-background)
  box-shadow var(--theme-card-boxshadow)
  display: inline-block;
  position: relative;
  .floating-squares
    position: absolute;
    top: -14px;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0.08;
    li
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background-image: linear-gradient(to right, #f6b265, #8837a5, #839dc7, #ec7c7f,  #f6b265);
      background-size: 400%;
      animation: floating 25s linear infinite, run 30s linear 0s infinite;;
      bottom: -150px;
      &:nth-child(1)
        left: 25%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      &:nth-child(2)
        left: 10%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      &:nth-child(3)
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      &:nth-child(4)
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      &:nth-child(5)
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      &:nth-child(6)
        left: 75%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
      &:nth-child(7)
        left: 35%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
      &:nth-child(8)
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      &:nth-child(9)
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      &:nth-child(10)
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;

  &__logo
    position relative
    display: inline-block;
    margin-top: 2.4rem;
    &:hover
      .theme-palette
        display flex 
    .theme-palette
      position: absolute;
      bottom: 20px;
      left : 100px;
  &__picture
    padding: 2px;
    width: 8rem;
    height: 8rem;
    border: 1px solid var(--theme-border-color);
    border-radius: 50%;
    // border-color rgb(75, 75, 75);
    vertical-align: bottom;
    box-sizing content-box
    @media (any-hover hover)
        &:hover
          border-color rgb(120,120,120)
  &__name
    font-family: var(--theme-font-logo);
    text-transform: capitalize;
    font-weight: 800;
    display block;
    margin: 1.5rem;
    padding: 0 30px;
    font-size: 1.714285rem;
    transition: color .15s;
    position: relative;
    background-image: linear-gradient(to right, #f6b265, #8837a5, #839dc7, #ec7c7f,  #f6b265);
    background-size: 400%;
    -webkit-background-clip: text;
    color: transparent;
  &:hover
    .theme-header__name
      -webkit-animation: run 30s linear 0s infinite;
      animation: run 30s linear 0s infinite;
  &__slogan
    padding: 0 1.6rem 1rem;
    line-height: 1.5;
    opacity: .63;
  @keyframes run { 
    100% { background-position: 400% 0px; } 
  }

  @keyframes floating {
    0%{
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100%{
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }
  }

</style>