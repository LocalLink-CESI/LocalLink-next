'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../theme'
import { UserStoreProvider } from '@/providers/user-store-provider'
import * as React from 'react'
import Navigation from "@components/Navigation";
import { SessionProvider } from 'next-auth/react'
export function Providers({ children }: { children: React.ReactNode }) {
    return <>
        <ChakraProvider theme={theme}>
            <UserStoreProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </UserStoreProvider>
        </ChakraProvider>
    </>
}