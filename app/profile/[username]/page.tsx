"use client";

import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Posts from "@/components/Posts";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
    <div
      className="flex-1 w-full flex flex-col gap-20 items-center"
      data-theme={userProfile.theme || "light"}
    >
      <Navbar />
      {!loadedUser ||
        (!userProfile?.id && (
          <div className="w-full py-32 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ))}
      {loadedUser && userProfile?.id && (
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl w-full px-3">
          <main className="flex-1 flex flex-col space-y-16">
            {userProfile?.id == user?.id ? (
              <React.Fragment>
                <section>
                  <header className="w-full flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                    <h1 className="text-3xl font-black">
                      <span className="font-light text-2xl block">
                        welcome back
                      </span>{" "}
                      {user?.user_metadata.full_name}
                    </h1>
                  </header>
                  <main>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <Link
                        href={`/profile/${user?.user_metadata.full_name}/themer`}
                        className="rounded-lg bg-primary w-ful h-40 text-primary-content p-6 flex flex-col justify-between hover:opacity-60 transition-all"
                      >
                        <h3 className="text-xl font-black">
                          customize your theme
                        </h3>
                        <div className="w-full flex flex-row justify-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            data-slot="icon"
                            className="w-8 h-8"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                            />
                          </svg>
                        </div>
                      </Link>

                      <Link
                        href="/"
                        className="rounded-lg bg-primary w-ful h-40 text-primary-content p-6 flex flex-col justify-between hover:opacity-60 transition-all"
                      >
                        <h3 className="text-xl font-black">
                          upload a new post
                        </h3>
                        <div className="w-full flex flex-row justify-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            data-slot="icon"
                            className="w-8 h-8"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </main>
                </section>
                <section>
                  <header className="w-full flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                    <h3 className="text-2xl">your posts.</h3>
                  </header>
                  <main>
                    <Posts
                      uid={userProfile?.id}
                      username={userProfile?.full_name}
                    />
                  </main>
                </section>
              </React.Fragment>
            ) : (
              <section>
                <header className="w-full flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                  <h1 className="text-2xl">{userProfile.full_name}'s posts.</h1>
                  <Posts
                    uid={userProfile?.id}
                    username={userProfile?.full_name}
                  />
                </header>
              </section>
            )}
          </main>
        </div>
      )}
      <Footer />
    </div>
  );
}
