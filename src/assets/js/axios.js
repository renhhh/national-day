import axios from 'axios'
import qs from 'qs'

// 超时设置
const http = axios.create({
  timeout: 10000,
  baseURL: 'https://api.test.bluetopo.cn:8212',
  // headers:{
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
})

// http request 拦截器
http.interceptors.request.use(
  config => {
    // if (config.method === 'post') {
    //   console.log('[ config ] >', config)
    //   config.data = qs.stringify({...config.data})
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default http
