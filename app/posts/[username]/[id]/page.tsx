import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Post from "@/components/Post";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

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

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center px-4">
      <nav className="w-full flex justify-center border-b border-b-foreground/10">
        <div className="w-full max-w-4xl flex justify-between sm:items-center p-3 text-sm flex-col sm:flex-row">
          <Link href="/">
            <div className="font-black text-lg">mdJournal</div>
          </Link>
          {<AuthButton />}
        </div>
      </nav>
      <main className="mb-16 w-full max-w-3xl">
        <div className="border-b border-solid border-gray-600 dark:border-gray-200 py-4 mb-16 w-full">
          <h1 className="mb-2 text-4xl font-black">
            {post.original_file_name}
          </h1>
          <h2 className="text-lg">
            a post by{" "}
            <Link className="underline" href={`/profile/${profile.full_name}`}>
              {profile.full_name}
            </Link>
            .
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-200">
            created on {new Date(post.updated_at).toDateString()}
          </p>
        </div>
        <Post fileUrl={post.file_url} />
      </main>
      <Footer />
    </div>
  );
}
