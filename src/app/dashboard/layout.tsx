"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import RoleSelector from '@/components/RoleSelector';

// 임시 사용자 역할 정의 (실제 구현 시 인증 시스템에서 가져옴)
const getUserRole = (): 'user' | 'subscriber' | 'admin' | null => {
  // 로컬 스토리지에서 사용자 역할 가져오기 (클라이언트 사이드에서만 동작)
  if (typeof window !== 'undefined') {
    const role = localStorage.getItem('userRole');
    if (role === 'user' || role === 'subscriber' || role === 'admin') {
      return role;
    }
  }
  
  return 'user';
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  useEffect(() => {
    
    if(status === 'unauthenticated'){
      router.push('/auth/signin');
      return;
    }
    
    // 정확히 /dashboard로 접근한 경우, 역할에 맞는 하위 경로로 리디렉션
    if (status === 'authenticated') {
      const path = window.location.pathname;
      const role = session?.user?.role || getUserRole();

      if (path === '/dashboard') {
        router.push(`/dashboard/${role}`);
      }
    }
  }, [router, status, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="dashboard-layout">
      {status === 'authenticated' && children}
      <RoleSelector />
    </div>
  );
} 