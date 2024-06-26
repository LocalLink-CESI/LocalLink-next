import NextAuth from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {prisma} from "@/helpers/database";
import CreateUser from "@/app/actions/users/create";
import {GetUserWithId} from "@/app/actions/users/get";
import {FormikValues} from "formik";
import {session} from "next-auth/core/routes";

const handler = NextAuth({
    providers: authOptions.providers,

    callbacks: {
        redirect: async ({ url, baseUrl }) => {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },

        session: async (session : any) => {
            session.session.role = "user";

            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: session.session.user.email,
                    }
                });

                if (user) {
                    const userDataClean = await GetUserWithId(user.id);
                    userDataClean.password = undefined;
                    session.session.user = userDataClean;
                    session.session.role = user.role || "user";
                } else {
                    const newUser: FormikValues = {
                        firstName: session.session.user.name.split(" ")[0],
                        lastName:  session.session.user.name.split(" ")[1],
                        email:  session.session.user.email,
                        image:  session.session.user.image,
                        password: Math.random().toString(36).substring(7),
                        cityId: 1,
                        bio: "",
                    };

                    await CreateUser(newUser);

                    const createdUser = await prisma.user.findFirst({
                        where: {
                            email:  session.session.user.email,
                        }
                    });

                    session.session.user = createdUser;
                    session.session.role = "user";
                }
            } catch (error) {
                console.error(error);
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
