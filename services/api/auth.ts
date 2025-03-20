import axios from 'axios';

interface LoginRequest {
  id: string;
  password: string;
}

interface SignupRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
}

// API 기본 설정
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃 설정
  withCredentials: false // CORS 이슈 해결을 위해 credentials 비활성화
});

/**
 * 로그인 API 호출
 */
export const login = async (data: LoginRequest): Promise<any> => {
  try {
    const response = await fetch('/api/proxy/customer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '로그인에 실패했습니다.');
    }

    return response.json();
  } catch (error) {
    console.error('로그인 API 오류:', error);
    throw error;
  }
};

/**
 * 개발 환경용 임시 로그인 (백엔드 연결 실패 시)
 */
export const devLogin = (id: string, password: string): boolean => {
  return id === "aaa" && password === "bbb";
};

/**
 * 서버 연결 상태 확인
 */
export const checkServerStatus = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('http://localhost:8000/', { 
      timeout: 3000 
    });
    console.log('서버 연결 성공:', response.status);
    return true;
  } catch (error) {
    console.warn('서버 연결 확인 실패:', error);
    return false;
  }
};

/**
 * 회원가입 API 호출
 */
export const signup = async (data: SignupRequest): Promise<any> => {
  try {
    // 서버 연결 상태 확인
    await checkServerStatus();
    
    const response = await apiClient.post('http://localhost:8000/api/customer/create', data);
    console.log('회원가입 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('회원가입 오류:', error);
    throw error;
  }
}; 