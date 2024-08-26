"use client";

import theme from '../../theme'
import {ChakraProvider} from '@chakra-ui/react'
import {UserStoreProvider} from '@/providers/user-store-provider'
import {SessionProvider} from 'next-auth/react'
import {ReactNode} from "react";

interface ProvidersProps {
    children: ReactNode;
}

const Providers = ({children}: ProvidersProps) => {
    return (
        <ChakraProvider theme={theme}>
            <UserStoreProvider>
                <SessionProvider>{children}</SessionProvider>
            </UserStoreProvider>
        </ChakraProvider>
    );
}

export default Providers;