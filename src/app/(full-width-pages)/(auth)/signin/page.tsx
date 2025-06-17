import SignInForm from "@/components/auth/SignInForm";
import HelloFetcher from "@/components/HelloFetcher";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cashlez Promo | Sign-In",
  description: "Cashlez Promo | Sign-In",
};

export default function SignIn() {
  return <SignInForm />;
  // return <HelloFetcher />;
}
