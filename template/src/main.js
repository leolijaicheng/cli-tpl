const { component } = require("vue/types/umd")
const { template } = require("lodash")

{{#if_eq build "standalone"}}
// The vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.js with an alias
{{/if_eq}}

import 'core-js'
import 'regenerator-runtime'
import Vue from 'vue'
import App from './App.vue'
{{#vuex}}
import store from './stroe'
{{/vuex}}
{{#router}}
import router from './router'
{{/router}}


const app = new Vue({
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build "standalone"}}
  component:{ App },
  template:"<App/>"
  {{/if_eq}}
  {{#if_eq build "runtime"}}
  render: (h) => h(App)
  {{/if_eq}}
})

app.$mount('#app')
