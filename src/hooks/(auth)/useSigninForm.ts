import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/axios'; 
import { useUserStore, useAuthStore } from '@/store';

interface SigninFormState { 
  id: string;
  password: string;
  error: string;
  success: string;
  isLoading: boolean;
}

export const useSigninForm = () => { 
  const router = useRouter();
  const { setUserId, updateEmail, updateName } = useUserStore();
  const signin = useAuthStore(state => state.signin);
  
  const [formState, setFormState] = useState<SigninFormState>({ 
    id: '', 
    password: '', 
    error: '',
    success: '',
    isLoading: false
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formState.id || !formState.password) {
      setFormState(prev => ({ 
        ...prev, 
        error: '아이디와 비밀번호를 모두 입력해주세요.' 
      }));
      return;
    }

    try {
      setFormState(prev => ({ ...prev, isLoading: true, error: '' }));

      const response = await api.post('/auth/signin', { 
        email: formState.id,
        password: formState.password
      });

      const responseData = response.data as { 
        success: boolean; 
        message: string;
        token?: string;
        user_id?: string;
      };
      
      if (responseData.success) {
        const userId = responseData.user_id || formState.id;
        
        // Zustand 스토어 업데이트
        setUserId(userId);
        updateEmail(formState.id);
        updateName('사용자');

        // AuthStore로 로그인 처리
        await signin(userId, {
          name: '사용자',
          email: formState.id
        }, responseData.token);

        // 성공 메시지 설정
        setFormState(prev => ({
          ...prev,
          success: '로그인에 성공했습니다.'
        }));

        router.push('/dashboard');
      } else {
        throw new Error(responseData.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      
      // 에러 메시지 표시
      const errorMessage = error instanceof Error 
        ? error.message 
        : '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
      
      setFormState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
    }
  };

  return {
    formState,
    handleChange,
    handleLogin
  };
};

