import React from "react";
import Login from "@components/Login";
import {Modal} from "@chakra-ui/modal";
import {Text} from "@chakra-ui/react";

type Props = {
    searchParams: Record<"callbackUrl" | "error", string>;
}

const SignInPageIntercepted = (props: Props) => {
    return (
        <Modal isOpen={true} onClose={() => {window.history.back()}}>
            <Text>Sign In Intercepted</Text>
            <Login error={props.searchParams.error} callbackUrl={props.searchParams.callbackUrl}/>
        </Modal>
    )
}

export default SignInPageIntercepted;