'use client'

import {signIn, signOut} from "next-auth/react";

export const LoginButton = () => {
    return (
        <button onClick={() => signIn()}>
            Login
        </button>
    )
}

export const LogoutButton = () => {
    return (
        <button onClick={() => signOut()}>
            Logout
        </button>
    )
}

export const CreateAccountButton = () => {
    return (
        <button onClick={() => signIn()}>
            Create Account
        </button>
    )
}