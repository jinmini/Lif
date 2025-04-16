import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const data = [
  { year: '2022', operatingMargin: 3.26, netMargin: 3.00, roe: 3.57, roa: 1.77 },
  { year: '2023', operatingMargin: 4.40, netMargin: 3.76, roe: 3.83, roa: 2.33 },
  { year: '2024', operatingMargin: -3.53, netMargin: 1.32, roe: 0.90, roa: 0.56 },
];

const ProfitabilityChart = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-blacksection">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            수익성 지표 (영업이익률, 순이익률, ROE, ROA)
          </h5>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[-10, 'auto']} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="operatingMargin" name="영업이익률" fill="#34D399" />
            <Bar dataKey="netMargin" name="순이익률" fill="#60A5FA" />
            <Bar dataKey="roe" name="ROE" fill="#FBBF24" />
            <Bar dataKey="roa" name="ROA" fill="#F87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitabilityChart; 