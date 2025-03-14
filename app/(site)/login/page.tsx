import Login from "@/components/Auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 - LIF",
  description: "Life, Intelligence, Future 로그인 페이지"
};

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage; 