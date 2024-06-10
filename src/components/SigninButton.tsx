"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import {Button} from "@chakra-ui/react";
import Link from "next/link";

export default function SigninButton() {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div>
                <p>Signed in as {session.user.email}</p>
                <Button onClick={() => signOut()}>Sign out</Button>
            </div>
        );
    }

    return (
        <div>
            <Button onClick={() => signIn()}>Sign in</Button>
            {/*<Link href={"/signIn"}>Sign in</Link>*/}
        </div>
    );
}