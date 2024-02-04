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
  const [currentEdit, setCurrentEdit] = useState("");

  const getMarkdown = async () => {
    setLoading(true);

    const content = await supabase.storage
      .from("posts")
      .download(`${selectedFile?.url}`);
    const text = await content.data?.text();

    setSelectedMarkdown(text);

    setLoading(false);
  };

  const onCloseFile = () => {
    setSelectedMarkdown(null);
    setSelected(null);
  };

  const onSaveFile = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const updated = await supabase.storage
      .from("posts")
      .update(selectedFile?.url, currentEdit);

    await supabase.from("posts").update(values).eq("id", value);

    updated.data?.path;
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
    <div className="w-full h-full">
      <div className="w-full h-12 bg-base-300 grid grid-cols-3 px-6 py-1">
        <div className="col-span-1 h-full flex flex-row items-center">
          <span className="font-medium text-sm">Your posts</span>
        </div>
        <div className="col-span-2 h-full flex flex-row items-center justify-between">
          {selectedFile && (
            <span className="font-bold">{selectedFile.name}</span>
          )}
          {selectedMarkdown && (
            <div className="flex flex-row gap-4 items-center">
              <button onClick={onCloseFile} className="btn-ghost btn-sm btn">
                Close
              </button>
              <button onClick={onSaveFile} className="btn-primary btn-sm btn">
                Save
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-1 h-full">
          <FileTree
            selectedName={selectedFile?.name}
            files={files}
            onSelect={(file) => setSelected(file)}
          />
        </div>
        <div className="col-span-2 h-full w-full p-4 relative overflow-hidden">
          {loading && <div className="skeleton w-full h-full" />}
          {!selectedMarkdown && !loading && <EditorPlaceholder />}
          {selectedMarkdown && !loading && (
            <Editor markdown={selectedMarkdown} onChange={setCurrentEdit} />
          )}
        </div>
      </div>
    </div>
  );
}
