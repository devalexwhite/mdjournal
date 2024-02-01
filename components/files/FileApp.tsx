"use client";

import { useEffect, useState } from "react";
import EditorPlaceholder from "./EditorPlaceholder";
import FileTree, { MdFile } from "./FileTree";
import { createClient } from "@/utils/supabase/client";
import Editor from "./Editor";

interface FileAppProps {
  files: Array<MdFile>;
}

export default function FileApp({ files }: FileAppProps) {
  const supabase = createClient();

  const [selectedFile, setSelected] = useState(null) as [
    MdFile | null,
    Function,
  ];
  const [loading, setLoading] = useState(false) as [boolean, Function];
  const [selectedMarkdown, setSelectedMarkdown] = useState(null) as [
    string | null,
    Function,
  ];

  const getMarkdown = async () => {
    setLoading(true);

    const content = await supabase.storage
      .from("posts")
      .download(`${selectedFile?.url}`);
    const text = await content.data?.text();

    setSelectedMarkdown(text);

    setLoading(false);
  };

  useEffect(() => {
    if (selectedFile) {
      getMarkdown();
    } else {
      setSelectedMarkdown(null);
    }
  }, [selectedFile]);

  return (
    <div className="grid grid-cols-3 h-full">
      <div className="col-span-1 h-full">
        <FileTree files={files} onSelect={(file) => setSelected(file)} />
      </div>
      <div className="col-span-2 h-full w-full p-4">
        {loading && <div className="skeleton w-full h-full" />}
        {!selectedMarkdown && !loading && <EditorPlaceholder />}
        {selectedMarkdown && !loading && <Editor markdown={selectedMarkdown} />}
      </div>
    </div>
  );
}
