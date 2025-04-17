"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import DebtLiquidityChart from './DebtLiquidityChart';
import ProfitabilityChart from './ProfitabilityChart';
import GrowthChart from './GrowthChart';
import DashboardTabs from './DashboardTabs';

const Dashboard = () => {
  const summaryContent = (
    <>
      {/* 대시보드 메트릭 섹션 */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-blacksection">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta bg-opacity-20">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.825012 8.61876C0.825012 8.61876 4.19376 2.12189 11 2.12189C17.8063 2.12189 21.175 8.61876 21.175 8.61876C21.175 8.61876 17.8063 15.1156 11 15.1156Z" stroke="#20C5A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 11.4281C12.5062 11.4281 13.7281 10.2062 13.7281 8.70001C13.7281 7.19376 12.5062 5.97189 11 5.97189C9.49375 5.97189 8.27188 7.19376 8.27188 8.70001C8.27188 10.2062 9.49375 11.4281 11 11.4281Z" stroke="#20C5A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                3,456
              </h4>
              <span className="text-sm font-medium">총 방문자</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta">
              +2.5%
            </span>
          </div>
        </div>
        
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-blacksection">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-primary bg-opacity-20">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#006BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 6.25V10H13.75" stroke="#006BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                45.2%
              </h4>
              <span className="text-sm font-medium">전환율</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta">
              +4.2%
            </span>
          </div>
        </div>
        
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-blacksection">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-warning bg-opacity-20">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 15.5V6.5C17.5 5.94772 17.0523 5.5 16.5 5.5H5.5C4.94772 5.5 4.5 5.94772 4.5 6.5V15.5C4.5 16.0523 4.94772 16.5 5.5 16.5H16.5C17.0523 16.5 17.5 16.0523 17.5 15.5Z" stroke="#FFA800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke="#FFA800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 5.5L8 2.5" stroke="#FFA800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 5.5L14 2.5" stroke="#FFA800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 16.5L14 19.5" stroke="#FFA800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 16.5L8 19.5" stroke="#FFA800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                ₩2,450,000
              </h4>
              <span className="text-sm font-medium">총 수익</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta">
              +8.9%
            </span>
          </div>
        </div>
        
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-blacksection">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-danger bg-opacity-20">
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 9H1" stroke="#F9327A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 2H1" stroke="#F9327A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 16H1" stroke="#F9327A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                96.8%
              </h4>
              <span className="text-sm font-medium">고객 만족도</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta">
              +1.4%
            </span>
          </div>
        </div>
      </div>
      
      {/* 차트 섹션 */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DebtLiquidityChart />
        <ProfitabilityChart />
      </div>
      
      {/* 성장성 지표 차트 */}
      <div className="mb-8 grid grid-cols-1 gap-4">
        <GrowthChart />
      </div>
      
      {/* 최근 거래 내역 */}
      <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          최근 거래 내역
        </h4>
        
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                거래 ID
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                고객명
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                상품
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                금액
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                상태
              </h5>
            </div>
          </div>
          
          <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">#TX-5674</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">김진민</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">정기예금</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">₩1,200,000</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                완료
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">#TX-5673</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">김동희</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">주택담보대출</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">₩85,000,000</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
                진행중
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">#TX-5672</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">박지훈</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">펀드</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">₩5,000,000</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                완료
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // 재무 분석에 들어갈 컨텐츠
  const financeContent = (
    <div className="mb-8 grid grid-cols-1 gap-4">
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          상세 재무 데이터
        </h4>
        <p className="text-base text-waterloo dark:text-manatee mb-4">
          이 섹션에서는 회사의 상세 재무 데이터를 조회하고 분석할 수 있습니다.
        </p>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">재무 비율</h5>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">부채비율:</span>
                <span className="font-medium text-black dark:text-white">35.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">유동비율:</span>
                <span className="font-medium text-black dark:text-white">245.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">ROE:</span>
                <span className="font-medium text-black dark:text-white">12.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">ROA:</span>
                <span className="font-medium text-black dark:text-white">8.7%</span>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">성장 지표</h5>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">매출 성장률:</span>
                <span className="font-medium text-success">+15.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">순이익 성장률:</span>
                <span className="font-medium text-success">+8.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">자산 성장률:</span>
                <span className="font-medium text-success">+5.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">시장점유율 변화:</span>
                <span className="font-medium text-success">+2.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // ESG 분석에 들어갈 컨텐츠
  const esgContent = (
    <div className="mb-8 grid grid-cols-1 gap-4">
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          ESG 분석 데이터
        </h4>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">환경(E)</h5>
            <div className="mb-4 flex items-center">
              <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-meta-4">
                <div className="h-4 rounded-full bg-success" style={{ width: '82%' }}></div>
              </div>
              <span className="ml-2 font-medium text-black dark:text-white">82/100</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">탄소배출:</span>
                <span className="font-medium text-success">-15% YoY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">재활용률:</span>
                <span className="font-medium text-black dark:text-white">76%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">에너지 효율:</span>
                <span className="font-medium text-success">+12%</span>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">사회(S)</h5>
            <div className="mb-4 flex items-center">
              <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-meta-4">
                <div className="h-4 rounded-full bg-primary" style={{ width: '75%' }}></div>
              </div>
              <span className="ml-2 font-medium text-black dark:text-white">75/100</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">직원 만족도:</span>
                <span className="font-medium text-black dark:text-white">84%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">성별 다양성:</span>
                <span className="font-medium text-black dark:text-white">42% 여성</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">지역사회 투자:</span>
                <span className="font-medium text-success">+8%</span>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-meta-4">
            <h5 className="mb-2 text-lg font-medium text-black dark:text-white">지배구조(G)</h5>
            <div className="mb-4 flex items-center">
              <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-meta-4">
                <div className="h-4 rounded-full bg-warning" style={{ width: '68%' }}></div>
              </div>
              <span className="ml-2 font-medium text-black dark:text-white">68/100</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">이사회 독립성:</span>
                <span className="font-medium text-black dark:text-white">65%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">투명성 지수:</span>
                <span className="font-medium text-black dark:text-white">72/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-waterloo dark:text-manatee">윤리 강령 준수:</span>
                <span className="font-medium text-success">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="relative z-1 mx-auto max-w-c-1390 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
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
          <div className="mb-8 flex items-center justify-between border-b border-stroke pb-5 dark:border-strokedark">
            <div>
              <h2 className="text-3xl font-semibold text-black dark:text-white">LIF 대시보드</h2>
              <p className="mt-1 text-base text-waterloo dark:text-manatee">환영합니다! LIF 데이터 대시보드입니다.</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-primaryho"
            >
              <span>홈으로</span>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
          
          {/* 탭 UI 추가 */}
          <DashboardTabs
            financialContent={financeContent}
            esgContent={esgContent}
          >
            {summaryContent}
          </DashboardTabs>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;