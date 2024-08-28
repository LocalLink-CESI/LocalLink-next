import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/helpers/database";
import CreateUserFromModel from "@/app/actions/users/create";
import User, { Role } from "@/models/User";
import { randomUUID } from "node:crypto";

const handler = NextAuth({
    providers: authOptions.providers,

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token }: { session: any, token: any }) {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: session.user.email,
                        isDeleted: false
                    }
                });

                if (user) {
                    session.user = user;
                    session.role = user.role;
                }

                if (!user) {
                    const newUser: User = {
                        id: randomUUID(),
                        firstName: session.user.name.split(" ")[0] || "?",
                        lastName: session.user.name.split(" ")[1] || "?",
                        email: session.user.email,
                        cityId: 1,
                        bio: "",
                        image: session.user.image,
                        role: Role.USER
                    }

                    await CreateUserFromModel(newUser, randomUUID());

                    session.user = await prisma.user.findUnique({
                        where: {
                            email: session.user.email,
                        }
                    });
                    session.role = session.user.role;
                }
            } catch (error) {
                console.error(error);
            }

            return session;
        },
    },

    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signOut',
        newUser: '/auth/signUp',
    },
});

export { handler as GET, handler as POST };