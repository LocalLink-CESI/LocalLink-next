'use server';

import {prisma} from '@/helpers/database';
import bcrypt from "bcryptjs";

export default async function CreateUser(form: {
    firstName: string;
    lastName: string;
    password: string;
    bio: string;
    cityId: number;
    avatar: string;
    email: string
}) {
    return prisma.user.create({
        data: {
            firstName: form.firstName,
            lastName: form.lastName,
            password: await bcrypt.hash(form.password, 10),
            bio: form.bio,
            cityId: form.cityId,
            avatar: form.avatar,
            email: form.email
        }
    });
}