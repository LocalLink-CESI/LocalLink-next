import React from "react";
import Login from "@components/Login";
import {Center} from "@chakra-ui/react";

type Props = {
    searchParams: Record<"callbackUrl" | "error", string>;
}

const SignInPage = (props: Props) => {
    return (
            <Login error={props.searchParams.error} callbackUrl={props.searchParams.callbackUrl}/>
    )
}

export default SignInPage;