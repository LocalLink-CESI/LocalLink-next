import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";


const handler = NextAuth({
    providers: authOptions.providers,

    callbacks: {
        session: async (session : any) => {
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

export { handler as GET, handler as POST };
