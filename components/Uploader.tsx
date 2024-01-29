"use client";

import { useEffect, useState } from "react";
import MdDropzone from "./MdDropzone";
import { User } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { RedirectType, redirect, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const VALID_FILE_EXTENSIONS = {
  "text/markdown": [".md", ".markdown"],
  "text/plain": [".txt"],
};

export default function Uploader({ authCallback }: { authCallback: string }) {
  const [files, setFiles] = useState([]) as [Array<File>, Function];
  const [authMethod, setAuthMethod] = useState("sign_up") as [string, Function];
  const [username, setUsername] = useState("") as [string, Function];
  const [user, setUser] = useState<User | null>(null) as [
    User | null,
    Function
  ];
  const [uploading, setUploading] = useState(false) as [boolean, Function];

  const router = useRouter();

  const supabase = createClient();

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

  const onDropFiles = (files: Array<File>) => {
    setFiles(files);
  };

  const onUpload = async () => {
    setUploading(true);

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user?.id}-${Math.random()}.${fileExt}`;

      const text = await file.text();

      const { error: uploadError } = await supabase.storage
        .from("posts")
        .upload(filePath, text);

      if (uploadError) {
        console.error(uploadError);
      } else {
        const { error: insertError } = await supabase.from("posts").insert([
          {
            user_id: user?.id,
            file_url: filePath,
            original_file_name: file.name,
          },
        ]);

        if (insertError) {
          console.error(insertError);
        }
      }
    }

    router.push(`/profile/${user?.user_metadata["full_name"]}`);
  };

  return (
    <div className="space-y-8">
      <MdDropzone
        extensions={VALID_FILE_EXTENSIONS}
        isLoggedIn={!!user}
        onDropFiles={onDropFiles}
      />
      {files.length > 0 && !!user && (
        <button
          disabled={uploading}
          onClick={onUpload}
          className={`w-full py-4 border border-solid border-gray-700 dark:border-gray-100 px-6 transition-all ${
            uploading ? "" : "hover:bg-blue-100 hover:dark:bg-blue-600 group"
          }`}
        >
          {!uploading && (
            <div className="flex flex-row items-center">
              <h3 className="font-medium text-lg text-black dark:text-white">
                upload post
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-all"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h4.59l-2.1 1.95a.75.75 0 0 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 1 0-1.02 1.1l2.1 1.95H6.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          {uploading && (
            <div className="flex flex-row items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <h3 className="font-medium text-lg text-black dark:text-white">
                uploading...
              </h3>
            </div>
          )}
        </button>
      )}
      {files.length > 0 && !user && (
        <div className="w-full py-4 border border-solid border-gray-700 dark:border-gray-100 px-6">
          <div className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mr-3 w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-medium text-lg text-black dark:text-white">
              you'll need an account to finish.
            </h3>
          </div>
          <div className="mb-6">
            {authMethod == "sign_up" && (
              <button
                className="font-medium underline"
                onClick={() => setAuthMethod("sign_in")}
              >
                already have an account?
              </button>
            )}
            {authMethod == "sign_in" && (
              <button
                className="font-medium underline"
                onClick={() => setAuthMethod("sign_up")}
              >
                need an account?
              </button>
            )}
          </div>
          {authMethod == "sign_up" && (
            <div>
              <label className="supabase-auth-ui_ui-label c-bpexlo">
                Public username
              </label>
              <input
                id="username"
                placeholder="Your username"
                className="supabase-auth-ui_ui-input c-dEnagJ c-dEnagJ-bBzSYw-type-default"
                style={{ background: "black", color: "white" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
              ></input>
            </div>
          )}
          <Auth
            supabaseClient={supabase}
            view={authMethod as any}
            appearance={{
              theme: ThemeSupa,
              style: {
                input: { background: "black", color: "white" },
              },
            }}
            showLinks={false}
            providers={[]}
            redirectTo={authCallback}
            additionalData={{
              full_name: username,
            }}
          />
        </div>
      )}
    </div>
  );
}
