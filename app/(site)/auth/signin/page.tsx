"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null;
};

export default SigninPage;
