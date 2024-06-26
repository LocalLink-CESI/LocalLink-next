'use server';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";

import {prisma} from "@/helpers/database";
import {FormikValues} from "formik";

export async function UpdateUserWithId(id: string, form: FormikValues) {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if (user.id === id || user.role === "ADMIN") {
        return prisma.user.update(
            {
                where: {
                    id: id
                },
                data: {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    cityId: Number(form.cityId),
                    bio: form.bio,
                    image: form.image,
                    role: user.role === "ADMIN" ? form.role : 'USER'
                }
            }
        ).catch((error: Error) => {
            return error;
        });
    }

    return new Error("Unauthorized");
}