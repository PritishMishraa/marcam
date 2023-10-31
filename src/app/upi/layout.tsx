import type { Metadata } from "next";

import localFont from "next/font/local";
const calSans = localFont({
  src: "../../../public/fonts/CalSans-SemiBold.woff2",
});

export const metadata: Metadata = {
  title: "UPI to UPI",
  description: "Bookmark LeetCode Wisdom with Marcam",
};

export default function UPILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={calSans.className}>
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        {children}
      </body>
    </html>
  );
}