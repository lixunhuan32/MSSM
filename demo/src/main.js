//  引入Vue
import Vue from 'vue'

// 引入 ElementUI的组件  
import ElementUI from 'element-ui'
// 和  样式
import 'element-ui/lib/theme-chalk/index.css';

import { Message } from 'element-ui';

//引入axios
import axios from 'axios';
Vue.prototype.axios=axios;

axios.defaults.baseURL = "http://127.0.0.1:9999";
//  全局路由守卫，拦截所有路由
router.beforeEach((to,from,next)=>{ // 全局路由守卫，拦截所有路由
  // 获取token
  const token =window.localStorage.getItem('token');
  if(token){ //如果有token令牌放行
    next();
  }else{
    if(to.path==='/login'){ 
      next()
    }else{
      // 如果去的是其他页,跳转到登录页
      Message.error('请登录以后再操作！')

      return next({"path":"/login"}) //如果没有令牌token就跳转到登陆页
    }
  }
});
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
