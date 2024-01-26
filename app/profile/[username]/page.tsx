"use client"

import AuthButton from "@/components/AuthButton";
import Posts from "@/components/Posts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { username: string } }) {
    const [user, setUser] = useState<User | null>(null) as [User | null, Function]
    const [userProfile, setUserProfile] = useState({}) as [any, Function];

    const supabase = createClientComponentClient()

    const getUser = async () => {
        const user = await supabase.auth.getUser()

        if (user?.data) {
            setUser(user.data.user)
        }
    }

    const getProfile = async () => {
        const { data, error } = await supabase.from('profiles').select('*').eq('full_name', params.username).single()

        if (error) {
            console.error(error)
        } else {
            setUserProfile(data)
        }

    }

    useEffect(() => {
        getUser()
        getProfile()

        supabase.auth.onAuthStateChange((event, session) => {
            if (event == "SIGNED_IN" && session?.user) {
                setUser(session.user)
            } else if (event == "SIGNED_OUT") {
                setUser(null)
            }
        })
    }, [])

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <div className="font-black text-lg">
                        mdJournal
                    </div>
                    {<AuthButton />}
                </div>
            </nav>

            {
                user?.id && userProfile?.id &&
                <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl w-full px-3">

                    <main className="flex-1 flex flex-col gap-6">
                        {
                            userProfile?.id == user?.id ? (
                                <h1 className="text-2xl">your posts.</h1>
                            ) : (
                                <h1 className="text-2xl">{userProfile.full_name}'s posts.</h1>
                            )
                        }

                        <Posts uid={userProfile?.id} username={userProfile?.full_name} />
                    </main>
                </div>
            }

            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
                <p>
                    An app by{" "}
                    <a
                        href="https://github.com/devalexwhite"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                    >
                        Alex White
                    </a>
                </p>
            </footer>
        </div>
    );

}