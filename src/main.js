import Vue from 'vue'
import App from './App.vue'

import './styles/index.scss'
import './styles/loop.scss'
import './plugins'
import './filter'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
