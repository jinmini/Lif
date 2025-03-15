"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // 인증 상태 로딩이 완료된 경우에만 처리
    if (!isLoading) {
      if (!isAuthenticated) {
        // 인증되지 않은 경우 로그인 페이지로 리디렉션
        router.push('/auth/login');
      } else {
        // 인증된 경우 페이지 로딩 완료
        setIsPageLoading(false);
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // 로딩 중인 경우 로딩 상태 표시
  if (isLoading || isPageLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">로딩 중...</p>
          <p className="mt-2 text-sm text-gray-500">인증 상태를 확인하고 있습니다.</p>
        </div>
      </div>
    );
  }

  // 인증된 경우 대시보드 표시
  return (
    <>
      <Dashboard />
    </>
  );
};

export default DashboardPage; 