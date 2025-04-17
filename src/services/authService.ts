import axios from 'axios';

// API 기본 URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// 회원가입 사용자 데이터 타입
export interface SignupData {
  userId: string;
  email: string;
  password: string;
  gender: string;
  agreeToTerms: boolean;
}

// API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  exists?: boolean;
}

/**
 * 회원가입 API 요청
 */
export const signup = async (userData: SignupData): Promise<any> => {
  try {
    const response = await axios.post<ApiResponse<any>>(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    // 서버 오류 응답이 있는 경우
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    
    // 기타 오류
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
};

/**
 * 이메일 중복 확인 API 요청
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.post<ApiResponse<{ exists: boolean }>>(`${API_URL}/auth/check-email`, { email });
    return !!response.data.exists;
  } catch (error) {
    // 오류가 발생하면 true를 반환하여 중복으로 처리 (안전한 접근)
    return true;
  }
};

/**
 * 아이디 중복 확인 API 요청
 */
export const checkUserIdExists = async (userId: string): Promise<boolean> => {
  try {
    const response = await axios.post<ApiResponse<{ exists: boolean }>>(`${API_URL}/auth/check-userid`, { userId });
    return !!response.data.exists;
  } catch (error) {
    // 오류가 발생하면 true를 반환하여 중복으로 처리 (안전한 접근)
    return true;
  }
}; 