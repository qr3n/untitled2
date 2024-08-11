import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import {Toaster} from "@/components/ui/toaster";
import {CookiesProvider} from "next-client-cookies/server";
import {Providers} from "@/app/providers";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { Usermenu } from "@/app/usermenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Почта Вэн",
  description: "Луший сервис доставки уже здесь!",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <NextTopLoader color="#FF551F" template='<div class="bar" role="bar"><div class="peg"></div></divz' showSpinner={false} />
      <Toaster/>
      <CookiesProvider>
          <Providers>
              { children }
              <Usermenu/>
          </Providers>
      </CookiesProvider>
      </body>
    </html>
  );
}
