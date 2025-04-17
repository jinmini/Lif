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

interface DashboardTabsProps {
  children?: React.ReactNode;
  financialContent?: React.ReactNode;
  esgContent?: React.ReactNode;
  chatbotContent?: React.ReactNode;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  children, 
  financialContent, 
  esgContent, 
  chatbotContent 
}) => {
  const [activeTab, setActiveTab] = useState<string>('summary');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  const tabItems: TabItem[] = [
    {
      id: 'summary',
      label: '전체 요약',
      icon: <BarChart3 size={18} />,
      content: (
        <div>
          {children}
        </div>
      ),
    },
    {
      id: 'finance',
      label: '재무 분석',
      icon: <LineChart size={18} />,
      content: (
        <div>
          {financialContent || (
            <div className="mt-4 p-6 border border-stroke rounded-lg bg-white shadow-default dark:border-strokedark dark:bg-blacksection">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">상세 재무 데이터 조회</h3>
              <p className="text-waterloo dark:text-manatee">재무 분석 내용이 표시됩니다.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'esg',
      label: 'ESG 분석',
      icon: <PieChart size={18} />,
      content: (
        <div>
          {esgContent || (
            <div className="mt-4 p-6 border border-stroke rounded-lg bg-white shadow-default dark:border-strokedark dark:bg-blacksection">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">상세 ESG 데이터 조회</h3>
              <p className="text-waterloo dark:text-manatee">ESG 분석 내용이 표시됩니다.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'chatbot',
      label: 'AI 챗봇',
      icon: <MessageSquareText size={18} />,
      content: (
        <div>
          {chatbotContent || (
            <div className="mt-4 p-6 border border-stroke rounded-lg bg-white shadow-default dark:border-strokedark dark:bg-blacksection">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">데이터 분석 및 요약 메일 전송</h3>
              <p className="text-waterloo dark:text-manatee">AI 챗봇 인터페이스가 표시됩니다.</p>
              <div className="mt-4 flex items-center border border-stroke rounded p-2 dark:border-strokedark">
                <input 
                  type="text" 
                  placeholder="AI 챗봇에게 질문하기..." 
                  className="flex-1 bg-transparent outline-none text-black dark:text-white" 
                />
                <button className="bg-primary text-white p-2 rounded-md">
                  <MessageSquareText size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* 탭 메뉴 */}
      <div className="flex border-b border-stroke dark:border-strokedark">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`inline-flex items-center py-4 px-6 text-sm font-medium transition-colors duration-200 
              ${activeTab === tab.id 
                ? 'text-primary border-b-2 border-primary dark:text-primary' 
                : 'text-waterloo hover:text-black dark:text-manatee dark:hover:text-white'
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
      <div className="pt-4">
        {tabItems.map((tab) => (
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

export default DashboardTabs;