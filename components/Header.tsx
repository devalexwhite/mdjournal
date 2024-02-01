import MarkdownIcon from "./MarkdownIcon";

export default function Header() {
  return (
    <div className="flex flex-col gap-8 items-center w-full justify-center">
      <h1 className="text-5xl text-center font-black">
        your drag-n-drop markdown blog.
      </h1>
      <p className="text-lg">
        drop a .md, .markdown or .txt file below to start your public blog.
        mdJournal is <span className="font-medium">free and open-source</span>.
      </p>
    </div>
  );
}
