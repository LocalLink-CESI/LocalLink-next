'use client'
import "./globals.css";
import * as React from 'react'
import { Providers } from './providers'
import SidebarWithHeader from "@/components/SidebarWithHeader";
import { metadata, viewport } from './metadata';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' title="LocalLink">
            <head>
                <meta title="LocalLink" />
                <title>{(metadata as any).title.default}</title>
                <meta name="description" content={metadata.description} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

            </head>
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
