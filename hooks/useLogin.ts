import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { login, devLogin } from '@/services/api/auth';

export const useLogin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: authLogin } = useAuth();

  // URL 파라미터에서 회원가입 성공 여부 확인
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('회원가입이 완료되었습니다. 로그인해주세요.');
    }
  }, [searchParams]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      if (!id || !password) {
        setError('아이디와 비밀번호를 입력해주세요');
        setIsLoading(false);
        return;
      }

      try {
        // API 서비스 레이어를 통한 로그인 요청
        await login({ id, password });
        
        // 로그인 성공 시 인증 상태 업데이트
        await authLogin(id);
        
        // 대시보드 페이지로 이동
        router.push('/dashboard/common/user/templates');
      } catch (error: any) {
        console.error('로그인 API 오류:', error);
        
        // 개발 환경에서 임시 로그인 처리 (백엔드 연결 실패 시)
        if (devLogin(id, password)) {
          await authLogin(id);
          router.push('/dashboard/common/user/templates');
        } else {
          setError(error.message || '로그인에 실패했습니다.');
        }
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('로그인 처리 중 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    id,
    password,
    error,
    success,
    isLoading,
    setId,
    setPassword,
    handleLogin
  };
}; 