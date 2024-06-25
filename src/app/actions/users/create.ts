'use server';

import {prisma} from '@/helpers/database';
import bcrypt from "bcryptjs";

export default async function CreateUser(form: FormData) {
    return prisma.user.create({
        data: {
            firstName: form.get('firstName') as string,
            lastName: form.get('lastName') as string,
            email: form.get('email') as string,
            password: bcrypt.hashSync(form.get('password') as string, 10),
            bio: form.get('bio') as string,
            cityId: Number(form.get('cityId') as string),
            avatar: form.get('avatar') as string,
        }
    }).catch((error: Error) => {
        console.error(error);
    });
}


export async function CreatePassword(email: string, password: string) {
    return prisma.user.update({
        where: {
            email: email,
        },
        data: {
            password: bcrypt.hashSync(password, 10),
        }
    }).catch((error: Error) => {
        return error;
    });
}