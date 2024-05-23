import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/helpers/database";

export const authOptions = {
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
                        password: credentials.password
                    }
                })

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
}