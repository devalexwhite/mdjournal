"use client";

import ShelfPost from "./ShelfPost";

export default function Shelf({ posts }: { posts: Array<any> }) {
  return (
    <section className="w-full">
      <header className="mb-6 px-8 w-full text-2xl font-bold">Shelf</header>
      <div className="w-full z-10 relative">
        <ul className="flex flex-row px-8 h-64 gap-8">
          {posts.map((post) => (
            <ShelfPost post={post} />
          ))}
        </ul>
        <div
          className="z-20 w-full h-4 relative bg-cover"
          style={{
            background: "url('/wood-2.jpg')",
            boxShadow: "-1px 11px 11px 0px rgba(0,0,0,0.66)",
          }}
        ></div>
      </div>
    </section>
  );
}
