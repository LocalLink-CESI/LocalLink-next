'use server';

import { prisma } from '@/helpers/database';
import bcrypt from "bcryptjs";

interface UserInput {
    firstName: string;
    lastName: string;
    password: string;
    bio: string;
    cityId: number;
    avatar: string;
    email: string;
}

export default async function CreateUser(form: UserInput) {
    return await prisma.user.create({
        data: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: await bcrypt.hash(form.password, 10),
            avatar: form.avatar,
            bio: form.bio,
            cityId: form.cityId,
        }
    }).catch((error: Error) => {
        console.error(error)
    });
}
