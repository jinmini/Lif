import { Metadata } from "next";
import SignupForm from "@/components/Auth/SignupForm";

export const metadata: Metadata = {
  title: "회원가입 - LIF",
  description: "Life, Intelligence, Future - 회원가입 페이지"
};

export default function SignupPage() {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-1 py-20 dark:bg-boxdark-2">
      <div className="container max-w-screen-lg">
        <SignupForm />
      </div>
    </section>
  );
} 