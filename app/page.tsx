import AuthButton from "../components/AuthButton";
import Header from "@/components/Header";
import { headers } from "next/headers";
import Uploader from "@/components/Uploader";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LogoRenderer from "@/components/LogoRenderer";

export default async function Index() {
  const origin = headers().get("origin");

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl w-full px-3">
        <div className="w-full h-60 mx-auto">
          <LogoRenderer />
        </div>
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <Uploader authCallback={`${origin}/auth/callback`} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
