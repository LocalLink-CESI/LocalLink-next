'use server';
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";

import {prisma} from "@/helpers/database";
import {FormikValues} from "formik";

export default async function UpdateMe(form: FormikValues) {
    let user = await getServerSession(authOptions)

    if (!user || !user.user || !user.user.name) return null;

    return prisma.user.update({
        where: {
            email: user.user.email
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
    //TODO VERIFIER ROLE
    return prisma.user.update(
        {
            where: {
                id: id
            },
            data: {
                firstName: form.get('firstName') as string,
                lastName: form.get('lastName') as string,
                email: form.get('email') as string,
                password: form.get('password') as string,
                cityId: form.get('cityId') as unknown as number,
                bio: form.get('bio') as string,
                image: form.get('image') as string,
            }
        }
    ).catch((error: Error) => {
        return error;
    });
}