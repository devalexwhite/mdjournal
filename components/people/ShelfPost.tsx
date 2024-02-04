"use client";

import Link from "next/link";

export default function ShelfPost({ post }: { post: any }) {
  const trimTitle = (title: string) => {
    if (title.length <= 20) return title;
    else return `${title.substring(0, 20)}...`;
  };

  return (
    <Link href={`/`} className="relative">
      <div
        style={{ background: 'url("/leather.jpg")' }}
        className="book bg-cover bg-center hover:-translate-y-4 transition-all w-16 h-64 bg-base-100 relative flex flex-col text-white"
      >
        <span className="indicator-item badge absolute -top-2 -right-2 badge-secondary pointer-events-none">
          5
        </span>{" "}
        <div className="text-lg rotate-90 whitespace-nowrap relative w-full h-full flex items-center justify-center origin-center flex-1">
          {trimTitle(post?.original_file_name)}
        </div>
        <div className="w-full px-3 text-nowrap flex items-center justify-center flex-col text-xs text-center">
          <span className="font-bold">Dec 23</span>
          <span className="block">2023</span>
          <div className="mx-2 w-full h-1 bg-yellow-500 rounded-lg my-2" />
        </div>
      </div>
    </Link>
  );
}
