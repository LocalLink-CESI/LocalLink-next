'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../theme'
import { UserStoreProvider } from '@/providers/user-store-provider'

export function Providers({ children }: { children: React.ReactNode }) {
    return <>
        <ChakraProvider theme={theme}>
            <UserStoreProvider>
                {children}
            </UserStoreProvider>
        </ChakraProvider>
    </>
}