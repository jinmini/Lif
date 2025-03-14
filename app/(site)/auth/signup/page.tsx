import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입 - LIF",

  // other metadata
  description: "Life, Intelligence, Future - 회원가입 페이지"
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
