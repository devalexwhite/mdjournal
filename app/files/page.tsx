import FileApp from "@/components/files/FileApp";
import { MdFile } from "@/components/files/FileTree";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user: user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase.from("posts").select();

  const files = (posts ?? []).map((post) => {
    return {
      name: post.original_file_name,
      url: post.file_url,
    } as MdFile;
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-t from-primary to-accent p-16">
      <div className="card bg-base-100 shadow-xl w-full h-full   overflow-hidden">
        <FileApp files={files} />
      </div>
    </div>
  );
}
