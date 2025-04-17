'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart,
  MessageSquareText
} from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface TabMenuProps {
  items: TabItem[];
  defaultTab?: string;
}

const TabMenu: React.FC<TabMenuProps> = ({ items, defaultTab }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || (items.length > 0 ? items[0].id : ''));

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full">
      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {items.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`inline-flex items-center py-4 px-6 text-sm font-medium transition-colors duration-200 
              ${activeTab === tab.id 
                ? 'text-primary border-b-2 border-primary dark:text-primary-light' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
          >
            <span className="mr-2">
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="p-4">
        {items.map((tab) => (
          <div 
            key={tab.id} 
            className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

// 기본 컴포넌트로 사용할 수 있는 FinanceDashboardTabs 컴포넌트
export const FinanceDashboardTabs: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const tabItems: TabItem[] = [
    {
      id: 'summary',
      label: '전체 요약',
      icon: <BarChart3 size={18} />,
      content: (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-4">재무 및 ESG 데이터 시각화</h3>
          {children || <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">전체 요약 내용이 표시됩니다.</div>}
        </div>
      ),
    },
    {
      id: 'finance',
      label: '재무 분석',
      icon: <LineChart size={18} />,
      content: (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-4">상세 재무 데이터 조회</h3>
          <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">재무 분석 내용이 표시됩니다.</div>
        </div>
      ),
    },
    {
      id: 'esg',
      label: 'ESG 분석',
      icon: <PieChart size={18} />,
      content: (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-4">상세 ESG 데이터 조회</h3>
          <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">ESG 분석 내용이 표시됩니다.</div>
        </div>
      ),
    },
    {
      id: 'chatbot',
      label: 'AI 챗봇',
      icon: <MessageSquareText size={18} />,
      content: (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-4">데이터 분석 및 요약 메일 전송</h3>
          <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">AI 챗봇 인터페이스가 표시됩니다.</div>
        </div>
      ),
    },
  ];

  return <TabMenu items={tabItems} defaultTab="summary" />;
};

export default TabMenu; 