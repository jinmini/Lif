"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard";

// 고객 데이터 인터페이스 정의
interface Customer {
  id: string;
  email: string;
  name: string;
}

interface CustomerResponse {
  customers: Customer[];
}

const DashboardPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 고객 데이터 가져오기
  const fetchCustomers = async () => {
    try {
      setError(null);
      
      // 프록시 API를 통해 데이터 가져오기
      const res = await fetch('/api/proxy/customer', {
        cache: 'no-store', // SSR을 위해 매 요청마다 새로운 데이터 가져옴
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).catch(err => {
        console.error('서버 연결 오류:', err);
        throw new Error('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `데이터를 가져오는데 실패했습니다. 상태 코드: ${res.status}`);
      }

      const data: CustomerResponse = await res.json();
      setCustomers(data.customers || []);
    } catch (err: any) {
      console.error('데이터 가져오기 오류:', err);
      setError(err.message || '고객 데이터를 가져오는데 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    // 인증 상태 로딩이 완료된 경우에만 처리
    if (!isLoading) {
      if (!isAuthenticated) {
        // 인증되지 않은 경우 로그인 페이지로 리디렉션
        router.push('/auth/login');
      } else {
        // 인증된 경우 페이지 로딩 완료 및 데이터 가져오기
        setIsPageLoading(false);
        fetchCustomers();
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
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1390 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          
          <div className="rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15">
            <h2 className="mb-8 text-center text-3xl font-semibold text-black dark:text-white">고객 목록</h2>
            
            {error && (
              <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <p className="mb-2">{error}</p>
                <button 
                  onClick={() => fetchCustomers()}
                  className="mt-2 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 dark:bg-red-800/50 dark:text-red-300 dark:hover:bg-red-800"
                >
                  다시 시도
                </button>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="border-b border-stroke dark:border-strokedark">
                    <th className="p-4 text-left font-medium text-black dark:text-white">ID</th>
                    <th className="p-4 text-left font-medium text-black dark:text-white">이름</th>
                    <th className="p-4 text-left font-medium text-black dark:text-white">이메일</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length > 0 ? (
                    customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-stroke dark:border-strokedark">
                        <td className="p-4 text-black dark:text-white">{customer.id}</td>
                        <td className="p-4 text-black dark:text-white">{customer.name}</td>
                        <td className="p-4 text-black dark:text-white">{customer.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-black dark:text-white">
                        {error ? '데이터를 불러올 수 없습니다.' : '고객 데이터가 없습니다.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage; 