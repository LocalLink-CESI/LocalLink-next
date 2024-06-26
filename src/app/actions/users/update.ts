'use server';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";

import {prisma} from "@/helpers/database";
import {FormikValues} from "formik";

export default async function UpdateMe(form: FormikValues) {
    let session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.name) return null;

    return prisma.user.update({
        where: {
            email: session.user.email
        },
        data: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            cityId: Number(form.cityId),
            bio: form.bio,
            image: form.image
        }
    }).catch((error: Error) => {
        return error;
    });
}

export async function UpdateUserWithId(id: string, form: FormData) {
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
                    firstName: form.get('firstName') as string,
                    lastName: form.get('lastName') as string,
                    email: form.get('email') as string,
                    cityId: form.get('cityId') as unknown as number,
                    bio: form.get('bio') as string,
                    image: form.get('image') as string,
                }
            }
        ).catch((error: Error) => {
            return error;
        });
    }

    return new Error("Unauthorized");
}