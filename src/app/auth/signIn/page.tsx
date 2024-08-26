'use client';

import React from "react";
import Login from "@components/Login";
import {useSession} from "next-auth/react";

type Props = {
    searchParams: Record<"callbackUrl" | "error", string>;
}

const SignInPage = (props: Props) => {

    useSession({
        required: false,
    });

    return (
        <>
            <Login error={props.searchParams.error} callbackUrl={props.searchParams.callbackUrl} />
        </>
    )
}

export default SignInPage;