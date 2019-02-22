//引入axios
import axios from 'axios';
// 引入 qs
import qs from 'qs';
// 调用axios中的方法保存一个默认的地址
axios.defaults.baseURL="http://172.16.9.3:9999";

// 封装get方法 和 post方法
export default {
    get (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    },
    post (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }
}
