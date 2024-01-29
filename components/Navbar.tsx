import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-lg font-black">
          mdJournal
        </Link>
      </div>
      <div className="flex-none">
        <AuthButton />
      </div>
    </div>
  );
}
