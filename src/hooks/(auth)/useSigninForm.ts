import { useState, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/axios'; 
import { useUserStore } from '@/store/account/guest/customer/store';

interface SigninFormState { 
  id: string;
  password: string;
  error: string;
  success: string;
  isLoading: boolean;
}

export const useSigninForm = () => { 
  const router = useRouter();
  const { signin } = useAuth();
  const setUserInfo = useUserStore(state => state.setUserInfo);
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
        // zustand 스토어에 사용자 정보 저장
        const userId = responseData.user_id || formState.id;
        setUserInfo(
          userId,
          formState.id,  // email
          '사용자'       // name
        );

        await signin(userId, {
          name: '사용자',
          email: formState.id
        });

        router.push('/dashboard');
      } else {
        throw new Error(responseData.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      
      setFormState(prev => ({
        ...prev,
        error: error instanceof Error 
          ? error.message 
          : '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.',
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

