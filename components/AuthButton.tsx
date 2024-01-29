"use client";

import Link from "next/link";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null) as [
    User | null,
    Function
  ];

  const supabase = createClientComponentClient();

  const getUser = async () => {
    const user = await supabase.auth.getUser();

    if (user?.data) {
      setUser(user.data.user);
    }
  };

  useEffect(() => {
    getUser();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN" && session?.user) {
        setUser(session.user);
      } else if (event == "SIGNED_OUT") {
        setUser(null);
      }
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <ul className="menu menu-horizontal px-1">
      {user ? (
        <React.Fragment>
          <li>
            <Link href={`/profile/${user.user_metadata.full_name}`}>
              view profile
            </Link>
          </li>
          <li>
            <form action={signOut}>
              <button>logout</button>
            </form>
          </li>
        </React.Fragment>
      ) : (
        <li>
          <Link href="/login">login</Link>
        </li>
      )}
    </ul>
  );
}
