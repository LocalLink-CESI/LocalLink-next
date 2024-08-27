'use server';
import {PostType, prisma} from "@/helpers/database";
import {FormikValues} from "formik";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

export default async function CreateComment(form :FormikValues) {
    return prisma.comment.create({
        data: {
            text: form.text,
            postId: form.postId,
            userId: form.userId
        }
    }).catch((e: PrismaClientValidationError) => {
         return e;
    });
}