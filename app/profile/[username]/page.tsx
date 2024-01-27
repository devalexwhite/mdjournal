"use client";

import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Posts from "@/components/Posts";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<User | null>(null) as [
    User | null,
    Function
  ];
  const [userProfile, setUserProfile] = useState({}) as [any, Function];
  const [loadedUser, setLoadedUser] = useState(false) as [boolean, Function];

  const supabase = createClient();

  const getUser = async () => {
    const user = await supabase.auth.getUser();

    if (user?.data) {
      setUser(user.data.user);
    }
    setLoadedUser(true);
  };

  const getProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("full_name", params.username)
      .single();

    if (error) {
      console.error(error);
    } else {
      setUserProfile(data);
    }
  };

  useEffect(() => {
    getUser();
    getProfile();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN" && session?.user) {
        setUser(session.user);
      } else if (event == "SIGNED_OUT") {
        setUser(null);
      }
    });
  }, []);

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
      {!loadedUser ||
        (!userProfile?.id && (
          <div className="w-full py-32 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ))}
      {loadedUser && userProfile?.id && (
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl w-full px-3">
          <main className="flex-1 flex flex-col gap-6">
            {userProfile?.id == user?.id ? (
              <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between">
                <h1 className="text-2xl">your posts.</h1>
                <Link
                  href="/"
                  className="mt-1 sm:mt-0 text-base text-gray-700 dark:text-white font-medium flex flex-row items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                  </svg>
                  make a new post
                </Link>
              </div>
            ) : (
              <h1 className="text-2xl">{userProfile.full_name}'s posts.</h1>
            )}

            <Posts uid={userProfile?.id} username={userProfile?.full_name} />
          </main>
        </div>
      )}
      <Footer />
    </div>
  );
}
