'use client';

import {useSession} from "next-auth/react";
import {CreateAccountButton, LoginButton, LogoutButton} from "@components/LoginButton";

const Navigation = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div>
                <p>Signed in as {session.user.email}</p>
                <LogoutButton />
            </div>
        );
    }

    return (
        <div>
            <LoginButton />
            <CreateAccountButton />
        </div>
    );
}

export default Navigation;