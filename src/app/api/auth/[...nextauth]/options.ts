import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/helpers/database";
import bcrypt from "bcryptjs";

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
}