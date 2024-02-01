export type MdFile = {
  name: string;
  url: string;
};

interface FileTreeProps {
  files?: Array<MdFile>;
  onSelect: (file: MdFile) => {};
}

const FileRow = ({
  file,
  onSelect,
}: {
  file: MdFile;
  onSelect: (file: MdFile) => {};
}) => {
  return (
    <li>
      <button onClick={() => onSelect(file)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        {file.name}
      </button>
    </li>
  );
};

export default function FileTree({ files, onSelect }: FileTreeProps) {
  return (
    <ul className="menu menu-xs bg-base-200 w-full h-full p-3">
      {files &&
        files.map((file: MdFile) => (
          <FileRow onSelect={onSelect} file={file} />
        ))}
    </ul>
  );
}
