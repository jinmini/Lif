import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Dot,
} from 'recharts';

const data = [
  { year: '2022', salesGrowth: 1331.72, profitGrowth: 986.07, epsGrowth: 650.20 },
  { year: '2023', salesGrowth: 32.04, profitGrowth: 78.20, epsGrowth: 59.96 },
  { year: '2024', salesGrowth: 75.92, profitGrowth: -160.86, epsGrowth: -79.28 },
];

const GrowthChart = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-blacksection">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            성장성 지표 (매출, 이익, EPS 성장률)
          </h5>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[-200, 'auto']} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Line type="monotone" dataKey="salesGrowth" name="매출 성장률" stroke="#6366F1" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="profitGrowth" name="영업이익 성장률" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="epsGrowth" name="EPS 성장률" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthChart; 