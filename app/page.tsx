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
        <div className="w-full h-60 mx-auto relative my-16">
          <div className="z-20 h-60 w-full relative ">
            <LogoRenderer />
          </div>
          <div className="flex flex-row items-center justify-center absolute inset-0 z-10">
            <div
              className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]  mx-auto rounded-full"
              style={{
                backgroundImage: "url('topography.svg')",
              }}
            />
          </div>
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
