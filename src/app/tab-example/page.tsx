import { Metadata } from 'next';
import TabExample from '@/components/TabUI/TabExample';

export const metadata: Metadata = {
  title: '탭 UI 예제 - LIF',
  description: 'LIF 플랫폼의 데이터 대시보드 탭 UI 예제 페이지입니다.',
};

export default function TabExamplePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-boxdark-2 pt-20 pb-10">
      <TabExample />
    </main>
  );
} 