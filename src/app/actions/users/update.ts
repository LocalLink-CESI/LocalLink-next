'use server';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/helpers/database";

export default async function UpdateMe(form: FormData) {
    let user = await getServerSession(authOptions)
    if (!user || !user.user || !user.user.name) return null;
    return prisma.user.update({
        where: {
            id: user.user.name
        },
        data: {
            firstName: form.get('firstName') as string,
            lastName: form.get('lastName') as string,
            email: form.get('email') as string,
            password: form.get('password') as string,
            cityId: form.get('cityId') as unknown as number,
            bio: form.get('bio') as string,
            avatar: form.get('avatar') as string,
        }
    }).catch((error : Error) => {
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
                avatar: form.get('avatar') as string,
            }
        }
    ).catch((error: Error) => {
        return error;
    });
}