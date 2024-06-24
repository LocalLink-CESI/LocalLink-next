'use server';

import { prisma } from '@/helpers/database';
import bcrypt from "bcryptjs";
import {FormikValues} from "formik";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

interface UserInput {
    firstName: string;
    lastName: string;
    password: string;
    bio: string;
    cityId: number;
    avatar: string;
    email: string;
}

export default async function CreateUser(form: FormikValues) {
    console.log(form);
    return prisma.user.create({
        data: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: await bcrypt.hash(form.password, 10),
            cityId: form.cityId,
        }
    }).catch((error: PrismaClientValidationError) => {
        console.log(error);
        return error;
    });
}
