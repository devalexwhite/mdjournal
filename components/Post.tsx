"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

export default function Post({ fileUrl }: { fileUrl: string }) {
  const [markdown, setMarkdown] = useState("") as [string, Function];
  const [loading, setLoading] = useState(true) as [boolean, Function];

  const supaclient = createClientComponentClient();

  const getMarkdown = async () => {
    const content = await supaclient.storage
      .from("posts")
      .download(`${fileUrl}`);
    const text = await content.data?.text();

    const processedContent = await (
      await remark()
        .use(html)
        .process(text as any)
    ).toString();

    setMarkdown(processedContent);
    setLoading(false);
  };

  useEffect(() => {
    getMarkdown();
  }, []);

  return (
    <div>
      {loading && (
        <div className="h-full w-full flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-16 w-16"
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
        </div>
      )}
      {!loading && (
        <div
          className="animate-in prose lg:prose-xl dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: markdown }}
        ></div>
      )}
    </div>
  );
}
