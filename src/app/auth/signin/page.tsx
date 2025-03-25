
import SigninForm from "@/components/Auth/SigninForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 - LIF",
  description: "Life, Intelligence, Future - 로그인 페이지"
};

export default function SigninPage() {
  return <SigninForm />;
}
