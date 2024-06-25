import NextAuth from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {prisma} from "@/helpers/database";
import CreateUser from "@/app/actions/users/create";
import {GetUserWithId} from "@/app/actions/users/get";

const handler = NextAuth({
    providers: authOptions.providers,

    callbacks: {
        session: async (session: any) => {

            session.session.role = "user";

            try {
                const user = await prisma.user.findFirst({
                    where: {
                        email: session.session.user.email,
                    }
                });

                session.session.role = user?.role || "user";

                if (user) {
                    const userDataClean = await GetUserWithId(user.id);

                    userDataClean.password = undefined;

                    session.session.user = userDataClean;
                }

                if (!user) {
                    const newUser = new FormData();
                    newUser.append('firstName', session.session.user.name);
                    newUser.append('lastName', session.session.user.name);
                    newUser.append('email', session.session.user.email);
                    newUser.append('avatar', session.session.user.image);
                    newUser.append('bio', 'Hello World');
                    newUser.append('cityId', '1');
                    newUser.append('password', Math.random().toString(36).substring(7));

                    await CreateUser(newUser);

                    const userData = await prisma.user.findFirst({
                        where: {
                            email: session.session.user.email,
                        }
                    });

                    session.session.user = userData;

                    session.session.role = "user";
                }
            } catch (error) {
                return session;
            }

            return session;
        }
    },

    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/signup",
    }
})

export {handler as GET, handler as POST};
