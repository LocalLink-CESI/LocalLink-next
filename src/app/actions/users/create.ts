'use server';

import { prisma } from '@/helpers/database';
import bcrypt from "bcryptjs";
import {FormikValues} from "formik";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

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