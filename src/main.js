import Vue from 'vue'
import App from './App.vue'
import ZhjTable from './lib/zhj-table'

Vue.config.productionTip = false

Vue.use(ZhjTable)

new Vue({
  render: h => h(App),
}).$mount('#app')
