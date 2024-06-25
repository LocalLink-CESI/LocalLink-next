'use client';

import { SignUp } from "@components/RegisterForm";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

type Props = {
    searchParams: Record<"callbackUrl" | "error", string>;
}

const SignUpPage = (props: Props) => {
    const session = useSession();

    if (session?.session?.user) {
        redirect("/");
    }

    return (
        <SignUp />
    )
}

export default SignUpPage;