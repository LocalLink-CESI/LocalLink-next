import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/helpers/database";
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
}