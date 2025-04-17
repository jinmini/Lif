'use client';

import React from 'react';
import { FinanceDashboardTabs } from './TabMenu';

const TabExample = () => {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        환영합니다! LIF 데이터 대시보드입니다.
      </h2>
      
      <div className="mb-8 bg-blue-100 dark:bg-blue-900 p-4 rounded-md">
        <p className="text-blue-800 dark:text-blue-200">
          이 대시보드에서 재무 및 ESG 데이터를 분석하고 AI 챗봇과 대화할 수 있습니다.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <FinanceDashboardTabs>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h4 className="font-medium mb-2">재무 요약</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                최근 분기 매출 성장률: 8.5%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                영업이익률: 12.3%
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h4 className="font-medium mb-2">ESG 요약</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                환경 점수: 82/100
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                사회 점수: 75/100
              </p>
            </div>
          </div>
        </FinanceDashboardTabs>
      </div>
    </div>
  );
};

export default TabExample; 