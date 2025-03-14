"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";

export default function LoginFailure() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-999">
      <motion.div 
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.95,
          },
          visible: {
            opacity: 1,
            scale: 1,
          },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-solid-3 dark:bg-black dark:border dark:border-strokedark"
      >
        <h2 className="text-center text-lg font-semibold p-4 text-black dark:text-white">안내</h2>
        <div className="h-px bg-stroke w-full dark:bg-strokedark"></div>
        <p className="py-8 px-4 text-center text-waterloo leading-relaxed dark:text-manatee">
          멤버 로그인에 실패하였습니다.<br />
          다시 시도해주시기 바랍니다.
        </p>
        <div className="h-px bg-stroke w-full dark:bg-strokedark"></div>
        <Link href="/auth/login" className="block text-center p-4 text-primary hover:bg-alabaster transition-colors font-medium dark:hover:bg-blackho">
          확인
        </Link>
      </motion.div>
    </div>
  );
} 