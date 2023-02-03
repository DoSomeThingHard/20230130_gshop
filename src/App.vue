<template>
  <div class="app">
    <router-view />
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {mapActions} from 'vuex'
export default {
  name: "App",
  data() {
    return {
    };
  },
  components:{
    FooterGuide
  },
  methods: {
    ...mapActions('loginOptions',['getUserInfo'])
  },
  mounted() {
    console.log(this.$store)
    this.$store.dispatch('msiteOptions/getAddress')
    this.getUserInfo()
  },
  beforeDestroy() {
  },
};
</script>
<style lang='stylus' rel="stylesheet/stylus">
  .app
   width: 100%
   height: 100%
   background: #f5f5f5
</style>