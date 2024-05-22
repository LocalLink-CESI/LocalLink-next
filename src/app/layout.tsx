'use client'
import "./globals.css";
import * as React from 'react'
import { Providers } from './providers'

import SidebarWithHeader from "@/components/SidebarWithHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <SidebarWithHeader>
            {children}
          </SidebarWithHeader>
        </Providers>
      </body>
    </html>
  );
}