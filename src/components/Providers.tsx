"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

interface ProvidersProps {
    children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <ChakraProvider>
            <SessionProvider>{children}</SessionProvider>
        </ChakraProvider>
    );
}

export default Providers;