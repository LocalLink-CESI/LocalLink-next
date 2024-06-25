import NextAuth from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {prisma} from "@/helpers/database";
import CreateUser from "@/app/actions/users/create";
import {GetUserWithId} from "@/app/actions/users/get";
import {FormikValues} from "formik";

const handler = NextAuth({
    providers: authOptions.providers,

    callbacks: {
        session: async (session: any) => {

            session.session.role = "user";

            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: session.session.user.email,
                    }
                });

                console.log(user);

                session.session.role = user?.role || "user";

                if (user) {
                    const userDataClean = await GetUserWithId(user.id);

                    userDataClean.password = undefined;

                    session.session.user = userDataClean;
                }

                if (!user) {
                    const newUser: FormikValues = {
                        firstName: session.session.user.name.split(" ")[0],
                        lastName: session.session.user.name.split(" ")[1],
                        email: session.session.user.email,
                        image: session.session.user.image,
                        password: Math.random().toString(36).substring(7),
                        cityId: 1,
                        bio: "",
                    };

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
