import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  imagePlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { Suspense, useRef } from "react";

interface EditorProps {
  markdown: string;
  onChange: (markdown: string) => {};
}

export default function Editor({ markdown, onChange }: EditorProps) {
  const ref = useRef(null) as any;

  return (
    <Suspense fallback={null}>
      <MDXEditor
        className="w-full h-full max-h-full max-w-full"
        ref={ref}
        onChange={console.log}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                {" "}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
              </>
            ),
          }),
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          imagePlugin(),
        ]}
        markdown={markdown}
        contentEditableClassName="prose"
      />
    </Suspense>
  );
}

