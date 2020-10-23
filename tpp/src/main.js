// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入公共样式
import  '@/assets/css/common.css'
//引入字体图标样式
import  '@/assets/fonts/iconfont.css'

//引入axios
import axios from "axios";
//把axios绑定在vue原型上
Vue.prototype.axios = axios;

//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false

//定义总线
const Bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data : {
    Bus
  },
  components: { App },
  template: '<App/>'
})
