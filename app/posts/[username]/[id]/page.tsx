import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { useEffect } from "react";

export default async function Page({
  params,
}: {
  params: { username: string; id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("full_name", params.username)
    .single();
  const { data: post } = await supabase
    .from("posts")
    .select()
    .eq("id", params.id)
    .eq("user_id", profile.id)
    .single();

  const { data: downloadURL } = await supabase.storage
    .from("posts")
    .getPublicUrl(post.file_url);

  return (
    <div
      className="flex-1 w-full flex flex-col gap-20 items-center px-4"
      data-theme={profile.theme || "light"}
    >
      <Navbar />
      <main className="mb-16 w-full max-w-3xl">
        <header className=" py-4 w-full flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0">
          <div className="flex flex-col">
            <h1 className="mb-2 text-4xl">{post.original_file_name}</h1>
            {profile?.show_profile_link && (
              <div>
                <h2 className="text-lg">
                  a post by{" "}
                  <Link
                    className="underline"
                    href={`/profile/${profile.full_name}`}
                  >
                    {profile.full_name}
                  </Link>
                  .
                </h2>
              </div>
            )}
            <p className="text-sm">
              created on {new Date(post.updated_at).toDateString()}
            </p>
          </div>
          <div>
            {profile?.show_download && (
              <a
                href={`${downloadURL.publicUrl}`}
                target="_blank"
                className="btn-secondary btn btn-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
                download
              </a>
            )}
          </div>
        </header>
        <div className="divider"></div>
        <Post fileUrl={post.file_url} />
      </main>
      <Footer />
    </div>
  );
}
