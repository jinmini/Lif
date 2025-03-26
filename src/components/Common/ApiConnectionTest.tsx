"use client";

import { useState, useEffect } from "react";
import { testApiConnection } from "@/lib/api/axios";

export default function ApiConnectionTest() {
  const [apiStatus, setApiStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const result = await testApiConnection();
        setApiStatus(result);
      } catch (error) {
        console.error("API 연결 테스트 중 오류 발생:", error);
        setApiStatus({
          success: false,
          message: "API 서버 연결 테스트 중 오류가 발생했습니다."
        });
      }
    };

    checkApiConnection();
  }, []);

  if (!apiStatus) return null;

  return (
    <div className={`p-4 mb-4 text-center ${apiStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {apiStatus.message}
    </div>
  );
} 