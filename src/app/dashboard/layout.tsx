"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  
  // 기본값은 일반 사용자
  return 'user';
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  
  useEffect(() => {
    // 현재 URL 경로 가져오기
    const path = window.location.pathname;
    const role = getUserRole();
    
    // 정확히 /dashboard로 접근한 경우, 역할에 맞는 하위 경로로 리디렉션
    if (path === '/dashboard') {
      router.push(`/dashboard/${role}`);
    }
  }, [router]);
  
  return (
    <div className="dashboard-layout">
      {children}
      <RoleSelector />
    </div>
  );
} 