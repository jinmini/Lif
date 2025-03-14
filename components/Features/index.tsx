"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "손쉬운 탄소 배출량 산정",
      description: "국내/외 최신 배출계수를 적용하여 다수 사업장의 탄소 배출량을 효율적으로 수집/관리할 수 있습니다.",
      icon: "/images/features/carbon.svg",
      url: "/features/carbon-calculation",
    },
    {
      id: 2,
      title: "다양한 Insight 제공",
      description: "배출되는 온실가스를 다양한 검토로 분석하고 배출량에 따라 증감 관리할 수 있습니다.",
      icon: "/images/features/insight.svg",
      url: "/features/insights",
    },
    {
      id: 3,
      title: "보고서 자동 생성",
      description: "기존된 보고서 또는 글로벌 Framework(CDP, TCFD 등)에 맞춰 보고서를 생성할 수 있습니다.",
      icon: "/images/features/report.svg",
      url: "/features/reports",
    },
    {
      id: 4,
      title: "데이터 기반 목표 설정",
      description: "시뮬레이션을 통해 감축 목표를 설정, 연도별 로드맵을 수립하고 이행 방안 및 감축량을 관리합니다.",
      icon: "/images/features/target.svg",
      url: "/features/data-targets",
    },
    {
      id: 5,
      title: "최적 감축/상쇄 방안 연결",
      description: "감축 솔루션과 글로벌 탄소배출권 구매로 탄소중립 로드맵 달성을 지원합니다.",
      icon: "/images/features/reduction.svg",
      url: "/features/reduction-solutions",
    },
    {
      id: 6,
      title: "ESG 관리 고도화",
      description: "기업의 ESG 데이터 수집, 산업별 주요 지표 선정 및 분석 기능을 제공합니다.",
      icon: "/images/features/esg.svg",
      url: "/features/esg-management",
    },
  ];

  return (
    <section className="py-20 lg:py-25">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="rounded-lg bg-white p-8 shadow-solid-3 dark:bg-blacksection dark:shadow-solid-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
          {feature.title}
        </h3>
        <p className="text-base text-body-color dark:text-body-color-dark">
          {feature.description}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <Link 
          href={feature.url}
          className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-2 text-center text-base font-medium text-primary transition-colors hover:bg-primary hover:text-white"
        >
          VIEW MORE
        </Link>
        
        <motion.div
          animate={{ 
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="relative h-24 w-24"
        >
          <Image
            src={feature.icon}
            alt={feature.title}
            width={96}
            height={96}
            className="object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
