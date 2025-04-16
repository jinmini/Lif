import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "대시보드 - LIF",
  description: "Life, Intelligence, Future - 사용자 대시보드"
};

export default function DashboardPage() {
  // 서버 컴포넌트에서는 즉시 /dashboard/user로 리디렉션
  // 실제 역할 기반 리디렉션은 layout.tsx의 클라이언트 컴포넌트에서 처리
  redirect("/dashboard/user");
}
