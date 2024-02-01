"use client";

import { MDXEditor, MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { render } from "react-dom";

interface EditorProps {
  markdown: string;
}

const MdxEditor = dynamic(() => import("./InitalizedMDXEditor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <MdxEditor {...props} editorRef={ref} />,
);

export default function Editor({ markdown }: EditorProps) {
  return (
    <div>
      <ForwardRefEditor
        contentEditableClassName="prose lg:prose-xl"
        markdown={markdown}
        className="w-full h-full"
      />
    </div>
  );
}

