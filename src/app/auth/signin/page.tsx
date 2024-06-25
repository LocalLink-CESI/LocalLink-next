'use client';

import React from "react";
import Login from "@components/Login";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";

type Props = {
    searchParams: Record<"callbackUrl" | "error", string>;
}

const SignInPage = (props: Props) => {

    const session = useSession();

    if (session?.session?.user) {
        redirect("/");
    }

    return (
        <>
            <Login error={props.searchParams.error} callbackUrl={props.searchParams.callbackUrl} />
        </>
    )
}

export default SignInPage;