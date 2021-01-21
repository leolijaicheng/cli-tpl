<template>
  <div id="app">
    <h1 v-for="(item, index) in 5" :key="index" class="app-item">
      app {{ item }}
    </h1>

    <HelloWorld />

    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './component/HelloWorld'
import './app.css'
export default {
  components: { HelloWorld },
  mounted() {
    console.log('enter!!')
  }
}
</script>

<style lang="less" scoped>
#app {
  color: #ff0000;
  font-size: 24px;
}
</style>
