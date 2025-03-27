import axios from 'axios'

const api = axios.create({ 
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})


export const testApiConnection = async () => {
  try {
    const response = await api.get('/');
    console.log('API 연결 성공:', response.status);
    return {
      success: true,
      status: response.status,
      message: 'API 서버에 연결되었습니다.'
    };
  } catch (error) {
    console.error('API 연결 실패:', error);
    return {
      success: false,
      message: '백엔드 서버에 연결할 수 없습니다. 네트워크 연결을 확인하세요.'
    };
  }
};

// api.interceptors.request.use((config) => {
//   // const token = useAuthStore.getState().accessToken
//   // if (token) {
//   //   config.headers.Authorization = `Bearer ${token}`
//   // }
//   config.headers.Authorization = `Bearer blah blah blah`
//   return config
// })

export default api