import { Metadata } from "next";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "사용자 대시보드 - LIF",
  description: "Life, Intelligence, Future - 일반 사용자 대시보드"
};

export default function UserDashboardPage() {
  return <Dashboard />;
}
