<template>
  <div id="app" class="main-content">
    <h1 v-for="(item, index) in 5" :key="index" class="app-item">
      app {{ item }}
    </h1>

    {{#router}}
    <router-view></router-view>
    {{else}}
    <HelloWorld />
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import HelloWorld from './component/HelloWorld'
{{/unless}}
import './app.css'
export default {
  {{#unless router}}
  components: { HelloWorld },
  {{/unless}}
  mounted() {
    console.log('enter!!')
  }
}
</script>

<style lang="less" scoped>
.main-content {
  color: #f00;
  font-size: 24px;
}
</style>
