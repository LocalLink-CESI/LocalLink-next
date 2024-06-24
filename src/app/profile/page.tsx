'use client';

import {useSession} from "next-auth/react";

const ProfilePage = () => {
    const { data: session } = useSession();

    console.log(session);

    if (!session) {
        return (
            <div>
                <h1>Profile</h1>
                <p>You need to be signed in to view your profile.</p>
            </div>
        );
    }

    if (!session.user) {
        return (
            <div>
                <h1>Profile</h1>
                <p>Loading...</p>
            </div>
        );
    }

    console.log(session.user);

    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}

export default ProfilePage;