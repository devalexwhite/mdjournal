import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function Posts({
  uid,
  username,
}: {
  uid: string;
  username: string;
}) {
  const [posts, setPosts] = useState([]) as [any[], Function];
  const [loading, setLoading] = useState(true) as [boolean, Function];

  const supabase = createClient();

  const getPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", uid)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setPosts(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {!loading && posts.length > 0 && (
        <ul className="flex flex-col space-y-4 w-full">
          {posts.map((post) => (
            <li key={post.id} className="w-full block animate-in">
              <Link
                href={`/posts/${username}/${post.id}`}
                className="block w-full border border-solid border-gray-700 px-4 py-2 dark:border-gray-100 hover:bg-blue-100 hover:dark:bg-blue-600 flex justify-between items-center"
              >
                <div className="flex flex-col">
                  {post.original_file_name}
                  <span className="text-sm text-gray-600 dark:text-gray-200">
                    {new Date(post.updated_at).toDateString()}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
