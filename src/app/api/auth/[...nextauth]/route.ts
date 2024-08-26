import NextAuth from "next-auth/next";
import {authOptions} from "@/lib/authOptions";
import {prisma} from "@/helpers/database";
import {CreateUserFromModel} from "@/app/actions/users/create";
import User from "@/models/User";
import {randomUUID} from "node:crypto";

const handler = NextAuth({
        providers: authOptions.providers,

        callbacks: {
            async jwt({token, user}) {
                return {...token, ...user};
            },

            async session({session, token}: { session: any, token: any }) {
                session.user = token as any;


                console.log("--------------------");

                console.log(session);

                console.log("--------------------");


                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: session.user.email,
                            isDeleted: false
                        }
                    });

                    if (!user) {
                        const newUser: User = {
                            id: randomUUID(),
                            firstName: session.user.name,
                            lastName: session.user.name,
                            email: session.user.email,
                            cityId: 1,
                            bio: "",
                            image: session.user.image,
                            role: "USER",
                        }

                        await CreateUserFromModel(newUser, randomUUID());

                        session.user = await prisma.user.findFirst({
                            where: {
                                email: session.user.email,
                            }
                        });
                        session.role = "user";
                    }
                } catch (error) {
                    console.error(error);
                }

                return session;
            },
        },

        pages:
            {
                signIn: '/auth/signin',
                signOut:
                    '/auth/signout',
            }
        ,
    })
;

export {handler as GET, handler as POST};