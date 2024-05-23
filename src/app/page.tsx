import {LoginButton} from "@/app/LoginButton";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";

export default async function Home() {
    const session = await getServerSession(authOptions);

    console.log("session", session);

    return (
        <div>
            {session ? (
                <div>
                    <p>Welcome, {session.user.email}</p>
                    <LoginButton/>
                </div>
            ) : (
                <div>
                    <p>You are not logged in</p>
                    <LoginButton/>
                </div>
            )}
        </div>
    );
}
