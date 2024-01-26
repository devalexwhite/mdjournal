import MarkdownIcon from "./MarkdownIcon";

export default function Header() {
  return (
    <div className="flex flex-row gap-8 items-center">
      <MarkdownIcon />
      <h1 className="text-2xl">your drag-n-drop markdown blog.</h1>
    </div >
  );
}
