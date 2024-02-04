import Shelf from "@/components/people/Shelf";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user: user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("full_name", username)
    .single();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", profile?.id);

  return (
    <div
      className="w-screen h-screen bg-repeat bg-center"
      style={{ background: "url('/wood.jpg')" }}
    >
      <Shelf posts={posts ?? []} />
    </div>
  );
}
