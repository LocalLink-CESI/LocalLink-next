'use server';
import {PostType, prisma} from "@/helpers/database";
import {FormikValues} from "formik";
import {Prisma} from ".prisma/client";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

export default async function CreateComment(form :FormikValues, type: PostType) {
    switch(type) {
        case PostType.DEFAULT :
            return CreateDefaultComment(form);
        case PostType.CULTURE:
            return CreateCultureComment(form);
        case PostType.SALE:
            return CreateSaleComment(form);
        case PostType.EVENT:
            return CreateEventComment(form);
    }

}

async function CreateDefaultComment(form :FormikValues) {
    console.log("GROS ZGZ")
    return prisma.comment.create({
        data: {
            text: form.text,
            userId: form.userId,
            postId: form.postId,
        }
    }).catch((e: PrismaClientValidationError) => {
        console.error("error",e)
        return e;
    })
}

async function CreateCultureComment(form :FormikValues) {
    return prisma.comment.create({
        data: {
            text: form.text,
            userId: form.userId,
            culturePostId: form.postId,
        }
    }).catch((e) => {console.log(e)})
}

async function CreateSaleComment(form :FormikValues) {
    return prisma.comment.create({
        data: {
            text: form.text,
            userId: form.userId,
            salePostId: form.postId,
        }
    }).catch((e) => {console.log(e)})
}

async function CreateEventComment(form :FormikValues) {
    return prisma.comment.create({
        data: {
            text: form.text,
            userId: form.userId,
            eventPostId: form.postId,
        }
    }).catch((e) => {console.log(e)})
}