import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/helpers/database";
import bcrypt from "bcryptjs";
import {Session} from "node:inspector";

const googleId = process.env.GOOGLE_ID
const googleSecret = process.env.GOOGLE_SECRET

if (!googleId || !googleSecret) {
    throw new Error("GOOGLE_ID and GOOGLE_SECRET must be defined")
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                        isDeleted: false
                    }
                });

                console.log("CREDENTIAL", credentials);

                console.log("USER", user);

                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return user;
                } else {
                    return null;
                }
            },
        }),

        GoogleProvider({
            clientId: googleId,
            clientSecret: googleSecret,
        }),
    ],
}