'use client'

import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Input,
    AbsoluteCenter
} from '@chakra-ui/react'

import React, { useRef } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { CreateAccountButton } from "@components/LoginButton";

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
}

const Login = (props: Props) => {
    const userName = useRef<string>("");
    const password = useRef<string>("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", {
            username: userName.current,
            password: password.current,
            redirect: true,
            callbackUrl: props.callbackUrl || "/",
        });
    }

    const handleGoogleSignIn = async () => {
        await signIn('google', {
            callbackUrl: props.callbackUrl || "/",
        });
    }

    return (
        <Box className={props.className} >

            {!!props.error && <div>{props.error}</div>}

            <form onSubmit={onSubmit}>
                <FormControl display={"flex"} flexDirection={"column"} gap={4}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" onChange={(e) => (userName.current = e.target.value)} />

                    <FormLabel>Password</FormLabel>
                    <Input type="password" onChange={(e) => (password.current = e.target.value)} />

                    <Button type="submit">Sign In</Button>

                    <Box position='relative' padding='10'>
                        <Divider />
                        <AbsoluteCenter bg='white' px='4'>
                            Or
                        </AbsoluteCenter>
                    </Box>

                    <Button onClick={handleGoogleSignIn} w={"100%"}>Sign In with Google</Button>
                </FormControl>

                <Box>
                    <Link href={props.callbackUrl || "/"}>Cancel</Link>
                    <CreateAccountButton />
                </Box>
            </form>
        </Box>
    )
}

export default Login;



