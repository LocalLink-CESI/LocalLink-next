'use server';

import { prisma } from '@/helpers/database';
import bcrypt from "bcryptjs";
import {FormikValues} from "formik";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;
import User from "@/models/User";

// export default async function CreateUser(form: FormikValues) {
//     return prisma.user.create({
//         data: {
//             firstName: form.firstName,
//             lastName: form.lastName,
//             email: form.email,
//             image: form.image,
//             password: await bcrypt.hash(form.password, 10),
//             cityId: form.cityId,
//             bio: form.bio,
//         }
//     }).catch((error: PrismaClientValidationError) => {
//         return error;
//     });
// }

export async function CreateUserFromModel(user : User, password: string) {
    return prisma.user.create({
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
            password: await bcrypt.hash(password, 10),
            cityId: user.cityId,
            bio: user.bio,
        }
    }).catch((error: PrismaClientValidationError) => {
        console.log(error);
        return error;
    });
}