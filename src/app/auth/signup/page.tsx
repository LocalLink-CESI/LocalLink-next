'use client';

import { SignUp } from "@components/RegisterForm";
import {useSession} from "next-auth/react";

type Props = {
    searchParams: Record<"callbackUrl" | "error", string>;
}

const SignUpPage = (props: Props) => {

    useSession({
        required: false,
    });

    return (
        <SignUp />
    )
}

export default SignUpPage;