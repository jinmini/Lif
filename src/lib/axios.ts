import axios from 'axios'


const api = axios.create({ //axios 인스턴스 생성, 기본 설정 정의, Metadata 정의
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// api.interceptors.request.use((config) => {
//   // const token = useAuthStore.getState().accessToken
//   // if (token) {
//   //   config.headers.Authorization = `Bearer ${token}`
//   // }
//   config.headers.Authorization = `Bearer blah blah blah`
//   return config
// })

export default api