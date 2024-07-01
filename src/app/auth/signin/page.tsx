import React from "react";
import LoginForm from "@/app/auth/signin/Form";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";

type Props = {
    searchParams: Record<"callbackUrl" | "error", string>;
}

const SignInPage = async (props: Props) => {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect(props.searchParams.callbackUrl || "/");
    }

    return <LoginForm callbackUrl={props.searchParams.callbackUrl} error={props.searchParams.error} />;
}

export default SignInPage;