import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/helpers/database";
import bcrypt from "bcryptjs";

import {NextAuthOptions} from "next-auth";

const googleId = process.env.GOOGLE_ID
const googleSecret = process.env.GOOGLE_SECRET

if (!googleId || !googleSecret) {
    throw new Error("GOOGLE_ID and GOOGLE_SECRET must be defined")
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email Address", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                if (!credentials) return null

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                            isDeleted: false
                        }
                    });

                    return await bcrypt.compare(credentials.password, user.password) ? user : null
                } catch (error) {
                    console.error(error)
                    return null
                }

            }
        }),

        GoogleProvider({
            clientId: googleId,
            clientSecret: googleSecret,
        }),
    ],

    callbacks: {
        redirect: async ({url, baseUrl}) => {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },

        jwt: async ({user, token, trigger, session}) => {
            if (trigger === "update") {
                return {...token, ...session.user};
            }
            return {...token, ...user};
        },

        // session: async ({session, token, user}) => {
        //     session.user = token as any;
        //
        //     return session;
        // }
    },

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/signup",
    }
}