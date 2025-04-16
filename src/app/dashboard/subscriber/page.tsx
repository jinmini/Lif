import { Metadata } from "next";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "구독자 대시보드 - LIF",
  description: "Life, Intelligence, Future - 구독자 대시보드"
};

export default function SubscriberDashboardPage() {
  // 기본 대시보드 컴포넌트를 사용하지만 나중에 ESG 차트와 투자 리포트 생성 UI를 추가해야 함
  return (
    <>
      <Dashboard />
      <div className="container mx-auto pb-12">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-blacksection">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            구독자 전용 기능 (ESG 차트 및 투자 리포트 섹션)
          </h4>
          <p className="text-waterloo dark:text-manatee">
            이 섹션에는 추후 ESG 차트 및 투자 리포트 생성 UI가 추가될 예정입니다.
          </p>
        </div>
      </div>
    </>
  );
}
