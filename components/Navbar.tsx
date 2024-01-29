import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10">
      <div className="w-full max-w-4xl flex justify-between sm:items-center p-3 text-sm flex-col sm:flex-row">
        <Link href="/">
          <div className="font-black text-lg">mdJournal</div>
        </Link>
        {<AuthButton />}
      </div>
    </nav>
  );
}
