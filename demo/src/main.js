//  引入Vue
import Vue from 'vue'

// 引入 ElementUI的组件  
import ElementUI from 'element-ui'
// 和  样式
import 'element-ui/lib/theme-chalk/index.css'

//  引入顶级组件 App.vue
import App from './App.vue'

//  引入路由
import router from './router'

//引入公共样式
import '@/styles/common.less'

//  使用elementui
Vue.use(ElementUI)

//  阻止生产提示
Vue.config.productionTip = false

// 创建vue实例对象 挂载dom 把路由 和 app顶级组件传入 渲染进入dom容器中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
