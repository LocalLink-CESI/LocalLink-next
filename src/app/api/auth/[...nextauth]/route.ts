import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/helpers/database";
import bcrypt from "bcryptjs";

const googleId = process.env.GOOGLE_ID
const googleSecret = process.env.GOOGLE_SECRET

if (!googleId || !googleSecret) {
    throw new Error("GOOGLE_ID and GOOGLE_SECRET must be defined")
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                username: {label: "Email Address", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                if (!credentials) return null

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.username,
                    }
                })

                if (!user) return null

                return await bcrypt.compare(credentials.password, user.password) ? user : null
            }
        }),

        GoogleProvider({
            clientId: googleId,
            clientSecret: googleSecret,
        }),
    ],

    callbacks: {
        session: async (session) => {
            if (!session) return;

            const userData = await prisma.user.findFirst({
                where: {
                    email: session.user.email
                }
            });

            if (!userData) return;

            return {
                session: {
                    user: {
                        id: userData.id,
                        firstname: userData.firstName,
                        lastname: userData.lastName,
                        username: userData.name,
                        email: userData.email
                    }
                }
            };
        },
    },

    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/signup",
    }
})

export {handler as GET, handler as POST};
