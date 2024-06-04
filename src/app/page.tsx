import {LoginButton} from "@/app/LoginButton";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";
import {Box, Container} from "@chakra-ui/react";
import Link from "next/link";

export default async function Home() {
    const session = await getServerSession(authOptions);

    console.log("session", session);

    return (
        // <div style={{width: "100%", height: "100dvh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        //     {session ? (
        //         <div>
        //             <p>Welcome, {session.user.email}</p>
        //             <LoginButton/>
        //         </div>
        //     ) : (
        //         <div>
        //             <p>You are not logged in</p>
        //             <LoginButton/>
        //         </div>
        //     )}
        // </div>

        <div>
                <Box p={4} w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
                    <Link href="/register"> Register</Link>
                </Box>
        </div>
    );
}
