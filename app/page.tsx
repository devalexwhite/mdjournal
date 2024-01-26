import AuthButton from "../components/AuthButton";
import Header from "@/components/Header";
import { headers } from "next/headers";
import Uploader from "@/components/Uploader";
import Link from "next/link";
import Footer from "@/components/Footer";

export default async function Index() {
  const origin = headers().get("origin");

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10">
        <div className="w-full max-w-4xl flex justify-between sm:items-center p-3 text-sm flex-col sm:flex-row">
          <Link href="/">
            <div className="font-black text-lg">mdJournal</div>
          </Link>
          {<AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl w-full px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <Uploader authCallback={`${origin}/auth/callback`} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
