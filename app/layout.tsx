import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Script from "next/script";
import { ScriptHTMLAttributes } from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://www.mdjournal.app`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "mdJournal - markdown blogs",
  description: "blogging as simple as drag-n-drop.",
};

type ScriptProps = ScriptHTMLAttributes<HTMLScriptElement> & {
  dataWebsiteId?: string;
};

const UmamiScript = ({ dataWebsiteId, ...props }: ScriptProps) => {
  return (
    <Script
      {...props}
      async={true}
      data-website-id={dataWebsiteId}
      src="https://us.umami.is/umami.js"
    />
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      {process.env.VERCEL_URL && (
        <UmamiScript dataWebsiteId={"2deed93c-9f2c-4446-ac6a-8bf2902f8772"} />
      )}
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
