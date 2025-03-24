"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  user_id: string;
  name: string;
  email: string;
  // 필요한 경우 추가 사용자 정보를 여기에 추가
}

interface AuthContextType {
  user: User | null;
  signin: (userId: string, userInfo?: any) => Promise<void>;
  signout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 브라우저 로컬 스토리지에서 사용자 정보 로드
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('로컬 스토리지 접근 오류:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signin = (userId: string, userInfo?: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const newUser: User = userInfo ? {
          user_id: userId,
          name: userInfo.name || '사용자',
          email: userInfo.email || `${userId}@example.com`
        } : {
          user_id: userId,
          name: '사용자',
          email: `${userId}@example.com`
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve();
      } catch (error) {
        console.error('로그인 처리 오류:', error);
        reject(error);
      }
    });
  };

  const signout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('로그아웃 처리 오류:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 