import { useState, FormEvent } from 'react';

interface SigninFormState {
  id: string;
  password: string;
  error: string;
  success: string;
  isLoading: boolean;
}

export const useSigninForm = () => {
  const [formState, setFormState] = useState<SigninFormState>({
    id: '',
    password: '',
    error: '',
    success: '',
    isLoading: false
  });

  const setId = (id: string) => {
    setFormState(prev => ({ ...prev, id }));
  };

  const setPassword = (password: string) => {
    setFormState(prev => ({ ...prev, password }));
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

      await new Promise(resolve => setTimeout(resolve, 1000));

      setFormState(prev => ({
        ...prev,
        success: '로그인 성공! 메인 페이지로 이동합니다.',
        isLoading: false
      }));

    } catch (error) {

      setFormState(prev => ({
        ...prev,
        error: '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.',
        isLoading: false
      }));
    }
  };

  return {
    id: formState.id,
    password: formState.password,
    error: formState.error,
    success: formState.success,
    isLoading: formState.isLoading,
    setId,
    setPassword,
    handleLogin
  };
};

