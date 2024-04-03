"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Context from "./Context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [search, setSearch] = useState("");
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Maven+Pro:wght@400..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>
        <Context.Provider value={{ search }}>
          <navbar className="sticky flex justify-between px-8 py-4 bg-zinc-950 h-15 w-full top-0">
            <Link href="/" className="flex align-middle">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={100}
                height={24}
                priority
              />
            </Link>
            <div className="flex bg-white gap-2 p-2 rounded-md">
              <input
                type="text"
                placeholder="Buscar camiseta..."
                className="w-24 md:w-60 focus:outline-none"
                onChange={(evt) => setSearch(evt.target.value)}
              />
              <Image
                src="/search-icon.svg"
                alt="search"
                width={20}
                height={20}
                priority
              />
            </div>
          </navbar>
          {children}
        </Context.Provider>
      </body>
    </html>
  );
}
