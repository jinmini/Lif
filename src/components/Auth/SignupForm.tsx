"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signup, checkEmailExists, checkUserIdExists, SignupData } from '@/services/authService';

// 회원가입 폼 입력 타입 정의
interface SignupFormData {
  userId: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other' | '';
  agreeToTerms: boolean;
}

// 유효성 검사 오류 메시지 타입 정의
interface ValidationErrors {
  userId?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  agreeToTerms?: string;
}

const SignupForm = () => {
  const router = useRouter();
  
  // 폼 상태 초기화
  const [formData, setFormData] = useState<SignupFormData>({
    userId: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    agreeToTerms: false,
  });
  
  // 유효성 검사 오류 상태
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  // 폼 제출 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 아이디 및 이메일 중복 체크 상태
  const [isCheckingUserId, setIsCheckingUserId] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  
  // 디바운스 타이머
  const [userIdTimer, setUserIdTimer] = useState<NodeJS.Timeout | null>(null);
  const [emailTimer, setEmailTimer] = useState<NodeJS.Timeout | null>(null);
  
  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // 입력 시 해당 필드의 오류 메시지 초기화
    if (errors[name as keyof ValidationErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
    
    // ID 또는 이메일 입력 시 중복 체크 디바운스 설정
    if (name === 'userId' && value.length >= 4) {
      if (userIdTimer) clearTimeout(userIdTimer);
      setUserIdTimer(setTimeout(() => {
        checkUserIdAvailability(value);
      }, 800));
    }
    
    if (name === 'email' && value.includes('@')) {
      if (emailTimer) clearTimeout(emailTimer);
      setEmailTimer(setTimeout(() => {
        checkEmailAvailability(value);
      }, 800));
    }
  };
  
  // 아이디 중복 체크
  const checkUserIdAvailability = async (userId: string) => {
    if (!userId || userId.length < 4) return;
    
    setIsCheckingUserId(true);
    try {
      const exists = await checkUserIdExists(userId);
      if (exists) {
        setErrors({
          ...errors,
          userId: '이미 사용 중인 아이디입니다.',
        });
      } else {
        setErrors({
          ...errors,
          userId: undefined,
        });
        // 사용 가능한 아이디임을 표시
        toast.success('사용 가능한 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 중복 체크 오류:', error);
    } finally {
      setIsCheckingUserId(false);
    }
  };
  
  // 이메일 중복 체크
  const checkEmailAvailability = async (email: string) => {
    if (!email || !email.includes('@')) return;
    
    setIsCheckingEmail(true);
    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        setErrors({
          ...errors,
          email: '이미 사용 중인 이메일입니다.',
        });
      } else {
        setErrors({
          ...errors,
          email: undefined,
        });
      }
    } catch (error) {
      console.error('이메일 중복 체크 오류:', error);
    } finally {
      setIsCheckingEmail(false);
    }
  };
  
  // 유효성 검사 함수
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    // ID 검사
    if (!formData.userId.trim()) {
      newErrors.userId = 'ID를 입력해주세요.';
    } else if (formData.userId.length < 4) {
      newErrors.userId = 'ID는 최소 4자 이상이어야 합니다.';
    }
    
    // 이메일 검사
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
    }
    
    // 비밀번호 검사
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '비밀번호는 대소문자와 숫자를 포함해야 합니다.';
    }
    
    // 비밀번호 확인
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    
    // 성별 선택
    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요.';
    }
    
    // 약관 동의
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = '개인정보 수집 및 이용에 동의해주세요.';
    }
    
    // 오류 상태 업데이트
    setErrors(newErrors);
    
    // 오류가 없으면 true 반환
    return Object.keys(newErrors).length === 0;
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 중복 제출 방지
    if (isSubmitting) return;
    
    // 유효성 검사
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // API 요청을 위한 데이터 준비
      const signupData: SignupData = {
        userId: formData.userId,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        agreeToTerms: formData.agreeToTerms
      };
      
      // 회원가입 API 호출
      await signup(signupData);
      
      // 성공 처리
      toast.success('회원가입이 완료되었습니다!');
      
      // 로그인 페이지로 이동
      setTimeout(() => {
        router.push('/auth/signin');
      }, 1500);
      
    } catch (error: any) {
      // 오류 처리
      const errorMessage = error.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.';
      toast.error(errorMessage);
      console.error('회원가입 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 컴포넌트 정리
  useEffect(() => {
    return () => {
      if (userIdTimer) clearTimeout(userIdTimer);
      if (emailTimer) clearTimeout(emailTimer);
    };
  }, [userIdTimer, emailTimer]);
  
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              회원가입
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* ID 입력 필드 */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  아이디
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {isCheckingUserId && (
                    <div className="absolute right-4 top-4 text-sm text-meta-3">
                      확인 중...
                    </div>
                  )}
                  {errors.userId && (
                    <p className="mt-1 text-sm text-danger">{errors.userId}</p>
                  )}
                </div>
              </div>
              
              {/* 이메일 입력 필드 */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  이메일
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력하세요"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {isCheckingEmail && (
                    <div className="absolute right-4 top-4 text-sm text-meta-3">
                      확인 중...
                    </div>
                  )}
                  {errors.email && (
                    <p className="mt-1 text-sm text-danger">{errors.email}</p>
                  )}
                </div>
              </div>
              
              {/* 비밀번호 입력 필드 */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-danger">{errors.password}</p>
                  )}
                </div>
              </div>
              
              {/* 비밀번호 확인 입력 필드 */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="비밀번호를 다시 입력하세요"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-danger">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              
              {/* 성별 선택 */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  성별
                </label>
                <div className="flex gap-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                      className="h-5 w-5 accent-primary"
                    />
                    <label className="ml-2 text-black dark:text-white">남성</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                      className="h-5 w-5 accent-primary"
                    />
                    <label className="ml-2 text-black dark:text-white">여성</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === 'other'}
                      onChange={handleChange}
                      className="h-5 w-5 accent-primary"
                    />
                    <label className="ml-2 text-black dark:text-white">기타</label>
                  </div>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-danger">{errors.gender}</p>
                )}
              </div>
              
              {/* 개인정보 수집 및 이용 동의 */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-5 w-5 accent-primary"
                  />
                  <label className="ml-2 text-black dark:text-white">
                    개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-sm text-danger">{errors.agreeToTerms}</p>
                )}
              </div>
              
              {/* 회원가입 버튼 */}
              <div className="mb-5">
                <button
                  type="submit"
                  disabled={isSubmitting || isCheckingUserId || isCheckingEmail}
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-70"
                >
                  {isSubmitting ? '처리 중...' : '회원가입'}
                </button>
              </div>
              
              {/* 로그인 링크 */}
              <div className="mt-6 text-center">
                <p className="text-sm text-black dark:text-white">
                  이미 계정이 있으신가요?{' '}
                  <Link
                    href="/auth/signin"
                    className="text-primary hover:underline"
                  >
                    로그인
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
