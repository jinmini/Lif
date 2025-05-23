"use client";

import { useAuthStore, getUser, getIsAuthenticated } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api/axios";

export default function ProfilePage() {
  const user = useAuthStore(getUser);
  const isAuthenticated = useAuthStore(getIsAuthenticated);
  const signout = useAuthStore(state => state.signout);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 API 호출
      if (user?.user_id) {
        await api.post('/auth/signout', { user_id: user.user_id });
      }
      
      // 로컬 상태 및 토큰 초기화
      signout();
      
      // 로그인 페이지로 리다이렉트
      router.push('/signin');
    } catch (error) {
      console.error('로그아웃 오류:', error);
      // 오류가 발생해도 로컬에서는 로그아웃 처리
      signout();
      router.push('/signin');
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
        
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -20,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
        >
          <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
            내 프로필
          </h2>
          
          <div className="mb-10">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f8f8] dark:bg-[#2C303B]">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-black dark:text-white">
                {user.name}
              </h3>
              <p className="mt-2 text-waterloo dark:text-manatee">
                사용자 계정
              </p>
            </div>
          </div>
          
          <div className="mb-10 border-t border-stroke pt-10 dark:border-strokedark">
            <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
              계정 정보
            </h4>
            <div className="rounded-md bg-[#f8f8f8] p-6 dark:bg-[#2C303B]">
              <div className="mb-4 flex flex-wrap items-center justify-between border-b border-stroke pb-4 dark:border-strokedark">
                <span className="text-waterloo dark:text-manatee">사용자 이름</span>
                <span className="font-medium text-black dark:text-white">{user.name}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <span className="text-waterloo dark:text-manatee">계정 상태</span>
                <span className="font-medium text-black dark:text-white">활성</span>
              </div>
            </div>
          </div>
          
          <div className="mb-10 flex justify-center">
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-8 py-3 text-white transition-all hover:bg-red-700"
            >
              로그아웃
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 