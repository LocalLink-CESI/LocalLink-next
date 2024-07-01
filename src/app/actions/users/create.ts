'use server';

import { prisma } from '@/helpers/database';
import bcrypt from "bcryptjs";
import {FormikValues} from "formik";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

export default async function CreateUser(form: FormikValues) {
    return prisma.user.create({
        data: {
            name: form.name || form.firstName,
            image: form.image,

            firstName: form.firstName,
            lastName: form.lastName,

            bio: form.bio,
            email: form.email,
            cityId: form.cityId,

            password: await bcrypt.hash(form.password, 10),
        }
    }).catch((error: PrismaClientValidationError) => {
        return error;
    });
}