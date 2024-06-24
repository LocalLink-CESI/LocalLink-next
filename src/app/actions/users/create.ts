'use server';

import {prisma} from '@/helpers/database';
import bcrypt from "bcryptjs";

export default async function CreateUser(form: FormData) {
    return prisma.user.create({
        data: {
            firstName: form.get('firstName') as string,
            lastName: form.get('lastName') as string,
            email: form.get('email') as string,
            password: await bcrypt.hash(form.get('password') as string, 10),
            avatar: form.get('avatar') as string,
            bio: form.get('bio') as string,
            cityId: form.get('cityId') as unknown as number,
        }
    }).catch((error: Error) => {
        return error;
    });
}