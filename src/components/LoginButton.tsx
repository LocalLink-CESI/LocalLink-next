'use client'

import {signOut} from "next-auth/react";
import {Button} from "@chakra-ui/react";
import Link from "next/link";

export const LoginButton = () => {
    return (
        <Button>
            <Link href={"/auth/signIn"}>Login</Link>
        </Button>
    )
}

export const LogoutButton = () => {
    return (
        <Button onClick={() => signOut()}>
            Logout
        </Button>
    )
}

export const CreateAccountButton = () => {
    return (
        <Button>
            <Link href={"/auth/signup"}>Create Account</Link>
        </Button>
    )
}