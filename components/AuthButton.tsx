"use client"

import Link from "next/link";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null) as [User | null, Function]

  const supabase = createClientComponentClient()

  const getUser = async () => {
    const user = await supabase.auth.getUser()

    if (user?.data) {
      setUser(user.data.user)
    }
  }

  useEffect(() => {
    getUser()

    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN" && session?.user) {
        setUser(session.user)
      } else if (event == "SIGNED_OUT") {
        setUser(null)
      }
    })
  }, [])



  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  };

  return (
    <div>
      {
        user ? (
          <div>
            <div className="flex items-center gap-4">
              <div>
                Hey, <Link className="underline" href={`/profile/${user.user_metadata['full_name']}`}>{user.email}</Link>!
              </div>
              <form action={signOut}>
                <button className="btn btn-neutral btn-sm">
                  Logout
                </button>
              </form>
            </div></div >
        ) : (<div>
          <Link
            href="/login"
            className="btn btn-primary btn-sm"
          >
            Login
          </Link>
        </div>)
      }</div>
  )

}
