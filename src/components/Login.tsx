"use client";

import InputBox from "@components/InputBox";
import {useRef} from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";

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

    return (
        <div className={props.className}>
            <h1>Login</h1>
            {!!props.error && <div>{props.error}</div>}
            <form onSubmit={onSubmit}>
                <InputBox label="Email" name="email" onChange={(e) => (userName.current = e.target.value)} />
                <InputBox label="Password" name="password" onChange={(e) => (password.current = e.target.value)} />
                <div>
                    <button type="submit">Sign In</button>
                    <Link href={props.callbackUrl || "/"}>Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;